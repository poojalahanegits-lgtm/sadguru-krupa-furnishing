import React, { useState, useRef } from "react";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import products from "@/products";

const ProductsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const visibleProducts = showAll ? products : products.slice(0, 6);

  const handleToggle = () => {
    if (showAll) {
      // When clicking "SHOW LESS"
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setShowAll(!showAll);
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className=" tracking-wider w-full scroll-mt-20"
    >
      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-24 py-10 md:py-8">
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] text-[#6f5b57] font-medium">
          Our Products
        </h2>

        <div className="w-full h-[2px] bg-black mt-4 mb-8 md:mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleProducts.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/category/${item.slug}`, {
                  state: item, // ✅ passing full data
                })
              }
              className="group cursor-pointer shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] pb-2 mb-2"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-2 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#5c504d]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              onClick={handleToggle}
              className="px-6 md:px-8 py-3 border border-gray-500 text-gray-700 tracking-widest text-sm md:text-base lg:text-2xl hover:bg-gray-800 hover:text-white transition duration-300"
            >
              {showAll ? "SHOW LESS" : "VIEW ALL PRODUCTS"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;

// import React, { useState } from "react";
// import { IMAGES } from "@/constants/images";
// const products = [
//   { title: "Curtains & Blinds", image: IMAGES.heroImg },
//   { title: "Sofa & Seating", image: IMAGES.heroImg },
//   { title: "Bedding", image: IMAGES.heroImg },
//   { title: "Soft Decor", image: IMAGES.heroImg },
//   { title: "Custom Furniture", image: IMAGES.heroImg },
//   { title: "Home Decor", image: IMAGES.heroImg },
//   { title: "Wall Panels", image: IMAGES.heroImg },
//   { title: "Lighting", image: IMAGES.heroImg },
// ];

// const ProductsSection = () => {
//   const [showAll, setShowAll] = useState(false);

//   const visibleProducts = showAll ? products : products.slice(0, 6);

//   return (
//     <section id="#products" className="w-full scroll-mt-20">
//       <div
//         id="products"
//         className="max-w-8xl mx-auto  px-4 md:px-6 lg:px-24 py-10 md:py-8 "
//       >
//         {/* TITLE */}
//         <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[66px] text-[#6f5b57] font-medium">
//           Our Products
//         </h2>

//         {/* LINE */}
//         <div className="w-full h-[2px] bg-black mt-4 mb-8 md:mb-12"></div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {visibleProducts.map((item, index) => (
//             <div key={index} className="group cursor-pointer">
//               <div className="overflow-hidden rounded-lg">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <h3 className="mt-4 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#5c504d]">
//                 {item.title}
//               </h3>
//             </div>
//           ))}
//         </div>

//         {/* VIEW MORE BUTTON */}
//         {products.length > 6 && (
//           <div className="flex justify-center mt-10 md:mt-14">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="px-6 md:px-8 py-3 border border-gray-500 text-gray-700 tracking-widest text-sm md:text-base lg:text-2xl hover:bg-gray-800 hover:text-white transition duration-300"
//             >
//               {showAll ? "SHOW LESS" : "VIEW ALL PRODUCTS"}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductsSection;
