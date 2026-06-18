export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the modern lifestyle.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Sale", href: "#sale" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  badge?: "sale" | "new" | "featured" | "bestseller";
  description: string;
}

export type Category = "All" | "Fashion" | "Electronics" | "Home" | "Beauty" | "Sports";

export const CATEGORIES: Category[] = ["All", "Fashion", "Electronics", "Home", "Beauty", "Sports"];