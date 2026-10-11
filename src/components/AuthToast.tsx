"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AuthToast = () => {
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const message = sessionStorage.getItem("auth-toast");
    if (!message) return;

    sessionStorage.removeItem("auth-toast");

    if (data?.user) toast.success(message);
  }, [data, isPending]);

  return null;
};

export default AuthToast;