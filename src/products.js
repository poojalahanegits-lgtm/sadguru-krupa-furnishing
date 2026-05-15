import { IMAGES } from "@/constants/images";
const products = [
  //! 1.CURTAINS
  {
    title: "Curtains",
    slug: "curtains",
    image: IMAGES.categoryImg1,
    bannerImage: IMAGES.Banner_Curtain,
    bannerTitle:
      "Elevate your space with style, privacy and perfect light control.",

    brands: [
      "D'Decor",
      "Sansar",
      "FabriCare",
      "Adore (Asian Paints)",
      "Pure (Asian Paints)",
      "GM Fabrics",
      "Sharom",
      "JMP",
      "Signature Design",
      "Jai Durga Decor",
      "DVS",
      "Somfy",
    ],
    fabricVariants: [
      "Linen",
      "Cotton",
      "Polyester",
      "Velvet",
      "Silk",
      "Jacquard",
      "Jute",
      "Sheer with Embroidery",
    ],
    operationTypes: ["Manual", "Motorized"],
    subCategories: [
      {
        name: "Blackout Curtains",
        slug: "blackout-curtains",
        images: [IMAGES.Blackout_Curtain],
      },
      {
        name: "Sheer Curtains",
        slug: "sheer-curtains",
        images: [IMAGES.Sheer_Curtain],
      },
      {
        name: "Thermal / Insulated Curtains",
        slug: "thermal-insulated-curtains",
        images: [IMAGES.Thermal_Insulated_Curtain],
      },
      {
        name: "Motorized Curtains",
        slug: "motorized-curtains",
        images: [IMAGES.Motorized_Curtain],
      },

      // {
      //   name: "Bathroom Curtains",
      //   slug: "bathroom-curtains",
      //   images: [IMAGES.curtainImg2, IMAGES.curtainImg4],
      // },
      // {
      //   name: "AC Curtains",
      //   slug: "ac-curtains",
      //   images: [IMAGES.curtainImg5, IMAGES.curtainImg6],
      // },
      // {
      //   name: "Curtain Tracks",
      //   slug: "curtain-tracks",
      //   images: [IMAGES.curtainImg1, IMAGES.curtainImg3],
      // },
    ],
    accessories: [
      {
        name: "Curtain Tracks",
        slug: "curtain-tracks",
        images: [IMAGES.Curtain_Tracks],
      },
      {
        name: "Curtain Rods",
        slug: "curtain-rods",
        images: [IMAGES.Curtain_Rods],
      },
      {
        name: "Curtain Brackets",
        slug: "curtain-brackets",
        images: [IMAGES.Curtain_Brackets],
      },
      {
        name: "Curtain Finials",
        slug: "curtain-finials",
        images: [IMAGES.Curtain_Finials],
      },
    ],
  },
  // ✅2. SOFA
  {
    title: "Sofa & Seating",
    slug: "sofa-&seating",
    image: IMAGES.categoryImg2,

    bannerTitle: "Discover comfort and style made for everyday living.",

    brands: [
      "D'Decor",
      "Sansar",
      "FabriCare",
      "Adore (Asian Paints)",
      "Pure (Asian Paints)",
      "GM Fabrics",
      "Sharom",
      "JMP",
      "Signature Design",
      "Jai Durga Decor",
      "DVS",
    ],
    upholsteryMaterials: [
      "Velvet",
      "Jute",
      "Suede",
      "Cotton",
      "Wool",
      "Faux Leather",
      "Original Leather",
      "Rexin",
      "Denim",
      "Jacquard",
    ],
    subCategories: [
      {
        name: "3 Seater Sofas",
        slug: "3-seater-sofas",
        images: [IMAGES.Seater3Sofas],
      },
      {
        name: "2 Seater Sofas",
        slug: "2-seater-sofas",
        images: [IMAGES.Seater2Sofas],
      },
      {
        name: "1 Seater Sofas",
        slug: "1-seater-sofas",
        images: [IMAGES.Seater1Sofas],
      },
      {
        name: "Chaise Lounge",
        slug: "chaise-lounge",
        images: [IMAGES.ChaiseLounge],
      },
      {
        name: "L-Shape Sofas",
        slug: "l-shape-sofas",
        images: [IMAGES.LShapeSofas],
      },
      {
        name: "Sofa Cum Bed",
        slug: "sofa-cum-bed",
        images: [IMAGES.SofaCumBed],
      },
      {
        name: "U-Shape Sofas",
        slug: "u-shape-sofas",
        images: [IMAGES.UShapeSofas],
      },

      {
        name: "Storage Sofas",
        slug: "storage-sofas",
        images: [IMAGES.StorageSofas],
      },
      {
        name: "Recliner Sofas",
        slug: "recliner-sofas",
        images: [IMAGES.ReclinerSofa],
      },
      {
        name: "360° Rotating Chairs",
        slug: "360-rotating-chairs",
        images: [IMAGES.RotatingChairs360],
      },
      {
        name: "Ottoman",
        slug: "ottoman",
        images: [IMAGES.Ottoman],
      },
    ],
    bannerImage: IMAGES.Banner_SofaSeating,
  },
  // ✅ 3.MATTRESS
  {
    title: "Mattress",
    slug: "mattress",
    image: IMAGES.categoryImg3,
    brands: ["Duroflex", "Peps", "MM Foam", "Century", "Custom Handmade"],

    bannerTitle: "Sleep better every night with superior comfort and support..",
    subCategories: [
      {
        name: "Orthopedic Mattress",
        slug: "orthopedic-mattress",
        images: [IMAGES.OrthopedicMattress],
        products: [
          { name: "Orthopedic Support Mattress", brand: "Duroflex" },
          { name: "Orthopedic Comfort Mattress", brand: "Peps" },
          { name: "Custom Orthopedic Mattress", brand: "Custom Handmade" },
        ],
      },
      {
        name: "Memory Foam Mattress",
        slug: "memory-foam-mattress",
        images: [IMAGES.MemoryFoamMattress],
        products: [
          { name: "Memory Foam Comfort Plus", brand: "MM Foam" },
          { name: "Orthopedic Memory Foam", brand: "Duroflex" },
          { name: "Premium Memory Foam Mattress", brand: "Century" },
        ],
      },
      {
        name: "Latex Mattress",
        slug: "latex-mattress",
        images: [IMAGES.LatexMattress],
        products: [
          { name: "Natural Latex Mattress", brand: "MM Foam" },
          { name: "Premium Latex Comfort", brand: "Duroflex" },
          { name: "Custom Latex Mattress", brand: "Custom Handmade" },
        ],
      },
      {
        name: "Spring Mattress",
        slug: "spring-mattress",
        images: [IMAGES.SpringMattress],
        products: [
          { name: "Pocket Spring Mattress", brand: "Century" },
          { name: "Luxury Spring Mattress", brand: "Peps" },
          { name: "Custom Spring Mattress", brand: "Custom Handmade" },
        ],
      },
      {
        name: "Rebonded Foam Mattress",
        slug: "rebonded-foam-mattress",
        images: [IMAGES.RebondedFoamMattress],
        products: [
          { name: "Rebonded Foam Mattress", brand: "Century" },
          { name: "Economy Rebonded Mattress", brand: "Peps" },
          { name: "Custom Rebonded Mattress", brand: "Custom Handmade" },
        ],
      },

      {
        name: "Cotton Mattress",
        slug: "cotton-mattress",
        images: [IMAGES.CottonMattress],
        products: [
          { name: "Pure Cotton Mattress", brand: "Custom Handmade" },
          { name: "Traditional Cotton Mattress", brand: "MM Foam" },
          { name: "Eco Cotton Mattress", brand: "Century" },
        ],
      },
      {
        name: "Hybrid Mattress",
        slug: "hybrid-mattress",
        images: [IMAGES.HybridMattress],
        products: [
          { name: "Hybrid Comfort Mattress", brand: "Duroflex" },
          { name: "Premium Hybrid Mattress", brand: "Century" },
        ],
      },
      {
        name: "Dual Comfort Mattress",
        slug: "dual-comfort-mattress",
        images: [IMAGES.DualComfortMattress],
        products: [
          { name: "Dual Comfort Mattress", brand: "Peps" },
          { name: "Reversible Comfort Mattress", brand: "Duroflex" },
        ],
      },
      {
        name: "Mattress Cover",
        slug: "mattress-cover",
        images: [IMAGES.MattressCover],
        products: [
          { name: "Waterproof Mattress Protector", brand: "Duroflex" },
          { name: "Cotton Mattress Cover", brand: "Peps" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Mattress,
  },

  // ✅4. BED LINEN
  {
    title: "Bed Linen",
    slug: "bed-linen",
    image: IMAGES.categoryImg4,

    bannerTitle:
      "Upgrade your sleep with soft, stylish and breathable fabrics.",
    brands: ["Spaces (Welspun)", "Trident", "Raymond", "Portico", "Others"],

    subCategories: [
      {
        name: "Single Bedsheets",
        slug: "single-bedsheets",
        images: [IMAGES.SingleBedsheets],
        products: [
          { name: "Single Bedsheet", brand: "Spaces (Welspun)" },
          { name: "Single Bedsheet Premium", brand: "Trident" },
        ],
      },
      {
        name: "Double Bedsheets",
        slug: "double-bedsheets",
        images: [IMAGES.DoubleBedsheets],
        products: [
          { name: "Double Bedsheet", brand: "Portico" },
          { name: "Double Bedsheet Luxury", brand: "Raymond" },
        ],
      },
      {
        name: "Queen Bedsheets",
        slug: "queen-bedsheets",
        images: [IMAGES.QueenBedsheets],
        products: [
          { name: "Queen Bedsheet", brand: "Spaces (Welspun)" },
          { name: "Queen Bedsheet Designer", brand: "Trident" },
        ],
      },
      {
        name: "King Bedsheets",
        slug: "king-bedsheets",
        images: [IMAGES.KingBedsheets],
        products: [
          { name: "King Bedsheet", brand: "Raymond" },
          { name: "King Bedsheet Premium", brand: "Portico" },
        ],
      },
      {
        name: "Super King Bedsheets",
        slug: "super-king-bedsheets",
        images: [IMAGES.SuperKingBedsheets],
        products: [
          { name: "Super King Bedsheet", brand: "Spaces (Welspun)" },
          { name: "Super King Luxury Bedsheet", brand: "Trident" },
        ],
      },
      {
        name: "Fitted Bedsheets",
        slug: "fitted-bedsheets",
        images: [IMAGES.FittedBedsheets],
        products: [
          { name: "Fitted Bedsheet", brand: "Trident" },
          { name: "Elastic Fitted Bedsheet", brand: "Portico" },
        ],
      },
      {
        name: "Pillow Covers",
        slug: "pillow-covers",
        images: [IMAGES.PillowCovers],
        products: [
          { name: "Standard Pillow Cover", brand: "Portico" },
          { name: "Premium Pillow Cover", brand: "Spaces (Welspun)" },
        ],
      },
      {
        name: "Comforters",
        slug: "comforters",
        images: [IMAGES.Comforters],
        products: [
          { name: "All Season Comforter", brand: "Trident" },
          { name: "Luxury Comforter", brand: "Raymond" },
        ],
      },
      {
        name: "Dohars",
        slug: "dohars",
        images: [IMAGES.Dohars],
        products: [
          { name: "Cotton Dohar", brand: "Spaces (Welspun)" },
          { name: "Lightweight Dohar", brand: "Portico" },
        ],
      },
      {
        name: "Blankets",
        slug: "blankets",
        images: [IMAGES.Blankets],
        products: [
          { name: "Winter Blanket", brand: "Raymond" },
          { name: "Soft Fleece Blanket", brand: "Trident" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_BedLinen,
  },

  // 5. Bath Linen

  {
    title: "Bath Linen",
    slug: "bath-linen",
    image: IMAGES.categoryImg5,

    bannerTitle: "Wrap yourself in everyday luxury and lasting softness.",
    brands: ["Spaces (Welspun)", "Trident", "Raymond", "Portico", "Others"],
    subCategories: [
      {
        name: "Bath Towels",
        slug: "bath-towels",
        images: [IMAGES.BathTowels],
        products: [
          { name: "Cotton Bath Towel", brand: "Trident" },
          { name: "Luxury Bath Towel", brand: "Spaces (Welspun)" },
        ],
      },
      {
        name: "Hand Towels",
        slug: "hand-towels",
        images: [IMAGES.HandTowels],
        products: [
          { name: "Soft Hand Towel", brand: "Portico" },
          { name: "Absorbent Hand Towel", brand: "Raymond" },
        ],
      },
      {
        name: "Face Towels",
        slug: "face-towels",
        images: [IMAGES.FaceTowels],
        products: [
          { name: "Face Towel Pack", brand: "Trident" },
          { name: "Premium Face Towel", brand: "Spaces (Welspun)" },
        ],
      },
      {
        name: "Bathrobes",
        slug: "bathrobes",
        images: [IMAGES.Bathrobes],
        products: [
          { name: "Cotton Bathrobe", brand: "Raymond" },
          { name: "Luxury Spa Bathrobe", brand: "Spaces (Welspun)" },
        ],
      },
      {
        name: "Bath Mats",
        slug: "bath-mats",
        images: [IMAGES.BathMats],
        products: [
          { name: "Anti-Slip Bath Mat", brand: "Trident" },
          { name: "Soft Cotton Bath Mat", brand: "Portico" },
        ],
      },
      {
        name: "Shower Curtains",
        slug: "shower-curtains",
        images: [IMAGES.ShowerCurtains],
        products: [
          { name: "Waterproof Shower Curtain", brand: "Spaces (Welspun)" },
          { name: "Designer Shower Curtain", brand: "Raymond" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_BathLinen,
  },
  // ✅6. FLOORING
  {
    title: "Flooring",
    slug: "flooring",
    image: IMAGES.categoryImg6,

    bannerTitle: "Transform your home from the ground up.",
    brands: ["Welspun", "Wonderwood", "Excel", "Floorwork"],
    subCategories: [
      {
        name: "Wooden Flooring",
        slug: "wooden-flooring",
        images: [IMAGES.WoodenFlooring],
        products: [
          { name: "Engineered Wooden Flooring", brand: "Wonderwood" },
          { name: "Hardwood Flooring", brand: "Floorwork" },
          { name: "Wood Finish Flooring", brand: "Welspun" },
        ],
      },
      {
        name: "Vinyl Flooring",
        slug: "vinyl-flooring",
        images: [IMAGES.VinylFlooring],
        products: [
          { name: "Luxury Vinyl Tile (LVT)", brand: "Excel" },
          { name: "Vinyl Roll Flooring", brand: "Welspun" },
          { name: "Vinyl Plank Flooring", brand: "Floorwork" },
        ],
      },
      {
        name: "SPC Flooring",
        slug: "spc-flooring",
        images: [IMAGES.SPCFlooring],
        products: [
          { name: "SPC Click Lock Flooring", brand: "Wonderwood" },
          { name: "Rigid Core SPC Flooring", brand: "Excel" },
          { name: "Waterproof SPC Flooring", brand: "Floorwork" },
        ],
      },
      {
        name: "Carpet Tiles",
        slug: "carpet-tiles",
        images: [IMAGES.CarpetTiles],
        products: [
          { name: "Office Carpet Tiles", brand: "Welspun" },
          { name: "Heavy Duty Carpet Tiles", brand: "Excel" },
          { name: "Designer Carpet Tiles", brand: "Floorwork" },
        ],
      },
      {
        name: "Laminate Flooring",
        slug: "laminate-flooring",
        images: [IMAGES.LaminateFlooring],
        products: [
          { name: "Laminate Wood Flooring", brand: "Wonderwood" },
          { name: "Scratch Resistant Laminate", brand: "Excel" },
        ],
      },
      {
        name: "Artificial Grass Flooring",
        slug: "artificial-grass-flooring",
        images: [IMAGES.ArtificialGrassFlooring],
        products: [
          { name: "Indoor Artificial Grass", brand: "Floorwork" },
          { name: "Outdoor Turf Grass", brand: "Welspun" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Flooring,
  },
  // ✅ 7.  Wallpapers Structure
  {
    title: "Wallpapers",
    slug: "wallpapers",
    image: IMAGES.categoryImg7,

    bannerTitle: "Instantly refresh your walls with bold, beautiful designs.",
    brands: ["Excel", "D'Decor", "Asian Paints", "Rivee Designs"],
    patternVariants: [
      "Floral",
      "Geometric",
      "Abstract",
      "Damask",
      "Minimal / Solid",
      "Murals / Scenic",
    ],
    subCategories: [
      {
        name: "Floral  Wallpapers",
        slug: "floral- Wallpapers",
        images: [IMAGES.FloralWallpaper],
        products: [
          {
            name: "Floral Designer  Wallpapers",
            brand: "Excel",
            pattern: "Floral",
          },
          {
            name: "Luxury Floral  Wallpapers",
            brand: "Rivee Designs",
            pattern: "Floral",
          },
        ],
      },
      {
        name: "Geometric  Wallpapers",
        slug: "geometric- Wallpapers",
        images: [IMAGES.GeometricWallpaper],
        products: [
          {
            name: "Modern Geometric  Wallpapers",
            brand: "D'Decor",
            pattern: "Geometric",
          },
          {
            name: "Premium Geometric Design",
            brand: "Asian Paints",
            pattern: "Geometric",
          },
        ],
      },
      {
        name: "Abstract  Wallpapers",
        slug: "abstract- Wallpapers",
        images: [IMAGES.AbstractWallpaper],
        products: [
          {
            name: "Abstract Designer  Wallpapers",
            brand: "Excel",
            pattern: "Abstract",
          },
          {
            name: "Modern Abstract Texture",
            brand: "Rivee Designs",
            pattern: "Abstract",
          },
        ],
      },
      //  damask wallpaper
      {
        name: "Damask  Wallpapers",
        slug: "damask- Wallpapers",
        images: [IMAGES.DamaskWallpaper],
      },
      // animal wallpaper
      {
        name: "Animal Wallpapers",
        slug: "animal- Wallpapers",
        images: [IMAGES.AnimalWallpaper],
      },
      // botanical wallpaper
      {
        name: "Botanical Wallpapers",
        slug: "botanical- Wallpapers",
        images: [IMAGES.BotanicalWallpaper],
      },
      // Ethniic wallpaper
      {
        name: "Ethnic Wallpapers",
        slug: "ethnic- Wallpapers",
        images: [IMAGES.EthnicWallpaper],
      },
      {
        name: "Brick & Stone  Wallpapers",
        slug: "brick-stone- Wallpapers",
        images: [IMAGES.BrickStoneWallpaper],
        products: [
          {
            name: "Brick Style  Wallpapers",
            brand: "Excel",
            pattern: "Brick & Stone",
          },
          {
            name: "Stone Texture  Wallpapers",
            brand: "Rivee Designs",
            pattern: "Brick & Stone",
          },
        ],
      },
      {
        name: "Murals & Scenic",
        slug: "murals-scenic- Wallpapers",
        images: [IMAGES.MuralsScenicWallpaper],
        products: [
          {
            name: "Nature Scenic  Wallpapers",
            brand: "Asian Paints",
            pattern: "Murals / Scenic",
          },
          {
            name: "Custom Wall Mural",
            brand: "D'Decor",
            pattern: "Murals / Scenic",
          },
        ],
      },
      {
        name: "Plain & Texture",
        slug: "plain-texture- Wallpapers",
        images: [IMAGES.PlainTextureWallpaper],
        products: [
          {
            name: "Minimal Texture  Wallpapers",
            brand: "Rivee Designs",
            pattern: "Minimal / Solid",
          },
          {
            name: "Plain Matte  Wallpapers",
            brand: "Excel",
            pattern: "Minimal / Solid",
          },
        ],
      },
      {
        name: "Kids  Wallpapers",
        slug: "kids- Wallpapers",
        images: [IMAGES.KidsWallpaper],
        products: [
          {
            name: "Cartoon Theme  Wallpapers",
            brand: "Asian Paints",
            pattern: "Kids",
          },
          {
            name: "Playful Kids  Wallpapers",
            brand: "D'Decor",
            pattern: "Kids",
          },
        ],
      },
      {
        name: "Spiritual  Wallpapers",
        slug: "spiritual- Wallpapers",
        images: [IMAGES.SpiritualWallpaper],
        products: [
          {
            name: "Temple Theme  Wallpapers",
            brand: "Rivee Designs",
            pattern: "Spiritual",
          },
          {
            name: "Divine Art  Wallpapers",
            brand: "Excel",
            pattern: "Spiritual",
          },
        ],
      },
      {
        name: "Tropical  Wallpapers",
        slug: "tropical- Wallpapers",
        images: [IMAGES.TropicalWallpaper],
        products: [
          {
            name: "Palm Leaf  Wallpapers",
            brand: "D'Decor",
            pattern: "Tropical",
          },
          {
            name: "Jungle Theme  Wallpapers",
            brand: "Asian Paints",
            pattern: "Tropical",
          },
        ],
      },
      {
        name: "Stripes & Checkered",
        slug: "stripes-checkered- Wallpapers",
        images: [IMAGES.StripesCheckeredWallpaper],
        products: [
          { name: "Striped  Wallpapers", brand: "Excel", pattern: "Stripes" },
          {
            name: "Checkered Design  Wallpapers",
            brand: "Rivee Designs",
            pattern: "Checkered",
          },
        ],
      },
      {
        name: "Wood & Marble Finish",
        slug: "wood-marble- Wallpapers",
        images: [IMAGES.WoodMarbleWallpaper],
        products: [
          {
            name: "Wood Finish  Wallpapers",
            brand: "D'Decor",
            pattern: "Wood",
          },
          {
            name: "Marble Texture  Wallpapers",
            brand: "Asian Paints",
            pattern: "Marble",
          },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Wallpaper,
  },
  // ✅ 8. Rugs
  {
    title: "Rugs",
    slug: "rugs",
    image: IMAGES.categoryImg8,

    bannerTitle: "Add warmth, comfort and character to any room.",
    brands: ["Asian Paints", "D'Decor", "Adore", "Others"],
    materialVariants: [
      "Wool",
      "Cotton",
      "Silk",
      "Jute",
      "Bamboo",
      "Synthetic (Polyester / Nylon)",
    ],
    subCategories: [
      {
        name: "Rectangular Rugs",
        slug: "rectangular-rugs",
        images: [IMAGES.RectangularRugs],
        products: [
          { name: "Wool Rectangular Rug", brand: "D'Decor", material: "Wool" },
          {
            name: "Cotton Rectangular Rug",
            brand: "Adore",
            material: "Cotton",
          },
          {
            name: "Synthetic Rectangular Rug",
            brand: "Asian Paints",
            material: "Synthetic (Polyester / Nylon)",
          },
        ],
      },
      {
        name: "Round Rugs",
        slug: "round-rugs",
        images: [IMAGES.RoundRugs],
        products: [
          { name: "Jute Round Rug", brand: "Adore", material: "Jute" },
          { name: "Silk Round Rug", brand: "D'Decor", material: "Silk" },
          { name: "Cotton Round Rug", brand: "Others", material: "Cotton" },
        ],
      },
      {
        name: "Runner Rugs",
        slug: "runner-rugs",
        images: [IMAGES.RunnerRugs],
        products: [
          { name: "Wool Runner Rug", brand: "Asian Paints", material: "Wool" },
          { name: "Bamboo Runner Rug", brand: "Adore", material: "Bamboo" },
          {
            name: "Synthetic Runner Rug",
            brand: "D'Decor",
            material: "Synthetic (Polyester / Nylon)",
          },
        ],
      },
      {
        name: "Square Rugs",
        slug: "square-rugs",
        images: [IMAGES.SquareRugs],
        products: [
          { name: "Silk Square Rug", brand: "D'Decor", material: "Silk" },
          { name: "Jute Square Rug", brand: "Adore", material: "Jute" },
          { name: "Cotton Square Rug", brand: "Others", material: "Cotton" },
        ],
      },
      {
        name: "Shag Rugs",
        slug: "shag-rugs",
        images: [IMAGES.ShagRugs],
        products: [
          { name: "Soft Shag Rug", brand: "D'Decor", material: "Polyester" },
          {
            name: "Luxury Shag Carpet",
            brand: "Adore",
            material: "Microfiber",
          },
        ],
      },
      {
        name: "Outdoor Rugs",
        slug: "outdoor-rugs",
        images: [IMAGES.OutdoorRugs],
        products: [
          {
            name: "Weather Resistant Rug",
            brand: "Asian Paints",
            material: "Polypropylene",
          },
          { name: "Outdoor Patio Rug", brand: "Adore", material: "Synthetic" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Rugs,
  },

  //✅ 9. Blinds

  {
    title: "Blinds",
    slug: "blinds",
    image: IMAGES.categoryImg9,

    bannerTitle: "Control light and privacy with sleek, modern solutions.",
    brands: [
      "D'Decor",
      "Asian Paints",
      "Alchemy Design Decor",
      "Rivee Designs",
      "Others",
    ],
    materialVariants: ["Wooden", "Aluminum", "PVC", "Fabric"],
    operationTypes: ["Manual", "Motorized"],
    subCategories: [
      // roller
      {
        name: "Roller Blinds",
        slug: "roller-blinds",
        images: [IMAGES.RollerBlinds],
        products: [
          {
            name: "Fabric Roller Blinds",
            brand: "D'Decor",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "Motorized Roller Blinds",
            brand: "Asian Paints",
            material: "Fabric",
            operation: "Motorized",
          },
        ],
      },
      // roman blinds
      {
        name: "Roman Blinds",
        slug: "roman-blinds",
        images: [IMAGES.RomanBlinds],
        products: [
          {
            name: "Classic Roman Blinds",
            brand: "Rivee Designs",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "Luxury Roman Blinds",
            brand: "D'Decor",
            material: "Fabric",
            operation: "Motorized",
          },
        ],
      },
      {
        name: "Vertical Blinds",
        slug: "vertical-blinds",
        images: [IMAGES.VerticalBlinds],
        products: [
          {
            name: "Fabric Vertical Blinds",
            brand: "D'Decor",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "PVC Vertical Blinds",
            brand: "Asian Paints",
            material: "PVC",
            operation: "Motorized",
          },
        ],
      },
      {
        name: "Horizontal / Venetian Blinds",
        slug: "horizontal-venetian-blinds",
        images: [IMAGES.HorizontalVenetianBlinds],
        products: [
          {
            name: "Wooden Venetian Blinds",
            brand: "Rivee Designs",
            material: "Wood",
            operation: "Manual",
          },
          {
            name: "Aluminum Venetian Blinds",
            brand: "Alchemy Design Decor",
            material: "Aluminum",
            operation: "Motorized",
          },
        ],
      },

      {
        name: "Zebra / Duplex Blinds",
        slug: "zebra-duplex-blinds",
        images: [IMAGES.ZebraDuplexBlinds],
        products: [
          {
            name: "Zebra Day & Night Blinds",
            brand: "Asian Paints",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "Motorized Zebra Blinds",
            brand: "Alchemy Design Decor",
            material: "Fabric",
            operation: "Motorized",
          },
        ],
      },
      {
        name: "Panel Blinds",
        slug: "panel-blinds",
        images: [IMAGES.PanelBlinds],
        products: [
          {
            name: "Sliding Panel Blinds",
            brand: "Rivee Designs",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "Modern Panel Blinds",
            brand: "D'Decor",
            material: "Fabric",
            operation: "Motorized",
          },
        ],
      },
      {
        name: "Monsoon Blinds",
        slug: "monsoon-blinds",
        images: [IMAGES.MonsoonBlinds],
        products: [
          {
            name: "Outdoor Monsoon Blinds",
            brand: "Others",
            material: "PVC",
            operation: "Manual",
          },
          {
            name: "Transparent Monsoon Blinds",
            brand: "Others",
            material: "PVC",
            operation: "Manual",
          },
        ],
      },
      {
        name: "Skylight Blinds",
        slug: "skylight-blinds",
        images: [IMAGES.SkylightBlinds],
        products: [
          {
            name: "Roof Skylight Blinds",
            brand: "D'Decor",
            material: "Fabric",
            operation: "Manual",
          },
          {
            name: "Motorized Skylight Blinds",
            brand: "Alchemy Design Decor",
            material: "Fabric",
            operation: "Motorized",
          },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Blinds,
  },

  //✅ 10. Glass Films

  {
    title: "Glass Films",
    slug: "glass-films",
    image: IMAGES.categoryImg10,

    bannerTitle: "Enhance privacy and protection with a stylish finish.",
    brands: ["Garware (Customization Available)"],
    subCategories: [
      {
        name: "Sun Control Films",
        slug: "sun-control-films",
        images: [IMAGES.SunControlFilms],
        products: [
          {
            name: "Heat Reduction Film",
            brand: "Garware",
            feature: "Sun Control",
          },
          {
            name: "Solar Protection Film",
            brand: "Garware",
            feature: "Sun Control",
          },
        ],
      },
      {
        name: "One Way Privacy Films",
        slug: "one-way-privacy-films",
        images: [IMAGES.OneWayPrivacyFilms],
        products: [
          {
            name: "One Way Mirror Film",
            brand: "Garware",
            feature: "Privacy",
          },
          {
            name: "Daytime Privacy Film",
            brand: "Garware",
            feature: "Privacy",
          },
        ],
      },
      {
        name: "Frosted Films",
        slug: "frosted-films",
        images: [IMAGES.FrostedFilms],
        products: [
          {
            name: "Plain Frosted Film",
            brand: "Garware",
            feature: "Frosted",
          },
          {
            name: "Designer Frosted Film",
            brand: "Garware",
            feature: "Frosted",
          },
        ],
      },
      {
        name: "Blackout Films",
        slug: "blackout-films",
        images: [IMAGES.BlackoutFilms],
        products: [
          {
            name: "Full Blackout Film",
            brand: "Garware",
            feature: "Blackout",
          },
          {
            name: "Light Blocking Film",
            brand: "Garware",
            feature: "Blackout",
          },
        ],
      },
      {
        name: "Reflective Films",
        slug: "reflective-films",
        images: [IMAGES.ReflectiveFilms],
        products: [
          {
            name: "Silver Reflective Film",
            brand: "Garware",
            feature: "Reflective",
          },
          {
            name: "High Reflective Glass Film",
            brand: "Garware",
            feature: "Reflective",
          },
        ],
      },
      {
        name: "UV Protective Films",
        slug: "uv-protective-films",
        images: [IMAGES.UVProtectiveFilms],
        products: [
          {
            name: "UV Blocking Film",
            brand: "Garware",
            feature: "UV Protection",
          },
          {
            name: "Anti-UV Window Film",
            brand: "Garware",
            feature: "UV Protection",
          },
        ],
      },
      {
        name: "Decorative Films",
        slug: "decorative-films",
        images: [IMAGES.DecorativeFilms],
        products: [
          {
            name: "Pattern Decorative Film",
            brand: "Garware",
            feature: "Decorative",
          },
          {
            name: "Custom Design Film",
            brand: "Garware",
            feature: "Decorative",
          },
        ],
      },
      {
        name: "Safety & Security Films",
        slug: "safety-security-films",
        images: [IMAGES.SafetySecurityFilms],
        products: [
          {
            name: "Shatterproof Safety Film",
            brand: "Garware",
            feature: "Safety",
          },
          {
            name: "Security Glass Film",
            brand: "Garware",
            feature: "Security",
          },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_GlassFilms,
  },
  //✅ 11. Pillows:
  {
    title: "Pillows",
    slug: "pillows",
    image: IMAGES.categoryImg11,

    bannerTitle: " Experience better comfort and support, every day.",
    brands: ["Duroflex", "Peps", "MM Foam", "Century", "Custom Handmade"],
    subCategories: [
      {
        name: "Memory Foam Pillows",
        slug: "memory-foam-pillows",
        images: [IMAGES.OrthoMemoryFoamPillows],
        products: [
          { name: "Orthopedic Memory Foam Pillow", brand: "Duroflex" },
          { name: "Contour Memory Foam Pillow", brand: "Peps" },
          { name: "Custom Memory Foam Pillow", brand: "Custom Handmade" },
        ],
      },
      {
        name: "Moulded Foam Pillows",
        slug: "moulded-foam-pillows",
        images: [IMAGES.MouldedFoamPillows],
        products: [
          { name: "Standard Moulded Foam Pillow", brand: "MM Foam" },
          { name: "Firm Support Foam Pillow", brand: "Century" },
        ],
      },
      {
        name: "Latex Pillows",
        slug: "latex-pillows",
        images: [IMAGES.LatexPillows],
        products: [
          { name: "Natural Latex Pillow", brand: "Duroflex" },
          { name: "Breathable Latex Pillow", brand: "Peps" },
        ],
      },
      {
        name: "Microfiber Pillows",
        slug: "microfiber-pillows",
        images: [IMAGES.MicrofiberPillows],
        products: [
          { name: "Soft Microfiber Pillow", brand: "Century" },
          { name: "Hotel Quality Microfiber Pillow", brand: "MM Foam" },
        ],
      },
      {
        name: "Cotton Pillows",
        slug: "cotton-pillows",
        images: [IMAGES.CottonPillows],
        products: [
          { name: "Pure Cotton Pillow", brand: "Custom Handmade" },
          { name: "Traditional Cotton Pillow", brand: "MM Foam" },
        ],
      },
      {
        name: "Body Pillows",
        slug: "body-pillows",
        images: [IMAGES.BodyPillows],
        products: [
          { name: "Full Length Body Pillow", brand: "Duroflex" },
          { name: "Soft Body Support Pillow", brand: "Peps" },
        ],
      },
      {
        name: "Backrest Pillows",
        slug: "backrest-pillows",
        images: [IMAGES.BackRestPillows],
        products: [
          { name: "Reading Backrest Pillow", brand: "MM Foam" },
          { name: "Support Back Cushion", brand: "Century" },
        ],
      },
      {
        name: "Neck / Travel Pillows",
        slug: "neck-pillows",
        images: [IMAGES.NeckPillows],
        products: [
          { name: "Travel Neck Pillow", brand: "Peps" },
          { name: "Ergonomic Neck Pillow", brand: "Duroflex" },
        ],
      },
      {
        name: "Wedge Pillows",
        slug: "wedge-pillows",
        images: [IMAGES.WedgePillows],
        products: [
          { name: "Incline Wedge Pillow", brand: "MM Foam" },
          { name: "Orthopedic Wedge Pillow", brand: "Century" },
        ],
      },
      {
        name: "Car Pillows",
        slug: "car-pillows",
        images: [IMAGES.CarPillows],
        products: [
          { name: "Car Neck Support Pillow", brand: "Others" },
          { name: "Driving Comfort Cushion", brand: "Others" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_Pillows,
  },
  // ! 12. Home Essentials
  {
    title: "Home Essentials",
    slug: "home-essentials",
    image: IMAGES.categoryImg12,

    bannerTitle: "Everything you need for a smarter, more stylish home.",
    brands: [
      "D'Decor",
      "Sansar",
      "FabriCare",
      "Adore (Asian Paints)",
      "Others",
    ],
    subCategories: [
      {
        name: "Table Covers",
        slug: "table-covers",
        images: [IMAGES.TableCovers],
        products: [
          { name: "Printed Table Cover", brand: "Trident" },
          { name: "Waterproof Table Cover", brand: "Spaces (Welspun)" },
        ],
      },
      {
        name: "Table Runners",
        slug: "table-runners",
        images: [IMAGES.TableRunners],
        products: [
          { name: "Decorative Table Runner", brand: "Portico" },
          { name: "Designer Table Runner", brand: "Raymond" },
        ],
      },
      {
        name: "Door Mats",
        slug: "door-mats",
        images: [IMAGES.DoorMats],
        products: [
          { name: "Coir Door Mat", brand: "D'Decor" },
          { name: "Rubber Anti-Slip Door Mat", brand: "Adore" },
        ],
      },
      {
        name: "Cushion Covers",
        slug: "cushion-covers",
        images: [IMAGES.CushionCovers],
        products: [
          { name: "Printed Cushion Cover", brand: "D'Decor" },
          { name: "Embroidered Cushion Cover", brand: "Rivee Designs" },
        ],
      },
      {
        name: "Cushion Fillers",
        slug: "cushion-fillers",
        images: [IMAGES.CushionFillers],
        products: [
          { name: "Fiber Cushion Filler", brand: "MM Foam" },
          { name: "Soft Microfiber Filler", brand: "Century" },
        ],
      },
    ],
    bannerImage: IMAGES.Banner_HomeEssentials,
  },
];

export default products;
