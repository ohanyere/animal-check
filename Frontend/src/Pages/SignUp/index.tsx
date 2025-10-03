import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { signUp, signUpWithGoogle } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../Components/Button/Button";
import {  LogIn } from "lucide-react";
import type { AppDispatch } from "../../store/store";

const schema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type FormValues = z.infer<typeof schema>;

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleGoogle = async () => {
    try {
      await dispatch(signUpWithGoogle()).unwrap();
      toast.success("Signed up with Google");
      navigate("/dash-board");
    } catch (err) {
        if(err instanceof Error) toast.error(err.message || "Google sign-up failed");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name: displayName, email, password } = data;
    try {
      await dispatch(signUp({ displayName, email, password })).unwrap();
      toast.success("Welcome to AnimalCare! ");
      navigate("/dash-board");
    } catch (err) {
      if(err instanceof Error) toast.error(err.message || "Sign-up failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/60 to-white mt-[5rem]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Sign Up for AnimalCare
        </h2>
        <p className="text-center text-gray-700 mb-4">
          Create your account to start diagnosing animals instantly
        </p>

        {/* Google Sign Up */}
        <Button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 mb-4 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg transition font-medium"
        >
          <LogIn className="w-5 h-5 text-green-700" />
          Sign up with Google
        </Button>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="text-right">
            <Link
              to="/password-reset"
              className="text-sm text-green-700 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Signing up..." : "Continue"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
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

export default SignUp;
