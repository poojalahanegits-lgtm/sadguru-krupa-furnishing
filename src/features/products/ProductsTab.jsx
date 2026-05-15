import { useState } from "react";
import ProductNavigation from "./ProductsNavigation";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tabClass = (tab) => `
    flex items-center space-x-2 px-3 pt-4 pb-2 text-lg font-medium rounded-md
    sm:rounded-t-lg border-b-2 transition-colors
    text-left w-full sm:w-auto
    ${
      activeTab === tab
        ? "text-orange-600 border-orange-600 bg-orange-50"
        : "text-black border-transparent hover:text-gray-900 hover:border-gray-300"
    }
  `;

  return (
    <>
      <div className="relative pt-2 px-4 sm:px-6 bg-[#F8F9FB] w-full border-gray-200 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 hidden md:flex items-center justify-end pointer-events-none select-none pr-6">
          <h1 className="text-[50px] font-bold text-gray-500 opacity-20 whitespace-nowrap">
            Products List
          </h1>
        </div>

        {/* Tabs */}
        <div
          className="
          relative z-10
          grid grid-cols-2 gap-2
          sm:flex sm:flex-row sm:space-x-6 sm:space-y-0
          border-b
        "
        >
          {/* Dashboard */}
          <button
            className={tabClass("Dashboard")}
            onClick={() => setActiveTab("Dashboard")}
          >
            <span>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </span>
          </button>

          {/* Products List */}
          <button
            className={tabClass("Products")}
            onClick={() => {
              setActiveTab("Products");
              setSelectedProduct(null);
            }}
          >
            <span>
              <i className="fa-solid fa-box"></i> Products List
            </span>
          </button>

          {/* Product Details */}
          {selectedProduct && (
            <button
              className={tabClass("ProductDetails")}
              onClick={() => setActiveTab("ProductDetails")}
            >
              <span>
                <i className="fas fa-edit"></i> Product Details
              </span>
            </button>
          )}
        </div>
      </div>

      <ProductNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  );
};

export default ProductTab;

// import { useState } from "react";
// import OrderNavigation from "./OrderNavigation";

// const OrderTab = () => {
//   const [activeTab, setActiveTab] = useState("Dashboard");

//   return (
//     <>
//       <div className="p-4 border-b flex gap-4">
//         <button onClick={() => setActiveTab("Dashboard")}>Dashboard</button>

//         <button onClick={() => setActiveTab("Orders")}>Orders List</button>
//       </div>

//       <OrderNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
//     </>
//   );
// };

// export default OrderTab;
