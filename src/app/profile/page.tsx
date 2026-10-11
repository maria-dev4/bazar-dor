import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?from=protected");
  }

  const { name, email } = session.user;

  return (
    <div className="mx-auto my-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-center text-xl font-extrabold text-gray-900">
        আমার প্রোফাইল
      </h1>

      <div className="mt-5 text-center">
        <p className="text-lg font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <Link
        href="/profile/update"
        className="btn btn-sm mt-6 w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
      >
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
};

export default ProfilePage;
