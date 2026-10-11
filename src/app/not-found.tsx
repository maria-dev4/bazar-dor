import Link from "next/link";

const NotFound = () => {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি নেই।
      </p>
      <Link
        href="/"
        className="btn btn-sm mt-5 border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default NotFound;