import React, { useRef } from "react";
import { IMAGES } from "@/constants/images";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  IMAGES.carouselImage1,
  IMAGES.carouselImage2,
  IMAGES.carouselImage3,
  IMAGES.carouselImage4,
  IMAGES.carouselImage5,
  IMAGES.carouselImage6,
  IMAGES.carouselImage7,
  IMAGES.carouselImage8,
  IMAGES.carouselImage9,
  IMAGES.carouselImage10,
];

const About = () => {
  const [api, setApi] = React.useState(null);
  // ✅ Autoplay (same as HeroSection)
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section
      id="about"
      className="w-full tracking-wider scroll-mt-16 lg:scroll-mt-24 lg:h-screen bg-[#eceada]"
    >
      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-24 py-10 md:py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* LEFT TEXT (UNCHANGED) */}
          <div className="w-full lg:w-[40%]">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-light text-[#6f5b57] leading-tight">
              Spaces that make <br />
              you want to stay
            </h2>

            <p className="mt-6 text-[#5c504d] text-sm md:text-lg lg:text-2xl leading-relaxed max-w-xl">
              At Sadguru Krupa Furnishing, we believe a home should tell your
              story. With a deep passion for design, we work hand in hand with
              our clients to shape their vision using carefully selected
              materials, handcrafted details, and bespoke solutions. Because a
              truly beautiful space isn’t just seen — it’s felt.
            </p>
          </div>

          {/* 🔥 RIGHT CAROUSEL (SHADCN VERSION) */}
          <div className="w-full lg:w-[60%] relative">
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <img
                      src={img}
                      alt={`Interior ${index}`}
                      className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ✅ Navigation Buttons (same style behavior as Hero) */}

              {/* LEFT BUTTON */}
              <button
                onClick={() => api?.scrollPrev()}
                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 z-30"
              >
                <img
                  src={IMAGES.leftSwipIcon} // 👈 your left icon
                  alt="Previous"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={() => api?.scrollNext()}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 z-30"
              >
                <img
                  src={IMAGES.rightSwipIcon} // 👈 your right icon
                  alt="Next"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </button>
              {/* <CarouselPrevious className="left-3 z-30 bg-black/40 text-white hover:bg-black/70" />
              <CarouselNext className="right-3 z-30 bg-black/40 text-white hover:bg-black/70" /> */}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

// import React, { useRef } from "react";
// import { IMAGES } from "@/constants/images";

// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const images = [
//   IMAGES.heroImg,
//   IMAGES.heroImg2,
//   IMAGES.heroImg,
//   IMAGES.heroImg,
// ];

// const About = () => {
//   // ✅ Autoplay (same as HeroSection)
//   const autoplay = useRef(
//     Autoplay({
//       delay: 3000,
//       stopOnInteraction: false,
//       stopOnMouseEnter: true,
//     }),
//   );

//   return (
//     <section id="about" className="w-full min-h-screen bg-[#eceada]">
//       <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-24 py-10 md:py-14 lg:py-20">
//         <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
//           {/* LEFT TEXT (UNCHANGED) */}
//           <div className="w-full lg:w-[40%]">
//             <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[62px] font-light text-[#6f5b57] leading-tight">
//               Spaces that make <br />
//               you want to stay
//             </h2>

//             <p className="mt-6 text-[#5c504d] text-sm md:text-lg lg:text-2xl leading-relaxed max-w-xl">
//               Sadguru Krupa Furnishing is built on a passion for transforming
//               houses into homes. We work closely with our clients to understand
//               their vision and bring it to life through carefully selected
//               materials, handcrafted pieces, and personalized design solutions.
//               Our goal is simple — to create spaces that feel as good as they
//               look.
//             </p>
//           </div>

//           {/* 🔥 RIGHT CAROUSEL (SHADCN VERSION) */}
//           <div className="w-full lg:w-[60%] relative">
//             <Carousel
//               opts={{ loop: true }}
//               plugins={[autoplay.current]}
//               className="w-full"
//             >
//               <CarouselContent>
//                 {images.map((img, index) => (
//                   <CarouselItem key={index} className="basis-full">
//                     <img
//                       src={img}
//                       alt={`Interior ${index}`}
//                       className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-lg"
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               {/* ✅ Navigation Buttons (same style behavior as Hero) */}
//               <CarouselPrevious className="left-3 z-30 bg-black/40 text-white hover:bg-black/70" />
//               <CarouselNext className="right-3 z-30 bg-black/40 text-white hover:bg-black/70" />
//             </Carousel>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
