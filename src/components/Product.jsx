import styled from "styled-components";
import { Link } from "react-router";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import Picture from "./Picture";
import { useCart } from "../cart";

const Info = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  transition: opacity 0.5s ease;
  width: 100%;
  z-index: 4;

  /* Icons pop in one after another when the overlay appears */
  & [data-icon] {
    transform: translateY(12px) scale(0.8);
    transition:
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      scale 0.3s ease,
      background-color 0.3s ease;
  }
  & [data-icon]:nth-child(3) {
    transition-delay: 0.06s;
  }

  /* Touch screens have no hover: keep the icons visible along the bottom */
  @media (hover: none) {
    align-items: flex-end;
    background-color: transparent;
    opacity: 1;
    padding-bottom: 8px;

    & [data-icon] {
      transform: none;
    }
  }
`;

const Container = styled.div`
  align-items: center;
  background-color: #f5fbfc;
  display: flex;
  flex: 1;
  height: 350px;
  justify-content: center;
  margin: 5px;
  min-width: 280px;
  position: relative;

  &:hover ${Info}, &:focus-within ${Info} {
    opacity: 1;
  }

  &:hover ${Info} [data-icon],
  &:focus-within ${Info} [data-icon] {
    transform: none;
  }
`;

const Circle = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 200px;
  position: absolute;
  width: 200px;
`;

const Image = styled(Picture)`
  height: 80%;
  z-index: 4;
`;

// Covers the card so a click anywhere opens the product page.
const CardLink = styled(Link)`
  inset: 0;
  position: absolute;
`;

const Icon = styled.div`
  align-items: center;
  background-color: white;
  border: none;
  border-radius: 50%;
  color: inherit;
  cursor: pointer;
  padding: 0;
  position: relative;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 10px;
  width: 40px;

  &:hover {
    background-color: #ade8f4;
    scale: 1.2;
  }
`;

const Product = ({ item }) => {
  const { add } = useCart();
  const productPath = `/product/${item.id}`;

  const addToBag = () =>
    add({
      id: item.id,
      color: item.colors[0].name,
      size: item.sizes[0],
      quantity: 1,
    });

  return (
    <Container>
      <Circle />
      <Image name={item.img} alt={item.alt} sizes="320px" loading="lazy" />
      <Info>
        <CardLink to={productPath} aria-label={item.name} />
        <Icon
          as="button"
          type="button"
          data-icon
          onClick={addToBag}
          aria-label={`Add ${item.name} to bag`}
        >
          <ShoppingCartOutlinedIcon />
        </Icon>
        <Icon aria-hidden="true" data-icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
