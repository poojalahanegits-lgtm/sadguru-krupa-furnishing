import React from "react";

const TableSkeleton = ({ rows = 6, columns = 5 }) => {
  return (
    <div className="overflow-x-auto lg:h-[430px] animate-pulse">
      <table className="w-full table-fixed">
        {/* Header */}
        <thead className="bg-black">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-4 border">
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-5">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
