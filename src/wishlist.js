import { createContext, useContext } from "react";
import { findProduct } from "./Data";
import { readList, writeList } from "./storage";

export const WishlistContext = createContext(null);

export const useWishlist = () => useContext(WishlistContext);

const STORAGE_KEY = "thevoid-wishlist";

// Saved product ids, newest first. Drops ids no longer in the catalogue.
export const loadWishlist = () =>
  readList(STORAGE_KEY).filter((id) => findProduct(id));

export const saveWishlist = (ids) => writeList(STORAGE_KEY, ids);
