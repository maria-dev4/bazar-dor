import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
      <ProductGridSkeleton />
    </main>
  );
};

export default Loading;