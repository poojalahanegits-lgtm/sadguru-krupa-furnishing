import React from "react";
import { Link } from "react-router-dom";
import { Users, ShoppingCart, Package, LayoutDashboard } from "lucide-react";

const SkfAction = () => {
  const cardClasses =
    "bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300 flex flex-col items-center text-center cursor-pointer";

  const iconClasses =
    "h-14 w-14 flex items-center justify-center rounded-full mb-4";

  const titleClasses =
    "text-xl font-semibold text-gray-800 mb-4 uppercase tracking-wide";

  const btnClasses =
    "w-full text-white py-2 px-3 rounded-md font-medium transition";

  return (
    <section className="py-10 lg:py-20 px-4 md:px-6 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {/* ORDERS */}
        <Link to="/skf-action/orders">
          <div className={cardClasses}>
            <div className={`${iconClasses} bg-green-100 text-green-600`}>
              <ShoppingCart size={28} />
            </div>
            <h3 className={titleClasses}>Orders</h3>
            <button className={`${btnClasses} cursor-pointer bg-green-600`}>
              View Orders
            </button>
          </div>
        </Link>
        {/* CUSTOMERS */}
        {/* <Link to="/skf-action/customers">
          <div className={cardClasses}>
            <div className={`${iconClasses} bg-blue-100 text-blue-600`}>
              <Users size={28} />
            </div>
            <h3 className={titleClasses}>Customers</h3>
            <button className={`${btnClasses} bg-blue-600`}>
              View Customers
            </button>
          </div>
        </Link> */}

        {/* PRODUCTS */}
        {/* <Link to="/skf-action/products">
          <div className={cardClasses}>
            <div className={`${iconClasses} bg-purple-100 text-purple-600`}>
              <Package size={28} />
            </div>
            <h3 className={titleClasses}>Products</h3>
            <button className={`${btnClasses} bg-purple-600`}>
              View Products
            </button>
          </div>
        </Link> */}

        {/* LEADS */}
        {/* <Link to="/skf-action/leads">
          <div className={cardClasses}>
            <div className={`${iconClasses} bg-orange-100 text-orange-600`}>
              <LayoutDashboard size={28} />
            </div>
            <h3 className={titleClasses}>Leads</h3>
            <button className={`${btnClasses} bg-orange-600`}>
              View Leads
            </button>
          </div>
        </Link> */}
      </div>
    </section>
  );
};

export default SkfAction;
