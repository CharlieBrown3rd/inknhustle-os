export const serviceRates = {
  screenPrint: {
    label: "Screen Printing",
    decorationRate: 5,
    setupFee: 20,
  },
  dtf: {
    label: "DTF Printing",
    decorationRate: 7,
    setupFee: 15,
  },
  htv: {
    label: "Heat Transfer Vinyl",
    decorationRate: 9,
    setupFee: 15,
  },
};

export const garmentRates = {
  tshirt: {
    label: "Standard T-Shirt",
    price: 4.5,
    icon: "👕",
  },
  premiumTshirt: {
    label: "Premium Soft T-Shirt",
    price: 7,
    icon: "⭐",
  },
  longSleeve: {
    label: "Long-Sleeve Shirt",
    price: 8,
    icon: "👔",
  },
  hoodie: {
    label: "Pullover Hoodie",
    price: 18,
    icon: "🧥",
  },
  polo: {
    label: "Polo Shirt",
    price: 13,
    icon: "👕",
  },
};

export const printLocationOptions = [
  {
    category: "Front",
    locations: ["Left Chest", "Full Front", "Right Chest"],
  },
  {
    category: "Back",
    locations: ["Full Back", "Upper Back", "Neck Tag"],
  },
  {
    category: "Sleeves",
    locations: ["Left Sleeve", "Right Sleeve"],
  },
];

export const printSizeRates = {
  small: {
    label: "Small / Left Chest",
    price: 0,
  },
  standard: {
    label: "Standard Front",
    price: 2,
  },
  large: {
    label: "Large Front or Back",
    price: 4,
  },
  oversized: {
    label: "Oversized Print",
    price: 6,
  },
};