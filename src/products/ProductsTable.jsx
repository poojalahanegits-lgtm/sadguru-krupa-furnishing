import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import CreateAndEditProduct from "./CreateAndEdit";
import { useProductLists, useDeleteProduct } from "./index";

const ITEMS_PER_PAGE = 10;
const DEFAULT_COL_WIDTH = 180;
const ACTION_COL_WIDTH = 120;

/* ================= COLUMN LABELS ================= */

const COLUMN_LABELS = {
  name: "Product Name",
  category_id: "Category",
  subcategory_id: "Sub Category",
  brand: "Brand",
  price: "Price",
  attributes: "Attributes",
  images: "Images",
  created_at: "Created",
};

const COLUMN_WIDTHS = {
  name: 220,
  category_id: 160,
  subcategory_id: 200,
  brand: 160,
  price: 120,
  attributes: 260,
  images: 200,
  created_at: 160,
};

const getColumnWidth = (key) => {
  return COLUMN_WIDTHS[key] || DEFAULT_COL_WIDTH;
};

const ProductsTable = () => {
  const { data = [], isLoading } = useProductLists();
  const deleteMutation = useDeleteProduct();

  const [editingRow, setEditingRow] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [data, searchQuery]);

  /* ================= PAGINATION ================= */
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /* ================= COLUMNS ================= */
  const TABLE_COLUMNS = useMemo(() => {
    if (!data.length) return [];

    return Object.keys(data[0]).filter(
      (k) => !["_id", "__v", "id"].includes(k),
    );
  }, [data]);

  if (isLoading) return <TableSkeleton />;

  if (showCreateForm) {
    return <CreateAndEditProduct onClose={() => setShowCreateForm(false)} />;
  }

  if (editingRow) {
    return (
      <CreateAndEditProduct
        editingRow={editingRow}
        onClose={() => setEditingRow(null)}
      />
    );
  }

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <div className="flex justify-between p-4">
        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white border border-orange-400 px-3 py-1 rounded-md shadow">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <i className="fa-solid fa-x"></i>
            </button>
          )}
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          + Create Product
        </button>
      </div>

      {/* TABLE */}
      <div className="mx-2 bg-white shadow overflow-hidden">
        <div className="hidden md:block overflow-x-auto max-h-[60vh]">
          <table className="w-max table-fixed">
            <thead className="bg-black text-white sticky top-0 z-50">
              <tr>
                <th className="sticky left-0 bg-black p-4 border text-center">
                  Sr No
                </th>

                {TABLE_COLUMNS.map((key) => (
                  <th
                    key={key}
                    className="px-4 border py-3 text-center bg-black whitespace-nowrap"
                    style={{
                      width: getColumnWidth(key),
                      minWidth: getColumnWidth(key),
                    }}
                  >
                    {COLUMN_LABELS[key] || key}
                  </th>
                ))}

                <th
                  className="sticky right-0 bg-black px-4 py-3"
                  style={{ width: ACTION_COL_WIDTH }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white text-center border-r">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>

                  {TABLE_COLUMNS.map((key) => (
                    <td
                      key={key}
                      className="px-2 py-2 text-center truncate"
                      style={{
                        width: getColumnWidth(key),
                      }}
                    >
                      {key === "attributes"
                        ? JSON.stringify(row[key])
                        : key === "images"
                          ? row[key]?.[0]
                          : typeof row[key] === "object"
                            ? JSON.stringify(row[key])
                            : row[key] || ""}
                    </td>
                  ))}

                  {/* ACTIONS */}
                  <td className="sticky right-0 bg-gray-100 text-center">
                    <div className="flex justify-around">
                      <button
                        onClick={() => setEditingRow(row)}
                        className="text-orange-500 text-xl"
                      >
                        <i className="fa fa-edit"></i>
                      </button>

                      <button
                        onClick={() =>
                          deleteMutation.mutate(row.product_id, {
                            onSuccess: () =>
                              toast.success("Deleted successfully"),
                          })
                        }
                        className="text-red-500 text-xl"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-6 p-4">
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
        </span>

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={
            currentPage >= Math.ceil(filteredData.length / ITEMS_PER_PAGE)
          }
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;

/* ================= SKELETON ================= */

const TableSkeleton = () => {
  return (
    <div className="p-4">
      <div className="h-10 bg-gray-200 mb-4 animate-pulse"></div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-8 bg-gray-200 mb-2 animate-pulse"></div>
      ))}
    </div>
  );
};
