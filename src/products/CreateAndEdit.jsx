import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import products from "../products";
import { useCreateProduct, useUpdateProduct } from "./index";
import { SelectStyles } from "@/constants/Config";

/* CATEGORY OPTIONS */
const CATEGORY_OPTIONS = products.map((item) => ({
  value: item.slug,
  label: item.title,
}));

export default function CreateAndEditProduct({ editingRow, onClose }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { mutate: createProduct, isPending } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const selectedCategoryData = products.find(
    (p) => p.slug === selectedCategory,
  );

  const SUBCATEGORY_OPTIONS =
    selectedCategoryData?.subCategories?.map((sub) => ({
      value: sub.slug,
      label: sub.name,
    })) || [];

  const VARIANT_OPTIONS =
    selectedCategoryData?.fabricVariants ||
    selectedCategoryData?.materialVariants ||
    selectedCategoryData?.upholsteryMaterials ||
    [];

  const BRAND_OPTIONS =
    selectedCategoryData?.brands?.map((b) => ({
      value: b,
      label: b,
    })) || [];

  /* ================= SUBMIT ================= */

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      category_id: data.category,
      subcategory_id: data.subCategory,
      brand: data.brand,
      attributes: {
        variant: data.variant,
        color: data.color,
        material: data.material,
      },
      images: data.images ? [data.images] : [],
      price: data.price,
    };

    if (editingRow) {
      updateProduct(
        { id: editingRow.product_id, data: payload },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success("Product Updated Successfully");
            onClose();
          },
          onError: () => {
            toast.error("Update failed");
          },
        },
      );
    } else {
      createProduct(payload, {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Product Created Successfully");
          reset();
          onClose();
        },
        onError: () => {
          toast.error("Create failed");
        },
      });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">
        {editingRow ? "Update Product" : "Create Product"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:space-y-2 lg:gap-8"
      >
        {/* PRODUCT NAME */}
        <Controller
          name="name"
          control={control}
          defaultValue={editingRow?.name || ""}
          render={({ field }) => (
            <input {...field} placeholder="Product Name" className="input" />
          )}
        />

        {/* CATEGORY */}
        <Controller
          name="category"
          control={control}
          defaultValue={editingRow?.category_id || ""}
          rules={{ required: "Category required" }}
          render={({ field }) => (
            <Select
              styles={SelectStyles}
              options={CATEGORY_OPTIONS}
              value={CATEGORY_OPTIONS.find((opt) => opt.value === field.value)}
              onChange={(opt) => {
                field.onChange(opt?.value);
                setSelectedCategory(opt?.value);
              }}
              placeholder="Select Category"
            />
          )}
        />

        {/* SUBCATEGORY */}
        <Controller
          name="subCategory"
          control={control}
          defaultValue={editingRow?.subcategory_id || ""}
          rules={{ required: "SubCategory required" }}
          render={({ field }) => (
            <Select
              styles={SelectStyles}
              options={SUBCATEGORY_OPTIONS}
              value={SUBCATEGORY_OPTIONS.find(
                (opt) => opt.value === field.value,
              )}
              onChange={(opt) => field.onChange(opt?.value)}
              placeholder="Select SubCategory"
              isDisabled={!selectedCategory}
            />
          )}
        />

        {/* VARIANT */}
        <Controller
          name="variant"
          control={control}
          render={({ field }) => (
            <Select
              styles={SelectStyles}
              options={VARIANT_OPTIONS.map((v) => ({
                value: v,
                label: v,
              }))}
              onChange={(opt) => field.onChange(opt?.value)}
              placeholder="Variant"
              isDisabled={!selectedCategory}
            />
          )}
        />

        {/* BRAND */}
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Select
              styles={SelectStyles}
              options={BRAND_OPTIONS}
              onChange={(opt) => field.onChange(opt?.value)}
              placeholder="Brand"
              isDisabled={!selectedCategory}
            />
          )}
        />

        {/* COLOR */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Color" className="input" />
          )}
        />

        {/* MATERIAL */}
        <Controller
          name="material"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Material" className="input" />
          )}
        />

        {/* PRICE */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Price" className="input" />
          )}
        />

        {/* IMAGE */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Image URL" className="input" />
          )}
        />

        {/* BUTTONS */}
        <div className="md:col-span-3 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-6 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending || isUpdating}
            className="bg-orange-500 text-white px-6 py-2 rounded"
          >
            {editingRow
              ? isUpdating
                ? "Updating..."
                : "Update Product"
              : isPending
                ? "Saving..."
                : "Create Product"}
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          border: 2px solid #fdba74;
          border-radius: 6px;
          padding: 8px 10px;
        }
      `}</style>
    </div>
  );
}
