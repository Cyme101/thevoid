import { useMemo } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { findProduct } from "../Data";
import { useWishlist } from "../wishlist";
import { ButtonLink } from "../components/Button";

const Title = styled.h1`
  margin: 20px;
`;

const Count = styled.p`
  font-weight: 300;
  margin: -10px 20px 0;
`;

const Empty = styled.div`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  padding: 60px 20px 80px;
  text-align: center;
`;

const ShopButton = styled(ButtonLink)`
  margin-top: 24px;
`;

const Wishlist = () => {
  const { ids } = useWishlist();
  const saved = useMemo(() => ids.map(findProduct), [ids]);

  return (
    <>
      <Announcement />
      <Navbar />
      <Title>Your Wishlist</Title>
      <Count role="status">
        {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
      </Count>
      {saved.length > 0 ? (
        <Products items={saved} />
      ) : (
        <Empty>
          Nothing saved yet.
          <br />
          Tap the heart on any piece to keep it here.
          <br />
          <ShopButton to="/productlist">SHOP ALL</ShopButton>
        </Empty>
      )}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Wishlist;
