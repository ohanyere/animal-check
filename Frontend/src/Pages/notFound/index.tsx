import { PawPrint, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4 text-center">
      {/* Icon */}
      <div className="bg-white p-6 rounded-full shadow-lg">
        <PawPrint className="h-12 w-12 text-green-600" />
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-700 max-w-md">
        Oops! The page you’re looking for doesn’t exist. Looks like a lost animal wandered here 🐄.  
        Let’s guide you back home.
      </p>

      {/* Action button */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-5 py-3 bg-green-600 text-white text-base font-medium rounded-2xl shadow hover:bg-green-700 transition"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}
