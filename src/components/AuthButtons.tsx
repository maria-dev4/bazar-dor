"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
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
    return <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200" />;
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

  const { name, email, image } = session.user;

  return (
    <div className="dropdown dropdown-end shrink-0">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2"
      >
        {image && (
          <img
            src={image}
            alt={name}
            className="h-9 w-9 rounded-full object-cover"
          />
        )}
        <span className="max-w-28 truncate text-sm font-medium text-gray-900">
          {name}
        </span>
        <span className="text-[10px] text-gray-500">▾</span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
      >
        <div className="border-b border-gray-100 pb-2">
          <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
          <p className="truncate text-xs text-gray-500">{email}</p>
        </div>

        <Link
          href="/profile"
          className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <User size={14} />
          আমার প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={14} />
          সাইন আউট
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;