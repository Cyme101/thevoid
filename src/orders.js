// Placed orders, kept in the browser so the confirmation page survives a
// reload (and could back a "My orders" page later). Newest first.
const STORAGE_KEY = "thevoid-orders";
const MAX_ORDERS = 20;

const loadOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveOrder = (order) => {
  try {
    const orders = [order, ...loadOrders()].slice(0, MAX_ORDERS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Storage unavailable: the confirmation still shows from router state.
  }
};

export const findOrder = (number) =>
  loadOrders().find((order) => order.number === number);

export const newOrderNumber = () =>
  `TV-${Date.now().toString(36).slice(-6).toUpperCase()}`;
