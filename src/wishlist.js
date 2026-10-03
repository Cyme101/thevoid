import { createContext, useContext } from "react";
import { findProduct } from "./Data";

export const WishlistContext = createContext(null);

export const useWishlist = () => useContext(WishlistContext);

const STORAGE_KEY = "thevoid-wishlist";

// Saved product ids, newest first. Drops ids no longer in the catalogue.
export const loadWishlist = () => {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return ids.filter((id) => findProduct(id));
  } catch {
    return [];
  }
};

export const saveWishlist = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage can be unavailable (private mode, quota); the list still works.
  }
};
