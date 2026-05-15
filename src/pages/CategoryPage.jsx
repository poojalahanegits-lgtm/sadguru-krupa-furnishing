import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSearch, FiGrid, FiMenu } from "react-icons/fi";
import products from "@/products";

// 🔥 Subcategory Card (matches screenshot)
const SubCategoryCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white  tracking-wider  rounded-2xl border border-gray-200  hover:shadow-md transition cursor-pointer group"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-32 lg:h-[350px]  object-cover rounded-t-xl  transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-0 p-3 lg:p-5">
        <h3 className="text-sm lg:text-xl font-medium text-gray-800">
          {item.name}
        </h3>
        {/* <p className="text-xs text-gray-500 mt-1">{item.count} Items</p> */}
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Get category safely
  const category = products.find((p) => p.slug === slug);

  const title = category?.title || slug?.replace("-", " ");

  const bannerTitle = category?.bannerTitle || title;
  const accessories = category?.accessories || [];
  const subCategories = category?.subCategories || [];

  // ✅ Transform data
  const formatted = useMemo(() => {
    return subCategories.map((sub) => ({
      name: sub.name,
      slug: sub.slug,
      image: sub.images?.[0],
      count: sub.products?.length || Math.floor(Math.random() * 20) + 8,
    }));
  }, [subCategories]);
  const formattedAccessories = useMemo(() => {
    return accessories.map((acc) => ({
      name: acc.name,
      slug: acc.slug,
      image: acc.images?.[0], // ✅ FIX
    }));
  }, [accessories]);
  const filtered = useMemo(() => {
    return formatted.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, formatted]);

  return (
    <section className="bg-[#f7f7f5] min-h-screen">
      {/* 🔥 HERO BANNER */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="relative rounded-2xl overflow-hidden h-[220px] bg-gray-200 flex items-center">
          <img
            src={category?.bannerImage}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 px-8">
            <h1 className="text-3xl md:text-4xl font-semibold ">{title}</h1>
            <p className=" text-sm mt-2 max-w-md">{bannerTitle}</p>
          </div>
        </div>
      </div>

      {/* 🔥 FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className=" flex items-center justify-center">
          <button
            onClick={() => navigate("/", { state: { fromCategory: true } })}
            // onClick={() => navigate("/", { state: { scrollTo: "products" } })}
            // onClick={() => {
            //   navigate("/");
            //   // Wait for navigation to complete, then scroll to products
            //   setTimeout(() => {
            //     const productsSection = document.getElementById("products");
            //     if (productsSection) {
            //       productsSection.scrollIntoView({ behavior: "smooth" });
            //     }
            //   }, 100);
            // }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-black hover:text-white transition duration-300 text-sm md:text-base group shadow-sm cursor-pointer"
          >
            <span className="transform group-hover:-translate-x-1 transition">
              ←
            </span>
            Back
          </button>
        </div>
      </div>

      {/* 🔥 SUBCATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-10">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No results found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <SubCategoryCard
                key={i}
                item={item}
                // onClick={() => navigate(`/category/${slug}/${item.slug}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* accessaris */}
      {formattedAccessories?.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accessories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {formattedAccessories.map((item, i) => (
              <SubCategoryCard key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryPage;

// import React from "react";
// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import CategoryCarousel from "@/components/CategoryCarousel";
// import { IMAGES } from "@/constants/images";
// import { useNavigate } from "react-router-dom";
// const CategoryPage = () => {
//   const { slug } = useParams();
//   const { state } = useLocation();
//   const [searchText, setSearchText] = useState("");
//   //scrool at top
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);
//   const subCategories = state?.subCategories || [];
//   const title = state?.title || slug.replace("-", " ");

//   const images = [IMAGES.heroImg, IMAGES.heroImg2, IMAGES.heroImg];
//   const navigate = useNavigate();
//   const filteredSubCategories = subCategories.filter((sub) =>
//     sub.name.toLowerCase().includes(searchText.toLowerCase()),
//   );
//   return (
//     <section className="w-full ">
//       <div className="">
//         <div className="max-w-8xl px-4 md:px-6   flex  justify-between">
//           {/* 🔥 CATEGORY TITLE */}
//           <div>
//             <h1 className="max-w-8xl mx-auto px-4 md:px-6 lg:px-24  text-[32px] sm:text-[42px] md:text-[52px] lg:text-[70px] text-[#6f5b57] font-light capitalize">
//               {title}
//             </h1>
//           </div>
//           {/* search */}
//           <div className="relative w-[200px] md:w-[250px] flex items-center justify-center">
//             <input
//               type="search"
//               placeholder="Search products..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-full
//     focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/*  search */}

//           {/* Back Button */}
// <div className=" flex items-center justify-center">
// <button
//   onClick={() => navigate("/", { state: { scrollTo: "products" } })}
//   // onClick={() => navigate("/#products")}
//   className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-black hover:text-white transition duration-300 text-sm md:text-base group shadow-sm cursor-pointer"
// >
//   <span className="transform group-hover:-translate-x-1 transition">
//     ←
//   </span>
//   Back
// </button>
// </div>
//         </div>

//         {/* 🔥 SUBCATEGORY SECTIONS */}
//         <div className=" ">
//           {filteredSubCategories.length === 0 && (
//             <p className="text-center text-gray-500 py-10">No products found</p>
//           )}
//           {filteredSubCategories.map((sub, index) => {
//             const isReverse = index % 2 !== 0;
//             const isAltBg = index % 2 !== 0;

//             return (
//               <div
//                 key={index}
//                 className={`w-full py-10 md:py-14 lg:py-16 ${
//                   isAltBg ? "bg-white" : "bg-[#eceada]"
//                 }`}
//               >
//                 <div
//                   className={`max-w-8xl mx-auto px-4 md:px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-10 ${
//                     isReverse ? "lg:flex-row-reverse" : ""
//                   }`}
//                 >
//                   {/* TEXT */}
//                   <div className="w-full lg:w-[40%]">
//                     <h2 className="text-[28px] md:text-[36px] lg:text-[48px] text-[#5c504d] font-semibold">
//                       {sub.name}
//                     </h2>

//                     <p className="mt-4 text-[#5c504d] text-sm md:text-lg lg:text-lg italic">
//                       Discover our premium {sub.name} designed for comfort and
//                       elegance.
//                     </p>
//                   </div>

//                   {/* CAROUSEL */}
//                   <div className="w-full lg:w-[60%]">
//                     <CategoryCarousel images={sub.images} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryPage;
