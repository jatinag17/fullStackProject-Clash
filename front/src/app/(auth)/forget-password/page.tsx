import ForgetPassword from '@/components/auth/ForgetPassword';
import React from 'react'

export default function forgetPassword() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white rounded-xl px-10 py-5 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text text-center">
          Clash
        </h1>
        <h1 className="text-2xl font-bold">Forget Password ?</h1>
        <p>Don't worry it happens. Just enter your email and we will send you the password reset link.</p>

        <ForgetPassword/>
        
      </div>
    </div>
  );
}
