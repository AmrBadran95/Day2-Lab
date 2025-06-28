"use client";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
      <SignUpForm />
    </div>
  );
}
