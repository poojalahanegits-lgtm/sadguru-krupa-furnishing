import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { IMAGES } from "@/constants/images";
import { useCurrentUser, useLogout } from "../auth/services";
const navLinks = [
  { label: "Home", section: "hero", path: "/" },
  { label: "About", section: "about", path: "/" },
  { label: "Products", section: "products", path: "/" },
  { label: "Projects", section: "projects", path: "/" },
  { label: "Contact", section: "contact", path: "/" },
];
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useCurrentUser();
  const logoutMutation = useLogout();
  const isAuthenticated = !!data?.user;

  const [isNavigating, setIsNavigating] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isHome = location.pathname === "/";
  const isWhiteBg = !isHome || scrolled;

  useEffect(() => {
    // Check if we're coming from a category page (has state indicating return from category)
    if (location.state?.fromCategory) {
      setTimeout(() => {
        const productsSection = document.getElementById("products");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);
  // scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentSection = "";

      navLinks.forEach((link) => {
        const section = document.getElementById(link.section);

        if (section) {
          const sectionTop = section.offsetTop - 120;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            currentSection = link.section;
          }
        }
      });

      if (currentSection && !isNavigating) {
        setActive(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // route → section sync (IMPORTANT)
  useEffect(() => {
    const match = navLinks.find((l) => l.path === location.pathname);

    if (match) {
      setActive(match.section);

      setTimeout(() => {
        const el = document.getElementById(match.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location.pathname]);
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      // refetch current user

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // navigation handler
  const handleNavigation = (link) => {
    setIsNavigating(true); // 🚀 lock scroll detection
    setActive(link.section);

    navigate(link.path);

    setTimeout(() => {
      if (link.section === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(link.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }

      // 🔓 unlock after scroll finishes
      setTimeout(() => {
        setIsNavigating(false);
      }, 500);
    }, 100);

    setMenuOpen(false);
  };
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  return (
    <header
      className={`fixed tracking-wider top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isHome ? "fixed top-0 left-0" : "sticky top-0"
      } ${
        isWhiteBg ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 lg:px-10 py-2 lg:py-0">
        {/* LOGO */}
        <div className="flex gap-1 sm:gap-2 items-center py-1 lg:py-2">
          <img
            src={isWhiteBg ? IMAGES.sadguruLogo : IMAGES.sadguruWhiteLogo}
            alt="Sadguru Krupa Furnishing"
            className="h-10 md:h-12 lg:h-24 w-auto object-contain transition-all duration-300"
          />

          {/* Optional text beside logo */}
          <div className="flex flex-col leading-none">
            <h1
              className={`text-[18px] md:text-[22px] lg:text-[29px] font-bold uppercase ${
                isWhiteBg ? "text-black" : "text-white"
              }`}
            >
              Sadguru Krupa <span className={`leading-none `}>Furnishing</span>
            </h1>
            {/* <p
              className={`text-xs md:text-sm font-pacifico w-full text-center py-1 leading-none  ${
                isWhiteBg ? "text-black" : "text-white"
              }`}
            >
              Furnishing
            </p> */}
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-6 ">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link)}
              className={`relative  nav-link  cursor-pointer ${
                isWhiteBg ? "text-black" : "text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute  left-0 -bottom-1 h-[2px] w-full bg-red-600 transition-transform duration-300 ${
                  active === link.section ? "scale-x-100" : "scale-x-0"
                } origin-left`}
              />
            </button>
          ))}

          <div className="relative">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* PROFILE SECTION */}
                <button
                  onClick={() => {
                    if (data?.user?.role === "admin") {
                      navigate("/skf-action");
                    } else {
                      navigate("/skf-action");
                    }
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {" "}
                  <span
                    className={`text-xl ${
                      isWhiteBg ? "text-black" : "text-white"
                    } `}
                  >
                    |
                  </span>
                  <span
                    className={` ${isWhiteBg ? "text-black" : "text-white"}`}
                  >
                    {" "}
                    My Account
                  </span>
                  {/* USER NAME */}
                  <span
                    className={`font-medium lg:pl-2 ${
                      isWhiteBg ? "text-black" : "text-white"
                    }`}
                  >
                    {data?.user?.name}
                  </span>
                  {/* PROFILE IMAGE */}
                  {data?.user?.profileImage ? (
                    <img
                      src={data.user.profileImage}
                      alt={data.user.name?.substring(0, 10) + "..."}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    /* INITIALS AVATAR */
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold uppercase">
                      {data?.user?.name
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </div>
                  )}
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className={` text-sm  cursor-pointer ${
                    isWhiteBg ? "text-gray-600 hover:text-black" : "text-white"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`py-1 text-md ${
                  isWhiteBg ? "text-black" : "text-white"
                }`}
              >
                <span
                  className={`text-xl ${
                    isWhiteBg ? "text-black" : "text-white"
                  } pr-2`}
                >
                  |
                </span>
                My Account
              </Link>
            )}
          </div>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
            isWhiteBg
              ? "text-black hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl leading-none">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          data-aos="flip-down"
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 rounded-b-2xl overflow-hidden"
        >
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavigation(link)}
                className={`text-left py-3 px-2 rounded-xl font-medium transition-all duration-200 ${
                  active === link.section
                    ? "bg-gray-50 text-black font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="relative cursor-pointer ">
              {!isAuthenticated ? (
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/login"
                  className={` py-1 text-md ${
                    isWhiteBg ? "text-black" : "text-white"
                  }`}
                >
                  <span
                    className={`text-xl cursor-pointer ${
                      isWhiteBg ? "text-black" : "text-white"
                    } pr-2`}
                  ></span>{" "}
                  My Account
                </Link>
              ) : (
                <div className="flex justify-between pt-2 pl-2">
                  {/* SAME UI */}
                  <div className="   border-gray-100">
                    <h3
                      onClick={() => setMenuOpen(false)}
                      className="font-semibold "
                    >
                      {data?.user?.name || ""}
                    </h3>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`w-full  px-2 rounded-xl font-medium flex items-center justify-between transition-all duration-200 `}
                    >
                      <span
                        className={`text-xl cursor-pointer ${
                          isWhiteBg ? "text-black" : "text-white"
                        } pr-2`}
                      ></span>
                      My Account
                    </button>
                  </div>

                  {/* DROPDOWN */}
                  {dropdownOpen && (
                    <div className="mt-2 w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      {/* <Link
                        to="/profile"
                        className="block px-4 py-3 hover:bg-gray-100 text-black"
                      >
                        My Profile
                      </Link> */}

                      <Link
                        to="/skf-action"
                        className="block px-4 py-3 hover:bg-gray-100 text-black"
                      >
                        Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

// import { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// import { IMAGES } from "@/constants/images";
// import { useCurrentUser, useLogout } from "../auth/services";
// const navLinks = [
//   { label: "Home", section: "hero", path: "/" },
//   { label: "About", section: "about", path: "/" },
//   { label: "Products", section: "products", path: "/" },
//   { label: "Projects", section: "projects", path: "/" },
//   { label: "Contact", section: "contact", path: "/" },
// ];
// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { data } = useCurrentUser();
//   const logoutMutation = useLogout();
//   const isAuthenticated = !!data?.user;

//   const [isNavigating, setIsNavigating] = useState(false);
//   const [active, setActive] = useState("");
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const isHome = location.pathname === "/";
//   const isWhiteBg = !isHome || scrolled;

//   useEffect(() => {
//     // Check if we're coming from a category page (has state indicating return from category)
//     if (location.state?.fromCategory) {
//       setTimeout(() => {
//         const productsSection = document.getElementById("products");
//         if (productsSection) {
//           productsSection.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 300);
//     }
//   }, [location]);
//   // scroll shadow effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // active section on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       let currentSection = "";

//       navLinks.forEach((link) => {
//         const section = document.getElementById(link.section);

//         if (section) {
//           const sectionTop = section.offsetTop - 120;
//           const sectionBottom = sectionTop + section.offsetHeight;

//           if (scrollY >= sectionTop && scrollY < sectionBottom) {
//             currentSection = link.section;
//           }
//         }
//       });

//       if (currentSection && !isNavigating) {
//         setActive(currentSection);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // route → section sync (IMPORTANT)
//   useEffect(() => {
//     const match = navLinks.find((l) => l.path === location.pathname);

//     if (match) {
//       setActive(match.section);

//       setTimeout(() => {
//         const el = document.getElementById(match.section);
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 300);
//     }
//   }, [location.pathname]);
//   const handleLogout = async () => {
//     try {
//       await logoutMutation.mutateAsync();

//       setDropdownOpen(false);

//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // navigation handler
//   const handleNavigation = (link) => {
//     setIsNavigating(true); // 🚀 lock scroll detection
//     setActive(link.section);

//     navigate(link.path);

//     setTimeout(() => {
//       if (link.section === "hero") {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         const el = document.getElementById(link.section);
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth" });
//         }
//       }

//       // 🔓 unlock after scroll finishes
//       setTimeout(() => {
//         setIsNavigating(false);
//       }, 500);
//     }, 100);

//     setMenuOpen(false);
//   };
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//     AOS.refresh();
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
//         isHome ? "fixed top-0 left-0" : "sticky top-0"
//       } ${isWhiteBg ? "bg-white shadow-lg" : "bg-transparent"}`}
//     >
//       <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10">
//         {/* LOGO */}
//         <div className="flex gap-2 lg:gap-1 items-center py-2">
//           <img
//             src={isWhiteBg ? IMAGES.sadguruLogo : IMAGES.sadguruWhiteLogo}
//             alt="Sadguru Krupa Furnishing"
//             className="h-10 md:h-12 lg:h-24 w-auto object-contain transition-all duration-300"
//           />

//           {/* Optional text beside logo */}
//           <div className="flex flex-col leading-none">
//             <h1
//               className={`text-[18px] md:text-[22px] lg:text-[29px] font-bold uppercase ${
//                 isWhiteBg ? "text-black" : "text-white"
//               }`}
//             >
//               Sadguru Krupa <span className={`leading-none `}>Furnishing</span>
//             </h1>
//             {/* <p
//               className={`text-xs md:text-sm font-pacifico w-full text-center py-1 leading-none  ${
//                 isWhiteBg ? "text-black" : "text-white"
//               }`}
//             >
//               Furnishing
//             </p> */}
//           </div>
//         </div>

//         {/* DESKTOP NAV */}
//         <nav className="hidden lg:flex items-center space-x-6 ">
//           {navLinks.map((link) => (
//             <button
//               key={link.label}
//               onClick={() => handleNavigation(link)}
//               className={`relative   cursor-pointer ${
//                 isWhiteBg ? "text-black" : "text-white"
//               }`}
//             >
//               {link.label}
//               <span
//                 className={`absolute left-0 -bottom-1 h-[2px] w-full bg-red-600 transition-transform duration-300 ${
//                   active === link.section ? "scale-x-100" : "scale-x-0"
//                 } origin-left`}
//               />
//             </button>
//           ))}

//           <div className="relative">
//             {!isAuthenticated ? (
//               <Link
//                 to="/login"
//                 className={` py-1 text-md ${
//                   isWhiteBg ? "text-black" : "text-white"
//                 }`}
//               >
//                 <span
//                   className={`text-xl ${
//                     isWhiteBg ? "text-black" : "text-white"
//                   } pr-2`}
//                 >
//                   |
//                 </span>{" "}
//                 My Account
//               </Link>
//             ) : (
//               <>
//                 {/* SAME UI */}
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className={` py-1 text-md flex items-center ${
//                     isWhiteBg ? "text-black" : "text-white"
//                   }`}
//                 >
//                   <span
//                     className={`text-xl ${
//                       isWhiteBg ? "text-black" : "text-white"
//                     } pr-2`}
//                   >
//                     |
//                   </span>
//                   My Account
//                 </button>

//                 {/* DROPDOWN */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50">
//                     {/* <Link
//                       to="/profile"
//                       className="block px-4 py-3 hover:bg-gray-100 text-black"
//                     >
//                       My Profile
//                     </Link> */}
//                     <Link
//                       to="/showroom"
//                       onClick={() => setDropdownOpen(false)}
//                       className="block px-4 py-3 hover:bg-gray-100 text-black"
//                     >
//                       Orders
//                     </Link>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </nav>

//         {/* MOBILE TOGGLE */}
//         <button
//           className={`lg:hidden ${isWhiteBg ? "text-black" : "text-white"}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div
//           data-aos="flip-down"
//           className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg"
//         >
//           <nav className="flex flex-col space-y-4 px-4 py-6">
//             {navLinks.map((link) => (
//               <button
//                 key={link.label}
//                 onClick={() => handleNavigation(link)}
//                 className="text-left  "
//               >
//                 {link.label}
//               </button>
//             ))}

//             <div className="relative cursor-pointer">
//               {!isAuthenticated ? (
//                 <Link
//                   to="/login"
//                   className={` py-1 text-md ${
//                     isWhiteBg ? "text-black" : "text-white"
//                   }`}
//                 >
//                   <span
//                     className={`text-xl cursor-pointer ${
//                       isWhiteBg ? "text-black" : "text-white"
//                     } pr-2`}
//                   >
//                     |
//                   </span>{" "}
//                   My Account
//                 </Link>
//               ) : (
//                 <>
//                   {/* SAME UI */}
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className={` py-1 cursor-pointer text-md flex items-center ${
//                       isWhiteBg ? "text-black" : "text-white"
//                     }`}
//                   >
//                     <span
//                       className={`text-xl cursor-pointer ${
//                         isWhiteBg ? "text-black" : "text-white"
//                       } pr-2`}
//                     >
//                       |
//                     </span>
//                     My Account
//                   </button>

//                   {/* DROPDOWN */}
//                   {dropdownOpen && (
//                     <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50">
//                       {/* <Link
//                         to="/profile"
//                         className="block px-4 py-3 hover:bg-gray-100 text-black"
//                       >
//                         My Profile
//                       </Link> */}

//                       <Link
//                         to="/showroom"
//                         onClick={() => setDropdownOpen(false)}
//                         className="block px-4 py-3 hover:bg-gray-100 text-black"
//                       >
//                         Orders
//                       </Link>

//                       <button
//                         onClick={() => setDropdownOpen(false)}
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
