import { Product, Category } from "@/types/product";

// Product data with streetwear aesthetic images
// Using picsum.photos for reliable placeholder images
const productsData: Product[] = [
  // TOP CATEGORY - Oversize shirts and jackets
  {
    id: 1,
    name: "OVERSIZED COTTON SHIRT",
    price: 89,
    image: "/top (1).png",
    category: "top",
    description:
      "Premium oversized cotton shirt with relaxed fit. Perfect for layering or wearing solo.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Beige", "Olive"],
    isNew: true,
  },
  {
    id: 2,
    name: "FUTURE TECH JACKET",
    price: 299,
    image: "/top (2).png",
    category: "top",
    description:
      "Waterproof tech jacket with modern design. Features multiple pockets and adjustable hood.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray"],
    isBestseller: true,
  },
  {
    id: 3,
    name: "OVERSIZED DENIM JACKET",
    price: 149,
    image: "/top (3).png",
    category: "top",
    description:
      "Vintage-inspired oversized denim jacket with distressed details.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    isOnSale: true,
    salePrice: 99,
    salePercentage: 34,
  },
  {
    id: 4,
    name: "CYBER HOODIE",
    price: 129,
    image: "/top (4).png",
    category: "top",
    description:
      "Premium oversized hoodie with futuristic design elements and comfortable fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Green"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 5,
    name: "OVERSIZED BOMBER JACKET",
    price: 249,
    image: "/top (5).png",
    category: "top",
    description:
      "Classic bomber jacket with modern oversized silhouette. Perfect for streetwear looks.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Olive"],
    isOnSale: true,
    salePrice: 199,
    salePercentage: 20,
  },
  {
    id: 6,
    name: "OVERSIZED T-SHIRT",
    price: 59,
    image: "/top (6).png",
    category: "top",
    description:
      "Essential oversized t-shirt in premium cotton. Minimalist design with perfect drape.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Beige"],
    isNew: true,
  },

  // MID CATEGORY - Old denims like Levis
  {
    id: 9,
    name: "VINTAGE LEVI'S 501",
    price: 199,
    image: "/mid (2).png",
    category: "mid",
    description:
      "Authentic vintage Levi's 501 jeans with original wash and classic straight fit.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Light Blue", "Medium Blue", "Dark Blue"],
    isBestseller: true,
  },
  {
    id: 10,
    name: "DISTRESSED DENIM JEANS",
    price: 179,
    image: "/mid (3).png",
    category: "mid",
    description:
      "Vintage-inspired distressed denim with authentic wear patterns and fading.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Light Blue", "Medium Blue"],
    isOnSale: true,
    salePrice: 129,
    salePercentage: 28,
  },
  {
    id: 11,
    name: "CLASSIC STRAIGHT DENIM",
    price: 159,
    image: "/mid (4).png",
    category: "mid",
    description:
      "Timeless straight-leg denim jeans with classic blue wash. Perfect everyday fit.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Light Blue", "Medium Blue", "Dark Blue", "Black"],
    isNew: true,
  },
  {
    id: 12,
    name: "VINTAGE WIDE LEG DENIM",
    price: 189,
    image: "/mid (5).png",
    category: "mid",
    description:
      "90s-inspired wide leg denim with vintage wash and relaxed fit.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Light Blue", "Medium Blue"],
    isBestseller: true,
  },
  {
    id: 13,
    name: "RAW SELVEDGE DENIM",
    price: 249,
    image: "/mid (6).png",
    category: "mid",
    description:
      "Premium raw selvedge denim that molds to your body. For denim purists.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Black"],
    isOnSale: true,
    salePrice: 199,
    salePercentage: 20,
  },
  {
    id: 14,
    name: "VINTAGE CARPENTER JEANS",
    price: 169,
    image: "/mid (1).png",
    category: "mid",
    description:
      "Workwear-inspired carpenter jeans with multiple pockets and vintage wash.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Light Blue", "Medium Blue"],
    isNew: true,
  },

  // BOTTOM CATEGORY - Shoes and comfy slippers
  {
    id: 17,
    name: "PREMIUM SNEAKERS",
    price: 199,
    image: "/bottom (1).png",
    category: "bottom",
    description:
      "High-quality sneakers with premium materials and comfortable cushioning.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray"],
    isBestseller: true,
  },
  {
    id: 18,
    name: "COMFY SLIPPERS",
    price: 79,
    image: "/bottom (2).png",
    category: "bottom",
    description:
      "Ultra-comfortable slippers with memory foam insoles. Perfect for home or casual wear.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Gray", "Beige", "Black"],
    isOnSale: true,
    salePrice: 59,
    salePercentage: 25,
  },
  {
    id: 19,
    name: "MINIMALIST SNEAKERS",
    price: 149,
    image: "/bottom (3).png",
    category: "bottom",
    description:
      "Clean minimalist sneakers with premium leather and modern design.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Beige"],
    isNew: true,
  },
  {
    id: 20,
    name: "LUXURY SLIDES",
    price: 99,
    image: "/bottom (4).png",
    category: "bottom",
    description: "Premium slides with cushioned footbed and sleek design.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Brown"],
    isBestseller: true,
  },
  {
    id: 21,
    name: "RUNNING SNEAKERS",
    price: 179,
    image: "/bottom (5).png",
    category: "bottom",
    description:
      "Performance running sneakers with advanced cushioning and breathable mesh.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black/White", "Gray/Blue", "White/Red"],
    isOnSale: true,
    salePrice: 139,
    salePercentage: 22,
  },
  {
    id: 22,
    name: "COZY HOUSE SLIPPERS",
    price: 69,
    image: "/bottom (6).png",
    category: "bottom",
    description:
      "Warm and cozy house slippers with soft lining. Perfect for relaxing at home.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Gray", "Beige", "Navy"],
    isNew: true,
  },
];

// Helper functions
export function getAllProducts(): Product[] {
  return productsData;
}

export function getProductsByCategory(category: Category): Product[] {
  return productsData.filter((product) => product.category === category);
}

export function getProductById(id: number): Product | undefined {
  return productsData.find((product) => product.id === id);
}

export function getProductsByCategoryOrAll(category?: Category): Product[] {
  if (!category) {
    return getAllProducts();
  }
  return getProductsByCategory(category);
}

// Filter functions for new arrivals, bestsellers, and sale products
export function getNewArrivals(): Product[] {
  return productsData.filter((product) => product.isNew === true);
}

export function getBestsellers(): Product[] {
  return productsData.filter((product) => product.isBestseller === true);
}

export function getSaleProducts(): Product[] {
  return productsData.filter((product) => product.isOnSale === true);
}

// CRUD operations for admin
export function createProduct(product: Omit<Product, 'id'>): Product {
  const maxId = productsData.length > 0 
    ? Math.max(...productsData.map(p => p.id)) 
    : 0;
  const newProduct: Product = {
    ...product,
    id: maxId + 1,
  };
  productsData.push(newProduct);
  return newProduct;
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const index = productsData.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  productsData[index] = {
    ...productsData[index],
    ...updates,
    id, // Ensure ID cannot be changed
  };
  return productsData[index];
}

export function deleteProduct(id: number): boolean {
  const index = productsData.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  productsData.splice(index, 1);
  return true;
}
