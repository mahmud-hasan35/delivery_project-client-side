import React from 'react';
import UseAuth from '../../Hook/useAuth';
import { FcGoogle } from "react-icons/fc"; // Google icon
import { useLocation, useNavigate } from 'react-router';

export default function SocialLogin() {
  const { googleLogin } = UseAuth();

  const location = useLocation()
  const navigate = useNavigate()
  const form =  location.state?.form || '/';

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(res => {
        console.log(res.user);
        navigate(form)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center mt-8">
      {/* OR Divider */}
      <div className="relative mb-6">
        <hr className="border-gray-300" />
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-500 text-sm">
          or
        </span>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition duration-200"
      >
        <FcGoogle size={22} />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
