import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "results", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Something went wrong while fetching data.");
        toast.error("Something happened");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>No data found</p>;

  return (
    <section style={{backgroundImage : `url(${post.imageUrl})`}} className="w-full  bg-no-repeat bg-cover bg-center bg-si">
        <div className="w-3/6 mx-auto">
        <div className="mt-8 bg-green-50/70 backdrop-blur-lg border border-green-200/50 rounded-3xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold text-green-800">
          Analysis Complete
        </h2>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="bg-white/50 rounded-xl p-6 border border-green-200/30">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Health Assessment
          </h3>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {post.analysis}
          </div>
        </div>

        {post.description && (
          <div className="mt-4 text-sm text-gray-600 bg-white/30 rounded-lg p-3">
            <strong>Your Description:</strong> {post.description}
          </div>
        )}
      </div>
    </div>
    </div>
    </section>
    
  );
};

export default Result;
