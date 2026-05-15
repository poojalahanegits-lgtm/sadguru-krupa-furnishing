import React, { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IMAGES } from "@/constants/images";

const CategoryCarousel = ({ images }) => {
  const [api, setApi] = useState(null);

  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <div className="w-full relative">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt={`slide-${index}`}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* LEFT */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30"
        >
          <img src={IMAGES.leftSwipIcon} className="w-10 h-10" />
        </button>

        {/* RIGHT */}
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30"
        >
          <img src={IMAGES.rightSwipIcon} className="w-10 h-10" />
        </button>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
