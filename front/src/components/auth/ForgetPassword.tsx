"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";
import { forgetPasswordAction} from "@/actions/authActions";
import { toast } from "sonner";


export default function ForgetPassword() {
  const initState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useFormState(forgetPasswordAction, initState);
  useEffect(() => {
    if (state.status === 404) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
     
    }
  }, [state]);
  return (
    <form action={formAction}>
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
        <SubmitButton />
      </div>
    </form>
  );
}
