import React from "react";
import { VIDEOS } from "@/constants/videos";

const projects = [
  { video: VIDEOS.project1 },
  { video: VIDEOS.project2 },
  { video: VIDEOS.project3 },
  { video: VIDEOS.project4 },
  { video: VIDEOS.project5 },
  { video: VIDEOS.project6 },
  { video: VIDEOS.project7 },
  { video: VIDEOS.project8 },
  { video: VIDEOS.project9 },
  { video: VIDEOS.project10 },
  { video: VIDEOS.project11 },
  { video: VIDEOS.project12 },
  { video: VIDEOS.project13 },
  { video: VIDEOS.project14 },
  { video: VIDEOS.project15 },
  { video: VIDEOS.project16 },
];
// duplicate for infinite effect
const repeatedProjects = [...projects];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="w-full tracking-wider  bg-[#eceada] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-20 py-8 lg:py-10">
        {/* TITLE */}
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] text-[#6f5b57] font-light">
          What We Can Do for You
        </h2>

        {/* LINE */}
        <div className="w-full h-[1.5px] bg-black mt-4 mb-8 md:mb-12"></div>

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {repeatedProjects.map((item, index) => (
              <a
                href="https://www.instagram.com/sadgurukrupa_furnishing_studio?igsh=dmVzaHYxNnQ1Zzd2"
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] overflow-hidden rounded-2xl flex-shrink-0"
              >
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-[500px] lg:h-[560px] object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .animate-scroll {
          width: max-content;
          animation: scroll 45s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;

// import React from "react";
// import { VIDEOS } from "@/constants/videos";

// const projects = [
//   {
//     video: VIDEOS.project1,
//   },
//   {
//     video: VIDEOS.project2,
//   },
//   {
//     video: VIDEOS.project3,
//   },
//   {
//     video: VIDEOS.project4,
//   },
// ];

// const ProjectsSection = () => {
//   return (
//     <section id="projects" className="w-full bg-[#eceada] scroll-mt-20">
//       <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-20 py-8 lg:py-10">
//         {/* TITLE */}
//         <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] text-[#6f5b57] font-light">
//           What We Can Do for You
//         </h2>

//         {/* LINE */}
//         <div className="w-full h-[1.5px] bg-black mt-4 mb-8 md:mb-12"></div>

//         {/* VIDEOS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {projects.map((item, index) => (
//             <div key={index} className="overflow-hidden rounded-2xl">
//               <video
//                 src={item.video}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//                 className="w-full h-[500px] lg:h-[560px] object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;
