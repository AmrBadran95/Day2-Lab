"use client";
import axios from "axios";

export default function SignInForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await axios.post("/api/auth/signIn", { email, password });
      localStorage.setItem("token", res.data.token);
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
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input className="input" type="password" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Sign In
      </button>
    </form>
  );
}
