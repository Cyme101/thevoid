import { useEffect, useMemo, useReducer } from "react";
import { CartContext, cartReducer, loadCart, saveCart } from "../cart";

const CartProvider = ({ children }) => {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    saveCart(lines);
  }, [lines]);

  const cart = useMemo(
    () => ({
      lines,
      add: (line) => dispatch({ type: "add", line }),
      setQuantity: (key, quantity) =>
        dispatch({ type: "setQuantity", key, quantity }),
      remove: (key) => dispatch({ type: "remove", key }),
    }),
    [lines]
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export default CartProvider;
