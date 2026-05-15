import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { IMAGES } from "../constants/images";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";

import { Link } from "react-router-dom";
const testimonials = [
  {
    name: "Kamleshwar Kodag",
    link: "https://maps.app.goo.gl/v3Taq16tvF2Th9xX9",
    text: "Quality material, latest options and lot of verties available, product finish is also good. I had done multiple purchases from them and every time it was great experience over all.",
  },
  {
    name: "Shivaraj",
    link: "https://www.justdial.com/JdSocial/post/1677382780341193",
    text: "I recently bought a sofa from this dealer and it was an amazing experience. The staff was knowledgeable and helpful, making the process seamless. The sofa is high-quality, comfortable and looks great in my living room. ",
  },
  {
    name: "Satish Dhiman",
    link: "https://maps.app.goo.gl/swJ6YX3m2qUWh93L6",
    text: "the sofas look brand new and feel so much better. The team was super helpful.  Great quality work, totally value for money. Highly recommend Sadguru if you want to give your furniture a fresh new look!",
  },
  {
    name: "Yuvraj Chavan",
    link: "https://maps.app.goo.gl/FSw9qBRhVi4ch9Lp7",
    text: "Sadguru Krupa Furnishing House is the best place for home fabrics! They have an impressive range of curtains, sofa materials, and upholstery. Their advice on bed and linen selections was spot on. Outstanding quality and friendly service. Highly recommend!",
  },
  {
    name: "Ajay Salve",
    link: "https://maps.app.goo.gl/gNHqUr7DgzsAb3WW8",
    text: "We so grateful that I wasn’t left without curtains for a prolonged length of time and Mr. Prakash sensitivity around this was very much appreciated. The curtains now look fantastic and have changed how we feel about the whole classrooms - for the better!",
  },
  {
    name: "Amogh Jamsudkar",
    link: "https://maps.app.goo.gl/DBeiDzazo1WYFfk2A",
    text: "Experience was good.. people are nice and polite. Have been visiting them for pillows to sofa. Good place for custom made things!",
  },
  {
    name: "Vikram Mahankal",
    link: "https://maps.app.goo.gl/ZsCfpftsr4tRCXnT9",
    text: " The quality of the materials and the service provided have consistently been excellent. The owner is highly cooperative, and the deliveries are always timely. I highly recommend this shop.",
  },

  {
    name: "Rahul Shukla",
    link: "https://maps.app.goo.gl/uNFPaXKCfNNuYrV1A",
    text: "Excellent service & fine collection store gives to their clients & most importantly they stand on their words. I found the store one of the best to enter in & meets the best requirements.",
  },
];

const Testimonials = () => {
  const swiperRef = useRef(null);

  const stopAutoplay = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };
  return (
    <section className="tracking-wider max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-8 lg:py-12 overflow-hidden">
      {/* TITLE */}
      <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] text-[#6f5b57] font-medium">
        What Our Clients Say
      </h2>

      {/* LINE */}
      <div className="w-full h-[1px] bg-black"></div>
      <h1 className="flex flex-wrap items-center justify-center gap-2 text-center mt-4">
        <a
          href="https://www.google.com/search?sca_esv=635f647f0ac037ee&sxsrf=ANbL-n6kbkYk6fDE1V9ZqrklrnnHLprVvw:1778487763123&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaGgRVVwq6ZQTgdKc7pSjdeqlJ40n_p60aP6UJEijQm0nam7L5AzL5Nb_JaKDbzDk41OzeHPcl3F23nsMo1K1HF4sSdPUXOysP8iR9O3enZvdDishQ%3D%3D&q=Sadguru+Krupa+Furnishing+Reviews&sa=X&ved=2ahUKEwjHzO6a57CUAxX_nq8BHSMkDuEQ0bkNegQIJRAF&biw=1536&bih=730&dpr=1.25"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500 cursor-pointer font-bold"
        >
          Click Here
        </a>
        to check us on
        <img
          src={IMAGES.googlePng}
          alt="Google"
          className="h-10 sm:h-14 md:h-16 w-auto"
        />
      </h1>

      {/* SWIPER CAROUSEL */}
      <div className="relative">
        {/* PREVIOUS BUTTON */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden lg:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 items-center justify-center hover:bg-gray-100 transition"
        >
          ❮
        </button>

        {/* NEXT BUTTON */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden lg:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 items-center justify-center hover:bg-gray-100 transition"
        >
          ❯
        </button>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          centeredSlides={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="py-4"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center p-4 cursor-pointer"
                onClick={stopAutoplay}
              >
                <div
                  className="
    w-full
    max-w-sm
    sm:max-w-md
    lg:max-w-[400px]
    border
    border-black

    rounded-t-[120px]
    sm:rounded-t-[180px]
    lg:rounded-t-[220px]

    rounded-b-2xl

    px-4
    sm:px-6
    py-8
    sm:py-10

    text-center

    min-h-[320px]
    sm:min-h-[360px]
    lg:min-h-[420px]

    bg-white
    flex
    flex-col
    justify-center

    transition
    hover:shadow-xl
  "
                >
                  {/* Stars */}
                  <div className="text-orange-500 text-lg mb-3">{"★★★★★"}</div>

                  <div className="px-4">
                    {/* Text */}
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg mb-4 px-1 sm:px-2">
                      "{item.text}"
                    </p>

                    {/* Name */}
                    <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                      - {item.name}
                    </h4>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

// const testimonials = [
//   {
//     name: "Shivaraj",
//     text: "I recently bought a sofa from this dealer and it was an amazing experience. The staff was knowledgeable and helpful, making the process seamless. The sofa is high-quality, comfortable and looks great in my living room. ",
//   },
//   {
//     name: "satish dhiman",
//     text: "the sofas look brand new and feel so much better. The team was super helpful in helping us pick the right fabric, and the pickup and drop service was on time and hassle-free. Great quality work, totally value for money. Highly recommend Sadguru if you want to give your furniture a fresh new look!",
//   },
//   {
//     name: "yuvraj chavan",
//     text: "Sadguru Krupa Furnishing House is the best place for home fabrics! They have an impressive range of curtains, sofa materials, and upholstery. Their advice on bed and linen selections was spot on. Outstanding quality and friendly service. Highly recommend!",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="px-4 max-w-8xl mx-auto  px-4 md:px-6 lg:px-24 py-4 md:py-6 lg:py-10 ">
//       {/* TITLE */}
//       <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] text-[#6f5b57] font-medium">
//         What Our Clients Say
//       </h2>

//       {/* LINE */}
//       <div className="w-full h-[1px] bg-black mt-4 mb-8 md:mb-12"></div>
//       <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {testimonials.map((item, index) => (
//           <div key={index} className="flex justify-center  p-4">
//             <div
//               className="w-full max-w-md border border-black
//                    rounded-t-[200px] rounded-b-md
//                    px-6 py-10 text-center bg-white"
//             >
//               {/* Stars */}
//               <div className="text-orange-500 text-lg md:text-lg lg:text-xl mb-3">
//                 {"★★★★★"}
//               </div>

//               {/* Text */}
//               <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4 px-2">
//                 "{item.text}"
//               </p>

//               {/* Name */}
//               <h4 className="font-semibold text-gray-800 text-lg">
//                 - {item.name}
//               </h4>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
