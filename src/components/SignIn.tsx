"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthLayout from "./AuthLayout";
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
    <AuthLayout
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে সাইন ইন করুন।"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          সাইন ইন
        </button>
      </form>

      <div className="divider text-xs text-gray-400">অথবা</div>

      <SocialButtons />

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignInForm;