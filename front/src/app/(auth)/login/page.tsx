import React from 'react'
import Link from "next/link";
import Login from '@/components/auth/Login';
export default function login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white rounded-xl px-10 py-5 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text text-center">
          Clash
        </h1>
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Welcome Back</p>

       <Login />
        <p className='text-center mt-2'>Don't have an account?{" "}<strong><Link href="/register">Register</Link></strong></p>
      </div>
    </div>
  );
}
