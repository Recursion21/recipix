// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const DairyOptions = [
  { value: "eggs", label: "Eggs" },
  { value: "butter", label: "Butter" },
  { value: "ice cream", label: "Ice Cream" },
];

export const VegetableOptions = [
  { value: "cabbage", label: "Cabbage" },
  { value: "onion", label: "Onion" },
  { value: "tomato", label: "Tomato" },
  { value: "celery", label: "Celery" },
  { value: "lettuce", label: "Lettuce" },
];

export const MeatOptions = [
  { value: "ham", label: "Ham" },
  { value: "salami", label: "Salami" },
];

export const groupedIngredients = [
  {
    label: "Dairy",
    options: DairyOptions,
  },
  {
    label: "Vegetables",
    options: VegetableOptions,
  },
  {
    label: "Meats",
    options: MeatOptions,
  },
];
