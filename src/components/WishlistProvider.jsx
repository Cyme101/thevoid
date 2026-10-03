import { useEffect, useMemo, useState } from "react";
import { WishlistContext, loadWishlist, saveWishlist } from "../wishlist";

const WishlistProvider = ({ children }) => {
  const [ids, setIds] = useState(loadWishlist);

  useEffect(() => {
    saveWishlist(ids);
  }, [ids]);

  const wishlist = useMemo(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((current) =>
          current.includes(id)
            ? current.filter((saved) => saved !== id)
            : [id, ...current]
        ),
    }),
    [ids]
  );

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
