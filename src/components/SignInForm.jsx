"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await axios.post("/api/auth/signIn", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setError("");
      router.push("/todo");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Incorrect password.");
      } else if (err.response?.status === 404) {
        setError("User not found.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-cyan-600">
        Sign In
      </h1>
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition">
        Sign In
      </button>
    </form>
  );
}
