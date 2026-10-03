import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router";
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
} from "@mui/icons-material";
import Picture from "./Picture";
import { useCart } from "../cart";
import { useWishlist } from "../wishlist";
import { formatPrice } from "../price";
import { mobile } from "../responsive";
import { colors } from "../theme";
import { useFlash } from "../useFlash";

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
  background-color: ${colors.ink};
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
    background-color: ${colors.navy};
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

const pop = keyframes`
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

// Shown on hover, and always once the product is saved (or on touch).
const Wishlist = styled.button`
  background-color: white;
  border: none;
  border-radius: 50%;
  color: ${colors.ink};
  cursor: pointer;
  display: flex;
  opacity: ${(props) => (props["aria-pressed"] ? 1 : 0)};
  padding: 7px;
  position: absolute;
  right: 12px;
  top: 12px;
  transition:
    opacity 0.3s ease,
    background-color 0.3s ease;
  z-index: 2;
  ${(props) =>
    props["aria-pressed"] &&
    css`
      animation: ${pop} 0.35s ease;
    `}

  &:hover {
    background-color: #f1f3f5;
  }

  &:focus-visible {
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 1;
  }
`;

const ImagePanel = styled.div`
  align-items: center;
  aspect-ratio: 4 / 5;
  background-color: ${colors.surface};
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Name = styled(Link)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${colors.ink};
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
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  position: relative;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${mobile({ paddingBottom: "10px" })}

  &:hover {
    border-color: ${colors.borderStrong};
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
    outline: 2px solid ${colors.brand};
    outline-offset: 4px;
  }
`;

const Product = ({ item }) => {
  const { add } = useCart();
  const wishlist = useWishlist();
  const saved = wishlist.has(item.id);
  // Shows "ADDED ✓" on the button briefly after adding to the bag.
  const [added, flashAdded] = useFlash();

  const addToBag = () => {
    add({
      id: item.id,
      color: item.colors[0].name,
      size: item.sizes[0],
      quantity: 1,
    });
    flashAdded();
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
        <Wishlist
          type="button"
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${item.name} from wishlist`
              : `Save ${item.name} to wishlist`
          }
          onClick={() => wishlist.toggle(item.id)}
        >
          {saved ? (
            <FavoriteIcon style={{ fontSize: 18 }} />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ fontSize: 18 }} />
          )}
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
