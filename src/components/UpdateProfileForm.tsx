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
    <div className="mx-auto my-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          নাম
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          তথ্য আপডেট করুন
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
