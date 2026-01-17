export type Category = "top" | "mid" | "bottom";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  salePercentage?: number;
}
