export const ORDER_FIELDS = {
  curtains: [
    "roomName",
    "curtainType",
    "width",
    "height",
    "measurementUnit",

    "noOfPanels",
    "lining",
    // "stitchingStyle",
    "liningType",
    "installation",
    "siteMeasurementRequired",
  ],

  sofaSeating: [
    "sofaType",
    "seatingCapacity",
    "upholsteryMaterial",
    "dimensions",

    "repairOrNew",
  ],

  mattress: [
    "mattressType",
    "size",
    "length",
    "width",
    "thickness",
    "firmnessLevel",

    "customRequired",
  ],

  bedLinen: ["size", "fabricMaterial"],

  bathLinen: [],

  flooring: ["flooringType", "area", "length", "width", "thickness"],

  wallpapers: ["wallWidth", "wallHeight", "totalArea", "installationRequired"],

  rugs: ["length", "widthOrDiameter"],

  blinds: [
    "blindType",
    "material",
    "operationType",
    "width",
    "height",
    "mountType",

    "installationRequired",
  ],

  glassFilms: ["glassWidth", "glassHeight"],

  pillows: ["pillowType", "size", "firmness"],
  // pillows: ["pillowType", "material", "size", "firmness"],
};
