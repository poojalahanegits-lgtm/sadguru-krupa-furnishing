import {
  SelectStyles,
  InputStyles,
  TextareaStyles,
} from "../../constants/Config";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const toISODate = (date) => {
  if (!date) return "";
  if (typeof date === "string") return date;
  return date.toISOString().split("T")[0];
};

const fromISODate = (value) => {
  if (!value || value === "NA" || value === "") return null;
  // If it's already a Date object, return it
  if (value instanceof Date) return value;

  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

const FormField = ({
  name,
  control,
  label,
  type = "input",
  options = [],
  placeholder = "",
  error,
  onChange: customOnChange,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium ">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const hasError = error || fieldState?.error;
          const inputClass = `${InputStyles.base} ${hasError ? InputStyles.error : ""} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`;
          const textareaClass = `${TextareaStyles.base} ${hasError ? TextareaStyles.error : ""}`;

          // date picker
          if (type === "date") {
            return (
              <DatePicker
                selected={fromISODate(field.value)}
                onChange={(d) => field.onChange(toISODate(d))}
                dateFormat="d MMM yyyy"
                isClearable
                wrapperClassName="w-full"
                placeholderText={placeholder || "Select date"}
                className={inputClass}
                readOnly={readOnly}
                disabled={readOnly}
              />
            );
          }

          // select dropdown
          if (type === "select") {
            // Handle both array of strings and array of objects
            const selectOptions = options.map((opt) =>
              typeof opt === "object" && opt.value
                ? opt
                : { value: opt, label: opt },
            );

            return (
              <Select
                {...field}
                options={selectOptions}
                placeholder={placeholder || "Select..."}
                isClearable
                isDisabled={readOnly}
                styles={SelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(selected) => {
                  const value = selected?.value || "";
                  field.onChange(value);
                  if (customOnChange) customOnChange(value);
                }}
                value={
                  field.value && field.value !== ""
                    ? selectOptions.find((opt) => opt.value === field.value) ||
                      null
                    : null
                }
              />
            );
          }

          // textarea
          if (type === "textarea") {
            return (
              <textarea
                {...field}
                rows={3}
                placeholder={placeholder}
                className={textareaClass}
                readOnly={readOnly}
                value={field.value || ""}
              />
            );
          }

          // number input
          if (type === "number") {
            return (
              <input
                {...field}
                type="number"
                placeholder={placeholder}
                className={inputClass}
                readOnly={readOnly}
                value={field.value || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Number(e.target.value);
                  field.onChange(value);
                  if (customOnChange) customOnChange(e);
                }}
              />
            );
          }

          // default text input
          return (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={inputClass}
              readOnly={readOnly}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                if (customOnChange) customOnChange(e);
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;

// import {
//   SelectStyles,
//   InputStyles,
//   TextareaStyles,
// } from "../../constants/Config";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useForm, Controller } from "react-hook-form";
// const toISODate = (date) => (date ? date.toISOString().split("T")[0] : "");
// const fromISODate = (value) => {
//   if (!value || value === "NA") return null;
//   const date = new Date(value);
//   return isNaN(date.getTime()) ? null : date;
// };
// const FormField = ({
//   name,
//   control,
//   label,
//   type = "input",
//   options = [],
//   placeholder = "",
//   error,
//   onChange: customOnChange,
//   ...rest
// }) => {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-600">{label}</label>

//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => {
//           const hasError = error || fieldState?.error;
//           const inputClass = `${InputStyles.base} ${hasError ? InputStyles.error : ""}`;
//           const textareaClass = `${TextareaStyles.base} ${hasError ? TextareaStyles.error : ""}`;
//           // date
//           if (type === "date") {
//             return (
//               <DatePicker
//                 selected={fromISODate(field.value)}
//                 onChange={(d) => field.onChange(toISODate(d))}
//                 dateFormat="d MMM yyyy"
//                 isClearable
//                 wrapperClassName="w-full"
//                 placeholderText={"Select date"}
//                 className={inputClass}
//               />
//             );
//           }
//           // select
//           // In FormField.jsx, update the select onChange handler:
//           if (type === "select") {
//             return (
//               <Select
//                 {...field}
//                 options={options.map((opt) =>
//                   typeof opt === "object" ? opt : { value: opt, label: opt },
//                 )}
//                 placeholder={`Select`}
//                 isClearable
//                 styles={SelectStyles}
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 onChange={(selected) => {
//                   const value = selected?.value || "";
//                   field.onChange(value);
//                   if (customOnChange) customOnChange(value);
//                 }}
//                 value={
//                   field.value
//                     ? options.find(
//                         (opt) =>
//                           (typeof opt === "object" ? opt.value : opt) ===
//                           field.value,
//                       ) || null
//                     : null
//                 }
//               />
//             );
//           }
//           // if (type === "select") {
//           //   return (
//           //     <Select
//           //       {...field}
//           //       options={options.map((opt) =>
//           //         typeof opt === "object" ? opt : { value: opt, label: opt },
//           //       )}
//           //       // placeholder={`Select ${label}`}
//           //       placeholder={`Select`}
//           //       isClearable
//           //       styles={SelectStyles}
//           //       className="react-select-container"
//           //       classNamePrefix="react-select"
//           //       onChange={(selected) => field.onChange(selected?.value || "")}
//           //       value={
//           //         options.find(
//           //           (opt) =>
//           //             (typeof opt === "object" ? opt.value : opt) ===
//           //             field.value,
//           //         ) || null
//           //       }
//           //     />
//           //   );
//           // }

//           // text area
//           if (type === "textarea") {
//             return (
//               <textarea
//                 {...field}
//                 rows={2}
//                 placeholder={placeholder}
//                 className={textareaClass}
//               />
//             );
//           }
//           // input
//           return (
//             <input
//               {...field}
//               type={type}
//               placeholder={placeholder}
//               className={inputClass}
//             />
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default FormField;
