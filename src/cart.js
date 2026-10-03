import { createContext, useContext } from "react";
import { findProduct } from "./Data";

export const FREE_SHIPPING_THRESHOLD = 100;

export const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

// The same product in a different color or size is a separate line.
export const lineKey = ({ id, color, size }) => `${id}|${color}|${size}`;

export const cartReducer = (lines, action) => {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line);
      const existing = lines.find((line) => lineKey(line) === key);
      if (existing) {
        return lines.map((line) =>
          line === existing
            ? { ...line, quantity: line.quantity + action.line.quantity }
            : line
        );
      }
      return [...lines, action.line];
    }
    case "setQuantity":
      return lines
        .map((line) =>
          lineKey(line) === action.key
            ? { ...line, quantity: action.quantity }
            : line
        )
        .filter((line) => line.quantity > 0);
    case "remove":
      return lines.filter((line) => lineKey(line) !== action.key);
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
};

const STORAGE_KEY = "thevoid-cart";

// Drop lines whose product no longer exists in the catalogue.
export const loadCart = () => {
  try {
    const lines = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return lines.filter((line) => findProduct(line.id) && line.quantity > 0);
  } catch {
    return [];
  }
};

export const saveCart = (lines) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable (private mode, quota); the cart still works.
  }
};

export const cartCount = (lines) =>
  lines.reduce((count, line) => count + line.quantity, 0);

export const cartSubtotal = (lines) =>
  lines.reduce(
    (total, line) => total + findProduct(line.id).price * line.quantity,
    0
  );
