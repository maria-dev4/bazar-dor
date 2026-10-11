"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SocialButtons = () => {
  const handleSocial = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        className="btn btn-outline btn-sm w-full sm:btn-md"
      >
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        className="btn btn-outline btn-sm w-full sm:btn-md"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
};

export default SocialButtons;