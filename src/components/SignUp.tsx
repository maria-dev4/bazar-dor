"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthLayout from "./AuthLayout";
import SocialButtons from "./SocialButtons";

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirm) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটো মেলেনি");
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
    <AuthLayout
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            নাম
          </label>
          <input
            id="name"
            type="text"
            placeholder="যেমন: রহিম উদ্দিন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full bg-white"
          />
        </div>

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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm"
            className="text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="আবার লিখুন"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="divider text-xs text-gray-400">অথবা</div>

      <SocialButtons />

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpForm;