"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/common/SubmitButton";
import { useFormState } from "react-dom";
import { registerAction, resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useSearchParams ,useRouter } from "next/navigation";
export default function ResetPassword() {
  const initState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useFormState(resetPasswordAction, initState);
  const sParasm=useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 404) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      setTimeout(()=>{
        
        router.replace('/login')
      },1000);
    }
  }, [state]);
  return (
    <form action={formAction}>
     <input type="hidden"  name="token" value={sParasm.get("token") ?? ""}/>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Type your email" name="email" readOnly
        value={sParasm.get("email") ?? ""}/>
        <span className="text-red-400">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="password"
        />
        <span className="text-red-400">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="confirm_password"
        />
        <span className="text-red-400">{state.errors?.confirm_password}</span>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
