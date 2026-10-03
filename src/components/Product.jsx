import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
} from "@mui/icons-material";
import Picture from "./Picture";
import { useCart } from "../cart";
import { formatPrice } from "../price";
import { mobile } from "../responsive";

const Circle = styled.div`
  aspect-ratio: 1;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  width: 68%;
`;

const Image = styled(Picture)`
  max-height: 78%;
  max-width: 78%;
  object-fit: contain;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
`;

// Slides up from the bottom of the image on hover; always shown on touch.
const QuickAdd = styled.button`
  align-items: center;
  background-color: #090909;
  border: none;
  bottom: 0;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  left: 0;
  letter-spacing: 1px;
  padding: 12px;
  position: absolute;
  right: 0;
  transform: translateY(100%);
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease;
  z-index: 2;

  &:hover {
    background-color: #02223c;
  }

  &:focus-visible {
    transform: none;
  }

  @media (hover: none) {
    font-size: 11px;
    padding: 9px;
    transform: none;
  }
`;

const Wishlist = styled.span`
  background-color: white;
  border-radius: 50%;
  display: flex;
  opacity: 0;
  padding: 7px;
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 12px;
  transition: opacity 0.3s ease;

  @media (hover: none) {
    opacity: 1;
  }
`;

const ImagePanel = styled.div`
  align-items: center;
  aspect-ratio: 4 / 5;
  background-color: #f5fbfc;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Name = styled(Link)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #090909;
  display: -webkit-box;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.35;
  margin-top: 14px;
  overflow: hidden;
  padding: 0 14px;
  text-decoration: none;
  ${mobile({ fontSize: "13px", marginTop: "10px", padding: "0 10px" })}

  /* Stretches the link over the whole card, so a click anywhere opens it */
  &::after {
    content: "";
    inset: 0;
    position: absolute;
  }

  &:focus-visible {
    outline: none;
  }
`;

const Details = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 14px;
  ${mobile({ padding: "0 10px" })}
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 300;
  ${mobile({ fontSize: "13px" })}
`;

const Swatches = styled.span`
  display: flex;
  gap: 5px;
`;

const Swatch = styled.span`
  background-color: ${(props) => props.$color};
  border: 1px solid rgba(9, 9, 9, 0.15);
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;

const Card = styled.article`
  border: 1px solid #e6eaee;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  position: relative;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${mobile({ paddingBottom: "10px" })}

  &:hover {
    border-color: #cfd6dc;
    box-shadow: 0 8px 24px rgba(9, 9, 9, 0.06);
  }

  &:hover ${Circle} {
    transform: scale(1.08);
  }

  &:hover ${Image} {
    transform: translateY(-6px) scale(1.03);
  }

  &:hover ${QuickAdd} {
    transform: none;
  }

  &:hover ${Wishlist}, &:focus-within ${Wishlist} {
    opacity: 1;
  }

  &:has(${Name}:focus-visible) {
    outline: 2px solid #044b7f;
    outline-offset: 4px;
  }
`;

const Product = ({ item }) => {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  // Show "ADDED" on the button briefly after adding to the bag.
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const addToBag = () => {
    add({
      id: item.id,
      color: item.colors[0].name,
      size: item.sizes[0],
      quantity: 1,
    });
    setAdded(true);
  };

  return (
    <Card>
      <ImagePanel>
        <Circle />
        <Image
          name={item.img}
          alt={item.alt}
          sizes="(max-width: 767px) 50vw, 340px"
          loading="lazy"
        />
        <Wishlist aria-hidden="true">
          <FavoriteBorderOutlinedIcon style={{ fontSize: 18 }} />
        </Wishlist>
        <QuickAdd
          type="button"
          onClick={addToBag}
          aria-label={`Add ${item.name} to bag`}
        >
          <ShoppingBagOutlinedIcon style={{ fontSize: 18 }} />
          {added ? "ADDED ✓" : "ADD TO BAG"}
        </QuickAdd>
      </ImagePanel>
      <Name to={`/product/${item.id}`}>{item.name}</Name>
      <Details>
        <Price>{formatPrice(item.price)}</Price>
        <Swatches>
          {item.colors.map((color) => (
            <Swatch key={color.name} $color={color.hex} title={color.name} />
          ))}
        </Swatches>
      </Details>
    </Card>
  );
};

export default Product;
