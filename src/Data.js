export const sliderItems = [
  {
    id: 1,
    img: "hero-autumn-sale",
    alt: "Model in a white ringer tee and camo cargo pants crouching",
    title: "AUTUMN SALE / BEST SELLERS",
    desc: "UP TO 25% OFF ON SELECTED 90s STYLES.",
    bg: "e2e2df",
  },
  {
    id: 2,
    img: "hero-coat-back",
    alt: "Back view of a model in an oversized black coat and beret",
    title: "AUTUMN / WINTER(AW) '23",
    desc: "SHOP MEN'S AVANT-GARDE FASHION",
    bg: "f5fafd",
  },
  {
    id: 3,
    img: "hero-costalamel",
    alt: "Model in a cream graphic sweatshirt and black jeans crouching",
    title: "COSTALAMEL from Barcelona",
    desc: "BACK IN THE 90s STYLE",
    bg: "e5dcde",
  },
];

export const categories = [
  {
    id: 1,
    img: "category-sneakers",
    alt: "White high-top sneakers on a concrete floor",
    title: "SNEAKERS!",
    to: "/productlist?category=shoes",
  },
  {
    id: 2,
    img: "category-coats",
    alt: "Model wearing a long pink teddy coat",
    title: "COATS",
    to: "/productlist?q=jacket",
  },
  {
    id: 3,
    img: "category-jeans",
    alt: "Model in a denim jacket and jeans",
    title: "JEANS ON JEANS",
    to: "/productlist?q=jeans",
  },
];

// Shop sections shown in the navigation and used to filter the product list.
export const productCategories = [
  { id: "clothing", label: "Clothing" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
];

export const findCategory = (id) =>
  productCategories.find((category) => category.id === id);

// Product names, prices and descriptions marked "placeholder" are
// stand-ins until the real catalogue is available.
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const BLACK = { name: "Black", hex: "#090909" };

export const products = [
  {
    id: "cdg-converse",
    category: "shoes",
    sku: "16620479x",
    name: "Converse x Comme des Garçons PLAY Chuck 70 High Top",
    price: 200,
    img: "product-cdg-converse",
    alt: "Comme des Garçons PLAY x Converse black high-top sneaker",
    desc: [
      "The heart-logo Chuck 70, sourced second hand and fully restored.", // placeholder
    ],
    colors: [BLACK],
    sizes: ["W 5", "W 6", "W 7", "W 8", "W 9"],
  },
  {
    id: "bomber-jacket",
    category: "clothing",
    sku: "RN30004",
    name: "Venturer Prepare for War Bomber Jacket",
    price: 230,
    img: "product-bomber-jacket",
    alt: "Black bomber jacket with patches",
    desc: [
      "A vintage bomber reworked with patches sourced from our archive.", // placeholder
    ],
    colors: [BLACK],
    sizes: APPAREL_SIZES,
  },
  {
    id: "ripped-jeans",
    category: "clothing",
    sku: "RBF-0075", // placeholder
    name: "Ripped Boyfriend Fit Jeans",
    price: 75,
    img: "product-ripped-jeans",
    alt: "Light-wash ripped jeans",
    desc: [
      "This was a returned item then our designers decided to make bigger holes in it. These are designed to fit exactly like those grunge jeans you always dreamed of finding.",
      "Made in U.S.A.",
    ],
    colors: [
      { name: "Stone blue", hex: "#6F8FAF" },
      BLACK,
      { name: "Sky blue", hex: "#5dadec" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    id: "balenciaga-hoodie",
    category: "clothing",
    sku: "BAL-H-0180", // placeholder
    name: "Balenciaga Logo Hoodie", // placeholder
    price: 180, // placeholder
    img: "product-balenciaga-hoodie",
    alt: "Black Balenciaga logo hoodie",
    desc: ["Pre-loved oversized logo hoodie, cleaned and re-finished."], // placeholder
    colors: [BLACK],
    sizes: APPAREL_SIZES,
  },
  {
    id: "plaid-skirt",
    category: "clothing",
    sku: "TPS-0065", // placeholder
    name: "Tartan Pleated Skirt", // placeholder
    price: 65, // placeholder
    img: "product-plaid-skirt",
    alt: "Red tartan pleated skirt",
    desc: ["A 90s school-uniform classic, re-cut with a higher waist."], // placeholder
    colors: [{ name: "Red tartan", hex: "#b3202a" }],
    sizes: APPAREL_SIZES,
  },
  {
    id: "leather-jacket",
    category: "clothing",
    sku: "LMJ-0260", // placeholder
    name: "Leather Motorcycle Jacket", // placeholder
    price: 260, // placeholder
    img: "product-leather-jacket",
    alt: "Black leather motorcycle jacket",
    desc: ["Broken-in leather biker, re-lined and given new hardware."], // placeholder
    colors: [BLACK],
    sizes: APPAREL_SIZES,
  },
  {
    id: "nike-dunk",
    category: "shoes",
    sku: "NDH-0150", // placeholder
    name: "Nike Dunk High", // placeholder
    price: 150, // placeholder
    img: "product-nike-dunk",
    alt: "Pastel Nike Dunk high sneakers",
    desc: ["Pastel-toned Dunk Highs, deep-cleaned and re-laced."], // placeholder
    colors: [{ name: "Pastel", hex: "#e9b8a4" }],
    sizes: ["W 5", "W 6", "W 7", "W 8", "W 9"],
  },
  {
    id: "obey-cap",
    category: "accessories",
    sku: "OBE-CAP-1234567-QA66",
    name: "Brand Patch Strapback Hat",
    price: 44,
    img: "product-obey-cap",
    alt: "Black Obey snapback cap with red logo patch",
    desc: ["Classic box-logo strapback, one size fits most."], // placeholder
    colors: [BLACK],
    sizes: ["O/S"],
  },
];

export const findProduct = (id) =>
  products.find((product) => product.id === id);

// Lowercase and strip accents so "garcons" matches "Garçons".
const normalize = (text) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const words = (text) =>
  normalize(text)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

// Products where every word of `query` starts a word in the product's name,
// description or colors ("jack" finds "jacket"; "red" doesn't find "restored").
export const searchProducts = (query) => {
  const queryWords = words(query);
  return products.filter((product) => {
    const productWords = words(
      [
        product.name,
        product.alt,
        ...product.desc,
        ...product.colors.map((c) => c.name),
      ].join(" ")
    );
    return queryWords.every((queryWord) =>
      productWords.some((word) => word.startsWith(queryWord))
    );
  });
};
