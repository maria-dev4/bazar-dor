"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AuthButtons = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

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

  if (isPending) {
    return <div className="h-9 w-32 animate-pulse rounded-md bg-gray-200" />;
  }

  if (!session) {
    return (
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-md border border-green-700 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50 sm:px-4 sm:text-sm"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <Link
        href="/profile"
        className="max-w-28 truncate rounded-md border border-green-700 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50 sm:max-w-40 sm:px-4 sm:text-sm"
      >
        {session.user.name}
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-md bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:px-4 sm:text-sm"
      >
        সাইন আউট
      </button>
    </div>
  );
};

export default AuthButtons;
