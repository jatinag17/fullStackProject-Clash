"use client";
import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common/SubmitButton";
import { useFormState, useFormStatus } from 'react-dom';

export default function Register() {
  const initState={
    status:0,
    message:"",
    errors:{} 
  }
  const [state,formAction]=useFormState(registerAction,initState);
  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          type="name"
          id="name"
          name="name"
          placeholder="Enter your name..."
        />
        <span className="text-red-500">{state.errors?.name}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
        />
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          id="cpassword"
          name="confirm_password"
          placeholder="Confirm your password..."
        />
        <span className="text-red-500">{state.errors?.confirm_Password}</span>
      </div>

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
