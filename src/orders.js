import { readList, writeList } from "./storage";

// Placed orders, kept in the browser so the confirmation page survives a
// reload (and could back a "My orders" page later). Newest first.
const STORAGE_KEY = "thevoid-orders";
const MAX_ORDERS = 20;

// If storage is unavailable, the confirmation still shows from router state.
export const saveOrder = (order) =>
  writeList(
    STORAGE_KEY,
    [order, ...readList(STORAGE_KEY)].slice(0, MAX_ORDERS)
  );

export const findOrder = (number) =>
  readList(STORAGE_KEY).find((order) => order.number === number);

export const newOrderNumber = () =>
  `TV-${Date.now().toString(36).slice(-6).toUpperCase()}`;
