// =========================
// 🔹 CUSTOMER FORM COMPONENT
// Used for:
// - Create Customer
// - Edit Customer
// - Save & Continue Flow
// =========================

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const AddCustomer = ({
  onCheckMobile,
  customer,
  onSave,
  onCancel,
  showNextButton = true,
}) => {
  // =========================
  // 🔹 LOCAL STATE MANAGEMENT
  // =========================
  const [mobileError, setMobileError] = useState("");
  const [alternateMobileError, setAlternateMobileError] = useState("");
  const [mobileExists, setMobileExists] = useState(false);
  // =========================
  // 🔹 REACT HOOK FORM SETUP
  // =========================
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: customer || {
      name: "",
      mobile: "",
      alternateMobile: "",
      city: "",
      address: "",
      referenceBy: "",
      siteVisitDate: new Date().toISOString().slice(0, 10),
      notes: "",
    },
  });

  // =========================
  // 🔹 MOBILE VALIDATION
  // Ensures mobile number contains exactly 10 digits
  // =========================
  const validateMobile = (value) => {
    if (!value) return true;
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(value);
  };

  // =========================
  // 🔹 MOBILE INPUT HANDLING
  // - Removes previous errors
  // - Validates length
  // - Resets duplicate state
  // =========================
  const handleMobileChange = (value) => {
    setMobileError("");
    setMobileExists(false);

    if (value && value.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
    }
  };
  // =========================
  // 🔹 ALTERNATE MOBILE HANDLER
  // - Allows only digits
  // - Restricts to 10 digits
  // =========================
  // Handle alternate mobile input change
  const handleAlternateMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
    setValue("alternateMobile", value);
    if (value && value.length !== 10) {
      setAlternateMobileError("Alternate number must be exactly 10 digits");
    } else {
      setAlternateMobileError("");
    }
  };
  // =========================
  // 🔹 FORM SUBMISSION
  // Handles:
  // - required validation
  // - mobile validation
  // - duplicate validation
  // - save customer
  // =========================
  const onSubmit = async (data) => {
    if (!data.name || !data.mobile) {
      toast.error("Name and Mobile No. Required");
      return;
    }

    // Mobile Validation
    if (!validateMobile(data.mobile)) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }
    if (mobileExists) {
      setMobileError("This mobile number already exists");
      return;
    }
    if (data.alternateMobile && !validateMobile(data.alternateMobile)) {
      setAlternateMobileError("Alternate number must be exactly 10 digits");
      return;
    }

    try {
      toast.dismiss();
      toast.success(
        customer
          ? "Customer Updated Successfully"
          : "Customer Created Successfully",
      );

      onSave?.(data);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  // =========================
  // 🔹 SAVE & CONTINUE FLOW
  // Saves customer and moves user to next step
  // =========================
  const handleSaveAndNext = async () => {
    const data = getValues();

    if (!data.name || !data.mobile) {
      toast.dismiss();
      toast.error("Name and Mobile Required");
      return;
    }

    if (!validateMobile(data.mobile)) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      toast.dismiss();
      toast.success(customer ? "Customer Updated" : "Customer Saved");

      onSave?.(data, true);
    } catch (error) {
      console.log(error);

      toast.error("Failed to save customer");
    }
  };
  // =========================
  // 🔹 MAIN FORM UI
  // =========================
  return (
    <div
      className="relative 
  mt-3 sm:mt-5 lg:mt-8
  mb-6 lg:mb-16
  mx-3 sm:mx-6 md:mx-10 lg:mx-16
  px-4 sm:px-6 lg:px-8
  pt-5 pb-6
   lg:rounded-3xl
  lg:shadow-[0px_4px_18px_rgba(0,0,0,0.12)]
  bg-white"
    >
      {/* Header */}
      <div className="">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          {customer ? "Edit Customer" : "Add New Customer"}
        </h3>
        {/* <p className="text-gray-500 text-sm my-1">
          Enter customer details to manage orders efficiently
        </p> */}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="
  mt-5
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-4 sm:gap-5 lg:gap-6
"
        >
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter full name"
              className="input border-2 border-black focus:border-black focus:ring-0 outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <input
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) value = value.slice(0, 10);

                    field.onChange(value);
                    handleMobileChange(value);

                    if (value.length === 10 && onCheckMobile) {
                      onCheckMobile(value)
                        .then((res) => {
                          const exists = res?.exists || res?.data?.exists;
                          const customerName =
                            res?.data?.data?.name || res?.data?.name;

                          if (exists) {
                            setMobileExists(true);
                            setMobileError(
                              `Customer already exists${
                                customerName ? ` (${customerName})` : ""
                              }`,
                            );
                          } else {
                            setMobileExists(false);
                            setMobileError("");
                          }
                        })
                        .catch((err) => {
                          console.log("API ERROR:", err);
                        });
                    }
                  }}
                  // onBlur={handleMobileBlur}
                  placeholder="Primary contact number"
                  className={`input ${mobileError ? "border-red-500" : ""}`}
                />
              )}
            />
            {mobileError && (
              <p className="text-red-500 text-xs mt-1">{mobileError}</p>
            )}
          </div>

          {/* Alternate */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Alternate Number
            </label>
            <input
              {...register("alternateMobile")}
              onChange={handleAlternateMobileChange}
              placeholder="Optional"
              className={`input ${alternateMobileError ? "border-red-500" : ""}`}
            />
            {alternateMobileError && (
              <p className="text-red-500 text-xs mt-1">
                {alternateMobileError}
              </p>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              City
            </label>
            <input
              {...register("city")}
              placeholder="Enter city"
              className="input"
            />
          </div>
          {/* Reference */}
          {/* <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Reference By
            </label>
            <input
              {...register("referenceBy")}
              placeholder="Referral / source"
              className="input"
            />
          </div> */}
          {/* Address */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Full Address
            </label>
            <textarea
              {...register("address")}
              rows="2"
              placeholder="Enter Complete address"
              className="input resize-none"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
              Enter Notes
            </label>
            <textarea
              {...register("notes")}
              rows="2"
              placeholder="Enter Imp Notes"
              className="input resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          className="
  flex
  flex-col
  sm:flex-row
  sm:justify-end
  gap-3
  mt-8
  pt-5
  border-t border-gray-200
"
        >
          <button
            type="button"
            className="
  w-full sm:w-auto
  px-6 py-3
  cursor-pointer font-extrabold
  rounded-xl
  border border-gray-300
  text-gray-600
  hover:bg-gray-100
  transition
  text-md sm:text-base
"
            onClick={onCancel}
          >
            Cancel
          </button>
          {showNextButton ? (
            <>
              <button
                type="submit" // ← Change to type="submit"
                className="
  w-full sm:w-auto
  px-6 py-3
  cursor-pointer
  rounded-xl
  bg-gray-900
  text-white
  font-semibold
  hover:bg-black
  transition
  shadow-md
  text-sm sm:text-base
"
                // Remove onClick={onSubmit} - let the form handle it
              >
                Save Customer
              </button>

              <button
                type="button"
                className="
  w-full sm:w-auto
  px-6 py-3
  rounded-xl
  bg-gradient-to-r from-black to-gray-700
  text-white
  font-semibold
  shadow-lg
  hover:opacity-90
  transition
  cursor-pointer
  text-sm sm:text-base
"
                onClick={handleSaveAndNext}
              >
                Save & Next →
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md cursor-pointer"
            >
              Save Customer
            </button>
          )}
          {/* {showNextButton ? (
            <>
              <button
                type="button"
                className="px-6 cursor-pointer py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md"
                onClick={handleSaveAndNext}
              >
                Save Customer
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-black to-gray-700 text-white font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
                onClick={handleSaveAndNext}
              >
                Save & Next →
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md cursor-pointer"
            >
              Save Customer
            </button>
          )} */}
        </div>
      </form>

      {/* Input Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          transition: all 0.2s ease;
          font-size: 14px;
          min-height: 48px;
        }

        @media (min-width: 640px) {
          .input {
            font-size: 15px;
          }
        }

        .input:focus {
          outline: none;
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
        }

        .input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default AddCustomer;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// const AddCustomer = ({ customer, onSave, onCancel, showNextButton = true }) => {
//   const [mobileError, setMobileError] = useState("");
//   const [alternateMobileError, setAlternateMobileError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     getValues,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: customer || {
//       name: "",
//       mobile: "",
//       alternateMobile: "",
//       city: "",
//       address: "",
//       referenceBy: "",
//       siteVisitDate: new Date().toISOString().slice(0, 10),
//       notes: "",
//     },
//   });

//   // Validate mobile number (10 digits)
//   const validateMobile = (value) => {
//     if (!value) return true;
//     const mobileRegex = /^\d{10}$/;
//     return mobileRegex.test(value);
//   };

//   // Handle mobile input change
//   const handleMobileChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
//     if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
//     setValue("mobile", value);
//     if (value && value.length !== 10) {
//       setMobileError("Mobile number must be exactly 10 digits");
//     } else {
//       setMobileError("");
//     }
//   };

//   // Handle alternate mobile input change
//   const handleAlternateMobileChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
//     if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
//     setValue("alternateMobile", value);
//     if (value && value.length !== 10) {
//       setAlternateMobileError("Alternate number must be exactly 10 digits");
//     } else {
//       setAlternateMobileError("");
//     }
//   };

//   const onSubmit = async (data) => {
//     if (!data.name || !data.mobile) {
//       toast.error("Name and Mobile No. Required");
//       return;
//     }

//     // Mobile Validation
//     if (!validateMobile(data.mobile)) {
//       setMobileError("Mobile number must be exactly 10 digits");
//       return;
//     }

//     if (data.alternateMobile && !validateMobile(data.alternateMobile)) {
//       setAlternateMobileError("Alternate number must be exactly 10 digits");
//       return;
//     }

//     try {
//       toast.success("Customer Created Successfully");

//       onSave?.(data);
//     } catch (error) {
//       console.log(error);

//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleSaveAndNext = async () => {
//     const data = getValues();

//     if (!data.name || !data.mobile) {
//       toast.dismiss();
//       toast.error("Name and Mobile Required");
//       return;
//     }

//     if (!validateMobile(data.mobile)) {
//       setMobileError("Mobile number must be exactly 10 digits");
//       return;
//     }

//     try {
//       toast.success("Customer Saved");

//       onSave?.(data, true);
//     } catch (error) {
//       console.log(error);

//       toast.error("Failed to save customer");
//     }
//   };

//   return (
//     <div className="relative lg:mb-16 lg:mt-8  mt-4 shadow-[5px_3px_10px_rgba(0,0,0,0.35)] rounded-3xl px-8 py-6 lg:mx-16">
//       {/* Header */}
//       <div className="">
//         <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
//           {customer ? "Edit Customer" : "Add New Customer"}
//         </h3>
//         <p className="text-gray-500 text-sm my-1">
//           Enter customer details to manage orders efficiently
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Name */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Customer Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("name", { required: true })}
//               placeholder="Enter full name"
//               className="input border-2 border-black focus:border-black focus:ring-0 outline-none"
//             />
//           </div>

//           {/* Mobile */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Mobile Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("mobile")}
//               onChange={handleMobileChange}
//               placeholder="Primary contact number"
//               className={`input ${mobileError ? "border-red-500" : ""}`}
//             />
//             {mobileError && (
//               <p className="text-red-500 text-xs mt-1">{mobileError}</p>
//             )}
//           </div>

//           {/* Alternate */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Alternate Number
//             </label>
//             <input
//               {...register("alternateMobile")}
//               onChange={handleAlternateMobileChange}
//               placeholder="Optional"
//               className={`input ${alternateMobileError ? "border-red-500" : ""}`}
//             />
//             {alternateMobileError && (
//               <p className="text-red-500 text-xs mt-1">
//                 {alternateMobileError}
//               </p>
//             )}
//           </div>

//           {/* City */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">City</label>
//             <input
//               {...register("city")}
//               placeholder="Enter city"
//               className="input"
//             />
//           </div>
//           {/* Reference */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Reference By
//             </label>
//             <input
//               {...register("referenceBy")}
//               placeholder="Referral / source"
//               className="input"
//             />
//           </div>
//           {/* Address */}
//           <div className="flex flex-col gap-2 ">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Full Address
//             </label>
//             <textarea
//               {...register("address")}
//               rows="2"
//               placeholder="Complete address"
//               className="input resize-none"
//             />
//           </div>

//           {/* Notes */}
//           <div className="flex flex-col gap-2 ">
//             <label className="text-sm sm:text-[15px] font-semibold text-gray-700">
//               Customer Notes
//             </label>
//             <textarea
//               {...register("notes")}
//               rows="2"
//               placeholder="Any important notes..."
//               className="input resize-none"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
//           <button
//             type="button"
//             className="px-6 py-2.5 cursor-pointer rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           {showNextButton ? (
//             <>
//               <button
//                 type="submit" // ← Change to type="submit"
//                 className="px-6 cursor-pointer py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md"
//                 // Remove onClick={onSubmit} - let the form handle it
//               >
//                 Save Customer
//               </button>

//               <button
//                 type="button"
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-black to-gray-700 text-white font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
//                 onClick={handleSaveAndNext}
//               >
//                 Save & Next →
//               </button>
//             </>
//           ) : (
//             <button
//               type="submit"
//               className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md cursor-pointer"
//             >
//               Save Customer
//             </button>
//           )}
//           {/* {showNextButton ? (
//             <>
//               <button
//                 type="button"
//                 className="px-6 cursor-pointer py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md"
//                 onClick={handleSaveAndNext}
//               >
//                 Save Customer
//               </button>

//               <button
//                 type="submit"
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-black to-gray-700 text-white font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
//                 onClick={handleSaveAndNext}
//               >
//                 Save & Next →
//               </button>
//             </>
//           ) : (
//             <button
//               type="submit"
//               className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition shadow-md cursor-pointer"
//             >
//               Save Customer
//             </button>
//           )} */}
//         </div>
//       </form>

//       {/* Input Styles */}
//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 12px 14px;
//           border-radius: 12px;
//           border: 1px solid #e5e7eb;
//           background: #ffffff;
//           transition: all 0.2s ease;
//           font-size: 14px;
//         }

//         .input:focus {
//           outline: none;
//           border-color: #111827;
//           box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
//         }

//         .input::placeholder {
//           color: #9ca3af;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddCustomer;
