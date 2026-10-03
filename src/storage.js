// Lists kept in the browser (bag, wishlist, orders). Storage can be
// unavailable (private mode, full quota) or hold bad data; reading then
// returns an empty list and writing is skipped, so the site keeps working.

export const readList = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Not saved; the in-memory state still works for this visit.
  }
};
