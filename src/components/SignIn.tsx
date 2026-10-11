"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const SignInForm = ({ fromProtected }: { fromProtected: boolean }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromProtected) {
      toast.error("এই পেজ দেখতে আগে লগইন করুন", { id: "login-required" });
    }
  }, [fromProtected]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল আর পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ঠিক নয়");
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto my-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900">লগইন করুন</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
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
          লগইন
        </button>
      </form>

      <div className="mt-4">
        <SocialButtons />
      </div>

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;