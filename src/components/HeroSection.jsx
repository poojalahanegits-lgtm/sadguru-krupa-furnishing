import React, { useRef, useState, useEffect } from "react";
import { IMAGES } from "@/constants/images";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HeroSection = ({
  buttonText = "EXPLORE PRODUCTS",
  link = "products",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  // ✅ Carousel images
  const heroImages = [
    IMAGES.heroSectionCarouselImg2,
    IMAGES.heroSectionCarouselImg1,

    IMAGES.heroSectionCarouselImg3,
    IMAGES.heroSectionCarouselImg4,
    IMAGES.heroSectionCarouselImg5,
  ];

  // ✅ Autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleNavigation = (section) => {
    setActive(section);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* 🔥 HERO SECTION */}
      <section
        id="hero"
        className="relative tracking-wider w-full lg:h-screen overflow-hidden"
      >
        {/* 🔥 BACKGROUND CAROUSEL */}
        {/* 🔥 BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {/* ✅ MOBILE STATIC IMAGE */}
          <div className="block md:hidden w-full h-full">
            <img
              src={IMAGES.heroSectionCarouselImg1} // choose best image
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ✅ DESKTOP CAROUSEL */}
          <div className="hidden md:block w-full h-full">
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {heroImages.map((img, index) => (
                  <CarouselItem key={index} className="basis-full h-full">
                    <img
                      src={img}
                      alt={`Slide ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        {/* <div className="absolute inset-0 z-0">
          <Carousel
            opts={{ loop: true }}
            plugins={[autoplay.current]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {heroImages.map((img, index) => (
                <CarouselItem key={index} className="basis-full h-full">
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div> */}

        {/* 🔥 OVERLAY */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* 🔥 TEXT CONTENT */}
        <div className="relative z-10 flex items-center justify-start h-full px-6 md:px-16 lg:px-24">
          <div>
            {/* <h1 className="text-white leading-none tracking-tighter font-plex text-[32px] lg:mb-4 sm:text-[48px] md:text-[64px] lg:text-[90px] ">
              Your <br />
              Home, <br />
              Designed.
            </h1> */}
            <h1 className="text-white leading-tight lg:leading-none tracking-tight lg:tracking-tighter font-plex text-[26px] sm:text-[34px] md:text-[64px] lg:text-[90px] mt-20">
              Your <br />
              Home, <br />
              Designed.
            </h1>
            <button
              onClick={() => handleNavigation(link)}
              className="mt-6 cursor-pointer lg:mt-12 px-6 py-3 border-2  border-white text-white tracking-widest text-sm md:text-base lg:text-xl hover:bg-white hover:text-black transition duration-300 mb-6 "
            >
              {buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* 📱 MOBILE BUTTONS */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 py-3 px-8 md:hidden">
        <div className="flex gap-3">
          <a
            href="tel:+919870252989"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-semibold text-[16px]"
          >
            <FaPhoneAlt />
            Call Now
          </a>

          <a
            href="https://wa.me/919870252989"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold text-[16px]"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>
      </div>

      {/* 💻 DESKTOP FLOATING BUTTONS */}
      <div className="hidden md:flex fixed bottom-6 right-4 z-50 flex-col space-y-4">
        <a
          href="https://wa.me/919870252989"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 hover:-translate-y-1 transition"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        <a
          href="tel:919870252989"
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 hover:-translate-y-1 transition"
        >
          <FaPhoneAlt className="text-xl" />
        </a>
      </div>
    </>
  );
};

export default HeroSection;

// import React, { useRef, useState, useEffect } from "react";
// import { IMAGES } from "@/constants/images";
// import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";

// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";

// const HeroSection = ({
//   buttonText = "EXPLORE PRODUCTS",
//   link = "products",
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [active, setActive] = useState("");

//   // ✅ Carousel images
//   const heroImages = [
//     IMAGES.heroSectionCarouselImg1,
//     IMAGES.heroSectionCarouselImg2,
//     IMAGES.heroSectionCarouselImg3,
//     IMAGES.heroSectionCarouselImg4,
//     IMAGES.heroSectionCarouselImg5,
//   ];

//   // ✅ Autoplay
//   const autoplay = useRef(
//     Autoplay({
//       delay: 4000,
//       stopOnInteraction: false,
//       stopOnMouseEnter: true,
//     }),
//   );

//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const el = document.getElementById(location.state.scrollTo);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [location]);

//   const handleNavigation = (section) => {
//     setActive(section);

//     if (location.pathname !== "/") {
//       navigate("/");

//       setTimeout(() => {
//         const element = document.getElementById(section);
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 200);
//     } else {
//       const element = document.getElementById(section);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <>
//       {/* 🔥 HERO SECTION */}
//       <section
//         id="hero"
//         className="relative w-full lg:h-screen overflow-hidden"
//       >
//         {/* 🔥 BACKGROUND CAROUSEL */}
//         <div className="absolute inset-0 z-0">
//           <Carousel
//             opts={{ loop: true }}
//             plugins={[autoplay.current]}
//             className="w-full h-full"
//           >
//             <CarouselContent className="h-full">
//               {heroImages.map((img, index) => (
//                 <CarouselItem key={index} className="basis-full h-full">
//                   <img
//                     src={img}
//                     alt={`Slide ${index}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           </Carousel>
//         </div>

//         {/* 🔥 OVERLAY */}
//         <div className="absolute inset-0 bg-black/40 z-0" />

//         {/* 🔥 TEXT CONTENT */}
//         <div className="relative z-10 flex items-center justify-start h-full px-6 md:px-16 lg:px-24">
//           <div>
//             <h1 className="text-white leading-none tracking-tighter font-plex text-[32px] lg:mb-4 sm:text-[48px] md:text-[64px] lg:text-[90px] ">
//               Your <br />
//               Home, <br />
//               Designed.
//             </h1>

//             <button
//               onClick={() => handleNavigation(link)}
//               className="mt-6 px-6 py-3 border-2 border-white text-white tracking-widest text-sm md:text-base lg:text-xl hover:bg-white hover:text-black transition duration-300"
//             >
//               {buttonText}
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 📱 MOBILE BUTTONS */}
//       <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 py-3 px-8 md:hidden">
//         <div className="flex gap-3">
//           <a
//             href="tel:+919870752876"
//             className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-semibold text-[16px]"
//           >
//             <FaPhoneAlt />
//             Call Now
//           </a>

//           <a
//             href="https://wa.me/919870752876"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold text-[16px]"
//           >
//             <FaWhatsapp />
//             WhatsApp
//           </a>
//         </div>
//       </div>

//       {/* 💻 DESKTOP FLOATING BUTTONS */}
//       <div className="hidden md:flex fixed bottom-6 right-4 z-50 flex-col space-y-4">
//         <a
//           href="https://wa.me/919870752876"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 hover:-translate-y-1 transition"
//         >
//           <FaWhatsapp className="text-2xl" />
//         </a>

//         <a
//           href="tel:919870752876"
//           className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 hover:-translate-y-1 transition"
//         >
//           <FaPhoneAlt className="text-xl" />
//         </a>
//       </div>
//     </>
//   );
// };

// export default HeroSection;
