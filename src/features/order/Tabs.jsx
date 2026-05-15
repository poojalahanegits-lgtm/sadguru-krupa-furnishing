import React, { useRef, useEffect, useState } from "react";
import { FiUsers, FiPlus, FiShoppingCart } from "react-icons/fi";

const iconMap = {
  FiUsers: <FiUsers size={18} />,
  FiPlus: <FiPlus size={18} />,
  FiShoppingCart: <FiShoppingCart size={18} />,
};

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      setIndicatorStyle({
        width: activeEl.offsetWidth + "px",
        transform: `translateX(${activeEl.offsetLeft}px)`,
      });
    }
  }, [activeTab]);
  const tabClass = (tabId) => `
    flex items-center gap-2 px-4  pt-2 pb-2 text-sm font-medium mt-4
    transition-all transition-all duration-600 ease-in-out cursor-pointer text-xl relative
    ${
      activeTab === tabId
        ? "text-black"
        : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
    }
  `;

  const handleClick = (tabId) => {
    onTabChange(tabId);

    // scroll the clicked tab into view
    tabRefs.current[tabId]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="border-b px-4 relative">
      <div className="flex gap-2 lg:gap-6 whitespace-nowrap overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            onClick={() => handleClick(tab.id)}
            className={tabClass(tab.id)}
          >
            {iconMap[tab.icon]}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      {/* Animated underline */}
      <div
        className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
    </div>
  );
};

export default Tabs;

// import React from "react";
// import { FiUsers, FiPlus, FiShoppingCart } from "react-icons/fi";

// const iconMap = {
//   FiUsers: <FiUsers size={18} />,
//   FiPlus: <FiPlus size={18} />,
//   FiShoppingCart: <FiShoppingCart size={18} />,
// };

// const Tabs = ({ tabs, activeTab, onTabChange }) => {
//   const tabClass = (tabId) => `
//     flex items-center gap-2 px-4 pt-2 pb-2 text-sm font-medium mt-4
//     border-b-2 transition-all duration-200 rounded-t cursor-pointer text-xl
//     ${
//       activeTab === tabId
//         ? "text-white border-white bg-black"
//         : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300"
//     }
//   `;

//   return (
//     <div className="border-b  px-4">
//       <div className="flex gap-2 lg:gap-6 whitespace-nowrap overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             className={tabClass(tab.id)}
//           >
//             {iconMap[tab.icon]}
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tabs;
