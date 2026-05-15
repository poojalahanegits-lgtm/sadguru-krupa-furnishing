import { useMemo } from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5 border-l-4 border-black">
    <h3 className="text-sm text-gray-600">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

// Skeleton Loader
const StatCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow p-5 border-l-4 border-gray-200 animate-pulse">
    <div className="h-4 w-24 bg-gray-200 rounded"></div>
    <div className="h-8 w-16 bg-gray-300 rounded mt-4"></div>
  </div>
);

const ProductDashboard = () => {
  // ✅ Dummy Data (replace later with API)
  const data = [
    { name: "Sheer Curtain", category: "curtains", stock: 10, variants: 3 },
    { name: "Blackout Curtain", category: "curtains", stock: 5, variants: 2 },
    { name: "Wooden Blinds", category: "blinds", stock: 8, variants: 4 },
    { name: "Sofa Fabric A", category: "sofa", stock: 0, variants: 5 },
  ];

  const isLoading = false;

  const stats = useMemo(() => {
    return {
      totalProducts: data.length,
      curtains: data.filter((p) => p.category === "curtains").length,
      outOfStock: data.filter((p) => p.stock === 0).length,
      totalVariants: data.reduce((sum, p) => sum + p.variants, 0),
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Products" value={stats.totalProducts} />
      <StatCard title="Curtains Products" value={stats.curtains} />
      <StatCard title="Out of Stock" value={stats.outOfStock} />
      <StatCard title="Total Variants" value={stats.totalVariants} />
    </div>
  );
};

export default ProductDashboard;
