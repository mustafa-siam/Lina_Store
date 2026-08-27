export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  type: "today" | "weekly" | "bogo" | "seasonal";
  image: string;
  badge: string;
  validUntil: string;
  productIds: string[];
}

export const offers: Offer[] = [
  {
    id: "1",
    title: "Fresh Produce Flash Sale",
    description: "Get the freshest fruits and vegetables at unbeatable prices. Limited time only.",
    discount: "30% OFF",
    type: "today",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=500&fit=crop&auto=format",
    badge: "Today Only",
    validUntil: "Ends Tonight",
    productIds: ["1", "2", "12", "17", "24"],
  },
  {
    id: "2",
    title: "Dairy & Eggs Week",
    description: "Stock up your fridge with premium dairy and eggs at weekly special prices.",
    discount: "20% OFF",
    type: "weekly",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=500&fit=crop&auto=format",
    badge: "This Week",
    validUntil: "Ends Sunday",
    productIds: ["3", "4", "10", "18"],
  },
  {
    id: "3",
    title: "Buy 1 Get 1 on Snacks",
    description: "Double your snack stash. Buy any snack and get the same item absolutely free.",
    discount: "BOGO",
    type: "bogo",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=500&fit=crop&auto=format",
    badge: "Buy 1 Get 1",
    validUntil: "While Stock Lasts",
    productIds: ["16", "22"],
  },
  {
    id: "4",
    title: "Autumn Harvest Special",
    description: "Celebrate the season with our handpicked autumn pantry favorites.",
    discount: "25% OFF",
    type: "seasonal",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=500&fit=crop&auto=format",
    badge: "Seasonal",
    validUntil: "Limited Season",
    productIds: ["7", "13", "19", "21"],
  },
];
