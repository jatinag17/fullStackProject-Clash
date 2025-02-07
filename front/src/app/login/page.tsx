import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from "next/link";
export default function login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white rounded-xl px-10 py-5 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text text-center">
          Clash
        </h1>
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Welcome Back</p>
        <form>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
            />
            <div className='text-right'>
              <Link href="forgot-password"className="text-blue-600 hover:text-blue-800">Forgot Password?</Link>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-800 text-white py-2 rounded-lg">
              Submit
            </button>
          </div>
        </form>
        <p className='text-center mt-2'>Don't have an account?{" "}<strong><Link href="/register">Register</Link></strong></p>
      </div>
    </div>
  );
}
