import React from "react";
import { IMAGES } from "@/constants/images";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full tracking-wider bg-[#eceada] scroll-mt-20 "
    >
      {/* Heading */}
      <div className=" max-w-8xl mx-auto px-4 md:px-6 lg:px-20 py-8 lg:py-10">
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:px-4  lg:text-[50px] text-[#6f5b57] font-light">
          We'd love to work with you. Call us now.
        </h2>
        <div className="lg:px-4">
          {" "}
          <div className="w-full h-[1.5px]  mt-4 mb-4 md:mb-0 bg-[#6d5c57] "></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center ">
        {/* Image */}
        <div className="w-full ">
          <img
            src={IMAGES.contactUsImg}
            alt="Flower vase"
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] lg:mb-8 object-cover rounded-lg"
          />
        </div>

        {/* Contact Info */}
        <div className=" space-y-6 px-6 md:mt-12 pb-24">
          <div>
            <h3 className="font-semibold text-[#544541] text-lg md:text-xl lg:text-2xl tracking-wide">
              ADDRESS
            </h3>
            <p className="mt-2 leading-relaxed text-sm md:text-lg lg:text-xl sm:text-base">
              Sadguru Krupa Furnishing,
              <br />
              Plot No. 74A, Shop No. 4 & 5,
              <br />
              Sai Sparsh CHS, Sector-19,
              <br />
              Nerul (E), Navi Mumbai-400706
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#544541]  text-lg md:text-xl tracking-wide">
              PHONE
            </h3>
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              9870252989
              <br />
              {/* 9870252989 */}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-wide text-[#544541]">
              EMAIL
            </h3>
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl break-all">
              sadgurukrupafurnishing@gmail.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-wide text-[#544541]">
              SOCIAL
            </h3>
            <div className="flex gap-4 mt-3">
              {/* <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6d5c57] text-white cursor-pointer">
                <FaFacebookF className="hover:text-blue-500 cursor-pointer text-3xl" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6d5c57] text-white cursor-pointer">
                <FaTwitter className="hover:text-sky-500 cursor-pointer text-3xl" />
              </div> */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6d5c57] text-white cursor-pointer">
                <a
                  href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fsadgurukrupa_furnishing_studio%3Figsh%3DdmVzaHYxNnQ1Zzd2&is_from_rle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="hover:text-pink-500 cursor-pointer text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
