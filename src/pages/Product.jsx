import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  Add,
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Remove,
} from "@mui/icons-material";

import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";
import Picture from "../components/Picture";
import { imageInfo } from "../images";
import NotFound from "./NotFound";
import { findProduct } from "../Data";
import { useCart } from "../cart";
import { useWishlist } from "../wishlist";
import { formatPrice } from "../price";
import Button from "../components/Button";
import { colors } from "../theme";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "10px" })}
  ${tablet({ flexDirection: "column", padding: "10px" })}
`;

// Light panel (same as the product cards) with the whole product centered.
const ImgContainer = styled.div`
  align-items: center;
  background-color: ${colors.surface};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 80vh;
  justify-content: center;
  padding: 40px;
  ${mobile({ height: "45vh", padding: "20px" })}
  ${tablet({ height: "50vh", padding: "24px" })}
`;

// Never cropped. The inline max-width also keeps it from being shown
// larger than the image's real size.
const Image = styled(Picture)`
  max-height: 100%;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px 50px;
  ${mobile({ padding: "10px" })}
  ${tablet({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
`;

const Desc = styled.p`
  margin: 30px 0px;
`;

const Price = styled.span`
  font-size: 30px;
  font-weight: 200;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  width: 50%;
  ${mobile({ width: "100%" })}
  ${tablet({ width: "100%" })}
`;

const Filter = styled.div`
  align-items: center;
  display: flex;
  margin-right: 20px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 8px;
`;

const FilterColor = styled.button`
  background-color: ${(props) => props.$color};
  border: none;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props["aria-pressed"]
      ? `0 0 0 2px white, 0 0 0 4px ${colors.brand}`
      : "none"};
  cursor: pointer;
  height: 20px;
  margin: 0px 4px;
  padding: 0;
  width: 20px;
`;

const FilterSize = styled.select`
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  width: 80%;
  ${mobile({ width: "100%" })}
  ${tablet({ width: "100%" })}
`;

const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 700;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  padding: 0;

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

const Amount = styled.span`
  align-items: center;
  border: 1px solid ${colors.brand};
  border-radius: 8px;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0px 5px;
  width: 30px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ProductDetails = ({ product }) => {
  const { add } = useCart();
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Show "ADDED" on the button briefly after adding to the bag.
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const addToBag = () => {
    add({ id: product.id, color, size, quantity });
    setAdded(true);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image
            name={product.img}
            alt={product.alt}
            sizes="(max-width: 1023px) 100vw, 50vw"
            fetchPriority="high"
            style={{ maxWidth: `min(100%, ${imageInfo(product.img).width}px)` }}
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>
            {product.desc.map((paragraph, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {paragraph}
              </Fragment>
            ))}
          </Desc>
          <Price>{formatPrice(product.price)}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.colors.map((option) => (
                <FilterColor
                  key={option.name}
                  type="button"
                  $color={option.hex}
                  aria-label={option.name}
                  aria-pressed={option.name === color}
                  onClick={() => setColor(option.name)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle as="label" htmlFor="size">
                Size
              </FilterTitle>
              <FilterSize
                id="size"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                {product.sizes.map((option) => (
                  <FilterSizeOption key={option}>{option}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <QuantityButton
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </QuantityButton>
              <Amount aria-live="polite">{quantity}</Amount>
              <QuantityButton
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Add />
              </QuantityButton>
            </AmountContainer>
            <Actions>
              <Button type="button" onClick={addToBag}>
                {added ? "ADDED ✓" : "ADD TO BAG"}
              </Button>
              <Button
                type="button"
                aria-pressed={saved}
                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                onClick={() => wishlist.toggle(product.id)}
              >
                {saved ? (
                  <FavoriteIcon style={{ fontSize: 18 }} />
                ) : (
                  <FavoriteBorderOutlinedIcon style={{ fontSize: 18 }} />
                )}
                {saved ? "SAVED" : "SAVE"}
              </Button>
            </Actions>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

// Keyed by product so color/size/quantity reset when switching products.
const Product = () => {
  const { id } = useParams();
  const product = findProduct(id);

  if (!product) return <NotFound />;
  return <ProductDetails key={product.id} product={product} />;
};

export default Product;
