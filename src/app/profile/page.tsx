import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export const instant = false;

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?from=protected");
  }

  const { name, email, image } = session.user;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex min-w-0 items-center gap-4">
          {image && (
            <img
              src={image}
              alt={name}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-gray-900">
              {name}
            </p>
            <p className="truncate text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <SignOutButton />
      </div>

      <Link
        href="/profile/update"
        className="btn btn-sm mt-5 w-full border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
      >
        তথ্য আপডেট করুন
      </Link>
    </main>
  );
};

export default ProfilePage;