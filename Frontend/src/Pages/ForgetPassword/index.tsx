import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, data.email);
      toast.success(`Reset email sent to ${data.email} 🐾`);
    } catch (error) {
        if(error instanceof Error){
            setError("root", { message: error.message || "Failed to send reset email" });
            toast.error(error.message || "Failed to send reset email");
        }
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/60  mt-[2rem]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Forgot Password
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Sending..." : "Send Reset Email"}
          </Button>

          {errors.root && (
            <p className="text-red-500 text-center">{errors.root.message}</p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-700">
          Remembered your password?{" "}
          <Link
            to="/sign-in"
            className="text-green-700 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        
      </div>
    </div>
  );
};

export default ForgetPassword;
