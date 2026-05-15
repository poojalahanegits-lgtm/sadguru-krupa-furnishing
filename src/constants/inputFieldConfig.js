const FIELD_CONFIG = {
  // Product base fields
  name: { label: "Product Name", type: "input" },
  price: { label: "Price", type: "number" },
  productCode: { label: "Product Code", type: "input" },
  brand: { label: "Brand", type: "input" },

  // curtain
  roomName: { label: "Room Name" },
  curtainType: {
    label: "Curtain Style",
    type: "select",
    options: [
      "Eyelet",
      "Ring",
      "Pleated",
      "American Pleated",
      "Loop Style",
      "Box Pleated",
      "Simple Style",
    ],
  },
  fabricCode: { label: "Fabric Code / Color" },
  width: { label: "Width" },
  height: { label: "Height" },
  measurementUnit: {
    label: "Measurement Unit",
    type: "select",
    options: [
      { value: "Inch", label: "Inch" },
      { value: "Feet", label: "Feet" },
      { value: "cm", label: "cm" },
    ],
  },
  quantity: { label: "Quantity", type: "number" },
  noOfPanels: { label: "No. of Panels", type: "number" },
  lining: {
    label: "Lining (अस्तर)",
    type: "select",
    options: ["Yes", "No"],
  },
  liningType: {
    label: "Lining Type",
    type: "select",
    options: ["Blackout", "Polyster"],
  },
  // stitchingStyle: { label: "Stitching Style" },
  installation: {
    label: "Installation",
    type: "select",
    options: ["Required", "Not Required"],
  },
  siteMeasurementRequired: {
    label: "Site Measurement ",
    type: "select",
    options: ["Done", "Not Done"],
  },
  deliveryDate: { label: "Delivery Date", type: "date" },
  orderStatus: {
    label: "Order Status",
    type: "select",
    options: ["Pending", "Processing", "Completed", "Cancelled", "Open"],
  },
  specialNotes: { label: "Special Notes", type: "textarea" },
  // SOFA
  sofaType: {
    label: "Sofa Type",
    type: "select",
    options: [
      "L Shape",
      "3 Seater",
      "2 Seater",
      "1 Seater",
      "Sectional",
      "Recliner",
      "Sofa Cum Bed",
      "Chesterfield",
      "Loveseat",
      "Corner Sofa",
      "Wooden Sofa",
      "Custom",
    ],
  },
  seatingCapacity: { label: "Seating Capacity", type: "number" },
  upholsteryMaterial: {
    label: "Upholstery Material",
    type: "select",
    options: ["Velvet", "Leather", "Fabric", "Rexin"],
  },
  fabricVariant: { label: "Fabric Variant" },
  dimensions: { label: "Dimensions" },
  repairOrNew: {
    label: "New / Repair  ",
    type: "select",
    options: ["Repair", "New"],
  },
  // MATTRESS
  mattressType: { label: "Mattress Type" },
  size: {
    label: "Size",
    type: "select",
    options: ["12×12", "16×16", "18×18", "17×22", "16×27", "24×24"],
  },
  length: { label: "Length" },
  thickness: { label: "Thickness" },
  firmnessLevel: {
    label: "Firmness Level",
    type: "select",
    options: ["Soft", "Medium", "Hard"],
  },
  customRequired: {
    label: "Custom Required",
    type: "select",
    options: ["Yes", "No"],
  },

  //BED LINEN
  fabricMaterial: { label: "Fabric Material" },

  // FLOORING
  flooringType: { label: "Flooring Type" },
  area: { label: "Area" },

  // WALLPAPER
  wallpaperCode: { label: "Wallpaper Code" },
  wallWidth: { label: "Wall Width" },
  wallHeight: { label: "Wall Height" },
  totalArea: { label: "Total Area" },
  installationRequired: {
    label: "Installation Required",
    type: "select",
    options: ["Yes", "No"],
  },

  // RUGS
  rugCode: { label: "Rug Code" },
  widthOrDiameter: { label: "Width / Diameter" },

  //BLINDS
  blindType: { label: "Blind Type" },
  material: { label: "Material" },
  operationType: {
    label: "Operation Type",
    type: "select",
    options: ["Manual", "Motorized"],
  },
  mountType: {
    label: "Mount Type",
    type: "select",
    options: ["Inside", "Outside"],
  },

  // GLASS FILMS
  filmCode: { label: "Film Code" },
  glassWidth: { label: "Glass Width" },
  glassHeight: { label: "Glass Height" },

  // PILLOWS
  pillowType: {
    label: "Pillow Type",
    type: "select",
    options: [
      "Jain",
      "Cotton",
      "Fiber",
      "Memory Foam",
      "Feather",
      "Latex",
      "Microfiber",
      "Gel",
      "Custom",
    ],
  },

  firmness: {
    label: "Firmness",
    type: "select",
    options: ["Soft", "Medium", "Hard"],
  },
};

export default FIELD_CONFIG;
