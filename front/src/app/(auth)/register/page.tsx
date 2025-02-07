import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white rounded-xl px-10 py-5 shadow-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-800 text-transparent bg-clip-text text-center">
          Clash
        </h1>
        <h1 className="text-2xl font-bold">Register</h1>
        <p>Welcome to clash</p>
        <form>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="name"
              id="name"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
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
            
          </div>
          <div className="mt-4">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              type="cpassword"
              id="cpassword"
              name="confirm_password"
              placeholder="Confirm your password..."
            />
            </div>

          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-800 text-white py-2 rounded-lg">
              Submit
            </button>
          </div>
        </form>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
