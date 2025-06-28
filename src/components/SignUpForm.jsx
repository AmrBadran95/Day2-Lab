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

    if (!email || !username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("/api/auth/SignUp", {
        email,
        username,
        password,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input className="input" type="email" placeholder="Email" />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Username</label>
        <input className="input" type="text" placeholder="Username" />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input className="input" type="password" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Sign Up
      </button>
    </form>
  );
}
