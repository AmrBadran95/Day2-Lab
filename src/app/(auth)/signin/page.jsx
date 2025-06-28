"use client";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <SignInForm />
    </div>
  );
}
