import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl bg-green-50">
      <div className="flex flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between sm:px-10 sm:py-10">
        <div className="max-w-xl text-center sm:text-left">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            প্রতিদিন আপডেট
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসের দাম দেখুন এক জায়গায়। গতকালের
            তুলনায় কোন পণ্যের দাম বাড়ল আর কোনটার কমল, সহজেই বুঝে নিন।
          </p>

          <Link
            href="#all-products"
            className="mt-5 inline-block rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            দাম দেখুন
          </Link>
        </div>

        <div className="w-full sm:w-1/2">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={500}
            height={350}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
