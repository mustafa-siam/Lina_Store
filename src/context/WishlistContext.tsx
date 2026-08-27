import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import type { Product } from "@/data/products";

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "TOGGLE"; product: Product };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD":
      if (state.items.find((i) => i.id === action.product.id)) return state;
      return { items: [...state.items, action.product] };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.productId) };
    case "TOGGLE":
      return state.items.find((i) => i.id === action.product.id)
        ? { items: state.items.filter((i) => i.id !== action.product.id) }
        : { items: [...state.items, action.product] };
    default:
      return state;
  }
}

function loadWishlist(): WishlistState {
  try {
    const stored = localStorage.getItem("lina-wishlist");
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
}

interface WishlistContextValue {
  items: Product[];
  totalItems: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, undefined, loadWishlist);

  useEffect(() => {
    localStorage.setItem("lina-wishlist", JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        totalItems: state.items.length,
        addItem: (p) => dispatch({ type: "ADD", product: p }),
        removeItem: (id) => dispatch({ type: "REMOVE", productId: id }),
        toggleItem: (p) => dispatch({ type: "TOGGLE", product: p }),
        isInWishlist: (id) => state.items.some((i) => i.id === id),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
