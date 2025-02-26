import ResetPassword from '@/components/auth/ResetPassword';
import React from 'react'

export default function forgetPassword() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white rounded-xl px-10 py-5 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text text-center">
          Clash
        </h1>
        <h1 className="text-2xl font-bold">Reset Password ?</h1>
        

        <ResetPassword/>
        
      </div>
    </div>
  );
}
