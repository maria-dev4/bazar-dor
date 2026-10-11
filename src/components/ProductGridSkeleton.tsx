const ProductGridSkeleton = ({ count = 9 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;