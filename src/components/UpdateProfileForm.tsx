"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UpdateProfileForm = ({ currentName }: { currentName: string }) => {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-base font-bold text-gray-900">তথ্য</h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            নাম
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-sm w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
          >
            আপডেট
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateProfileForm;