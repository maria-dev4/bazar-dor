"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="shrink-0 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
      সাইন আউট
    </button>
  );
};

export default SignOutButton;