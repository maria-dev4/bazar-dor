"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার লগইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto my-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900">অ্যাকাউন্ট খুলুন</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <input
          type="text"
          placeholder="নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          placeholder="ইমেইল"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          রেজিস্টার
        </button>
      </form>

      <div className="mt-4">
        <SocialButtons />
      </div>

      <p className="mt-5 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-green-700 hover:underline">
          লগইন করুন
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;