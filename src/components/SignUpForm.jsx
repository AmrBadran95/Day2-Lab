"use client";
import axios from "axios";
import { useState } from "react";

export default function SignUpForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await axios.post("/api/auth/SignUp", {
        email,
        username,
        password,
      });
      console.log(res.data);
      setError(""); // clear error on success
    } catch (err) {
      if (err.response?.status === 409) {
        setError("User with this email already exists.");
      } else {
        setError("Something went wrong. Try again.");
      }
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md">
        Sign Up
      </button>
    </form>
  );
}
