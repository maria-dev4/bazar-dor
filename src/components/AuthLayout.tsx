import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: Props) => {
  return (
    <main className="flex-1 bg-green-50 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          <Link href="/" className="hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthLayout;