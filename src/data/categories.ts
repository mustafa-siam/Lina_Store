export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    description: "Farm-fresh produce delivered straight to your door. Hand-picked for quality.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop&auto=format",
    productCount: 48,
    color: "#dcfce7",
  },
  {
    id: "2",
    name: "Meat & Fish",
    slug: "meat-fish",
    description: "Premium cuts and fresh seafood from trusted suppliers.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop&auto=format",
    productCount: 32,
    color: "#fee2e2",
  },
  {
    id: "3",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    description: "Fresh milk, artisan cheeses, creamy yogurts, and farm eggs.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop&auto=format",
    productCount: 27,
    color: "#fef9c3",
  },
  {
    id: "4",
    name: "Bakery",
    slug: "bakery",
    description: "Freshly baked breads, pastries, and treats made daily.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&auto=format",
    productCount: 21,
    color: "#ffedd5",
  },
  {
    id: "5",
    name: "Beverages",
    slug: "beverages",
    description: "Juices, sodas, teas, coffees, and refreshing drinks for every mood.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&auto=format",
    productCount: 35,
    color: "#dbeafe",
  },
  {
    id: "6",
    name: "Snacks",
    slug: "snacks",
    description: "Healthy and indulgent snacks to keep you going all day.",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop&auto=format",
    productCount: 40,
    color: "#f3e8ff",
  },
  {
    id: "7",
    name: "Pantry",
    slug: "pantry",
    description: "Rice, pasta, oils, spices, and all your everyday pantry essentials.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&auto=format",
    productCount: 55,
    color: "#fce7f3",
  },
  {
    id: "8",
    name: "Frozen Foods",
    slug: "frozen",
    description: "Convenient frozen meals, vegetables, and treats ready in minutes.",
    image: "https://images.unsplash.com/photo-1618840702983-95f52c1b0ab0?w=600&h=400&fit=crop&auto=format",
    productCount: 18,
    color: "#cffafe",
  },
  {
    id: "9",
    name: "Household",
    slug: "household",
    description: "Cleaning supplies, paper goods, and everything to keep your home running.",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&h=400&fit=crop&auto=format",
    productCount: 29,
    color: "#e0f2fe",
  },
];
