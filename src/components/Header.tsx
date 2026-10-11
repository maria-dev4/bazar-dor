import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import HeaderDate from "./HeaderDate";
import Marquee from "./Marquee";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/logo-icon-hd.png"
            alt="Bazar dor Logo"
            width={48}
            height={48}
            priority
            className="h-10 w-10 bg-green-400 shrink-0 object-contain sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-lg font-extrabold text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <HeaderDate />
          </div>
        </Link>

        <AuthButtons />
      </div>

      <div className="border-t border-gray-100">
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="mx-auto max-w-6xl px-4 sm:px-6"
        >
          <div className="overflow-x-auto">
            <NavLinks />
          </div>
        </nav>
      </div>

      <Marquee />
    </header>
  );
};

export default Header;