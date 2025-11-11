import { useState, useRef, useCallback, type ChangeEvent, type DragEvent, useEffect } from 'react';
import { Camera, Upload, X, Loader2, AlertCircle, Trash2, Mic, MicOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase.config';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { useTranslation } from 'react-i18next';





type AnalysisData = {
  analysis: string;
  imageUrl: string;
  description: string;
}

type ApiSuccessResponse = {
  success: true;
  data: AnalysisData;
}

type ApiErrorResponse = {
  success: false;
  message: string;
  stack?: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

type FileValidationResult = {
  isValid: boolean;
  error?: string;
}

type LivestockDiagnosisProps = {
  apiEndpoint?: string;
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[];
  onAnalysisComplete?: (result: AnalysisData) => void;
  onError?: (error: string) => void;
}

const LivestockDiagnosis: React.FC<LivestockDiagnosisProps> = ({
  apiEndpoint = '/api/diagnose',
  maxFileSize = 10 * 1024 * 1024,
  allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  onAnalysisComplete,
  onError
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const navigate = useNavigate()
  const {t} = useTranslation()

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (transcript) {
      setDescription(prev => {
        const newText = prev ? `${prev} ${transcript}` : transcript;
        return newText;
      });
    }
  }, [transcript]);

  // const formatFileSize = (bytes: number): string => {
  //   if (bytes === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // };

  const validateFile = (file: File): FileValidationResult => {
    if (!allowedFileTypes.some(type => file.type === type)) {
      return {
        isValid: false,
        error: `Please select a valid image file (${allowedFileTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')})`
      };
    }
    
    if (file.size > maxFileSize) {
      return {
        isValid: false,
        error: `File size must be less than }`
      };
    }
    
    return { isValid: true };
  };

  const handleFileSelect = (file: File): void => {
    const validation = validateFile(file);
    
    if (validation.isValid) {
      setSelectedFile(file);
      setError(null);
    } else {
      toast.error(validation.error || 'File validation failed');
      setError(validation.error || 'File validation failed');
      if (onError) {
        onError(validation.error || 'File validation failed');
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const removeFile = (): void => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearAll = (): void => {
    removeFile();
    setDescription('');
    resetTranscript();
  };

 
  const startListening = (): void => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser doesn't support speech recognition");
      return;
    }
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = (): void => {
    SpeechRecognition.stopListening();
  };

    const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');
    formData.append('cloud_name', 'dm4fkrsbd');
    
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dm4fkrsbd/image/upload',
        { method: 'POST', body: formData }
      );
    
      const  data = await res.json()
      return data.secure_url
    
  };


  const handleAnalyze = async (): Promise<void> => {
    if (!selectedFile) {
      toast.error("Please select an image");
      setError("Please select an image");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(selectedFile);
    
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        console.log(response);
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
       
      if (data.success) {
        setError(null);
        toast.success("Analysis completed successfully!");
        
        if (onAnalysisComplete) {
          onAnalysisComplete(data.data);
        }


       try {
 
  if (!auth.currentUser?.uid) {
    toast.error("please sign up");
    navigate("sign-in")
    return;
  }
  const payload = {
    imageUrl,
    userRef: auth.currentUser.uid,
    description,
    analysis: data?.data?.analysis,
    createdat: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "results"), payload);
  navigate(`/results/${docRef.id}`);

} catch (firebaseError: any) {
  console.error("Failed to save to Firebase:", firebaseError);
  console.error("Error code:", firebaseError.code); // e.g. 'permission-denied'
  console.error("Error message:", firebaseError.message);
}


      } else {
        const errorMessage = data.message || 'Analysis failed';
        setError(errorMessage);
        toast.error(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }
      }

    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An error occurred during analysis. Please try again.';
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#f5f5ee]/30 to-purple-50 py-8 px-4 mt-[5rem]">
      
      <div className="max-w-2xl mx-auto">

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              {t("UploadLivestockImage")}
            </label>
            
            {!selectedFile ? (
              <div
                className={`
                  relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
                  transition-all duration-300 group hover:scale-[1.02]
                  ${isDragOver 
                    ? 'border-emerald-600 bg-blue-50/50' 
                    : 'border-gray-300 bg-gray-50/50 hover:border-emerald-700 hover:bg-blue-50/30'
                  }
                `}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Upload image file"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={allowedFileTypes.join(',')}
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-hidden="true"
                />
                
                <div className="flex flex-col items-center space-y-4" data-testid="uploadfile">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      {t("dropyourimage")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports {allowedFileTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {selectedFile.name}
                  </p>
                  {/* <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p> */}
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove selected file"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Description Section with Speech Recognition */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
                {t("Description")}
              </label>
              {browserSupportsSpeechRecognition && (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={listening ? stopListening : startListening}
                    className={`
                      p-2 rounded-lg transition-colors flex items-center space-x-1 text-sm
                      ${listening 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-blue-100 text-emerald-600 hover:bg-blue-200'
                      }
                    `}
                  >
                    {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{listening ? 'Stop' : 'Voice'}</span>
                  </button>
                  {transcript && (
                    <button
                      type="button"
                      onClick={resetTranscript}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Clear transcript"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe any symptoms, behaviors, or concerns you've noticed with your livestock... (You can also use voice input)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparen bg-white/50 backdrop-blur-sm transition-all duration-300 resize-none"
              maxLength={200}
            />
            
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-500">
                {listening && <span className="text-red-500 animate-pulse"> Listening...</span>}
                {transcript && !listening && <span className="text-green-600">✓ Voice input captured</span>}
              </div>
              <div className="text-xs text-gray-500">
                {description.length}/200
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={clearAll}
              type="button"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isAnalyzing}
            >
              <Trash2 className="w-5 h-5" />
              <span>{t("clear")}</span>
            </button>
            
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              type="button"
              className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>{t("analyzelivestock")}</span>
                </>
              )}
            </Button>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default LivestockDiagnosis;