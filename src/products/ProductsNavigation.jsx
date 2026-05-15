import ProductDashboard from "./ProductsDashboard";
import ProductsTable from "./ProductsTable";
// import ProductDetails from "./ProductDetails"; // optional (if you have details page)

const ProductNavigation = ({ activeTab, selectedProduct }) => {
  switch (activeTab) {
    case "Dashboard":
      return <ProductDashboard />;

    case "Products":
      return <ProductsTable />;

    // case "ProductDetails":
    //   return <ProductDetails product={selectedProduct} />;

    default:
      return null;
  }
};

export default ProductNavigation;
