import Image from "next/image";
// import Link from "next/link";
import BannerDate from "./BannerDate";

const Banner = () => {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl bg-green-50">
      <div className="flex flex-col items-center gap-6 px-5 py-8 sm:flex-row sm:justify-between sm:px-10 sm:py-10 lg:px-12">
        <div className="w-full max-w-xl text-center sm:text-left">
          <div className="min-h-7">
            <BannerDate />
          </div>

          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
  গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
  href="#all-products"
  className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
>
  সব পণ্য দেখুন
</a>
        </div>

        <div className="w-full sm:w-1/2">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
            width={500}
            height={350}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            className="mx-auto h-auto max-h-72 w-full object-contain sm:max-h-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;