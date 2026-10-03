import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";

import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";
import Picture from "../components/Picture";
import NotFound from "./NotFound";
import { findProduct } from "../Data";
import { useCart } from "../cart";
import { formatPrice } from "../price";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "10px" })}
  ${tablet({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ textAlign: "center" })}
  ${tablet({ textAlign: "center" })}
`;

const Image = styled(Picture)`
  height: 80vh;
  object-fit: cover;
  width: 100%;
  ${mobile({ height: "40vh" })}
  ${tablet({ height: "40vh" })}
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
`;

const FilterColor = styled.button`
  background-color: ${(props) => props.$color};
  border: none;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props["aria-pressed"] ? "0 0 0 2px white, 0 0 0 4px #044b7f" : "none"};
  cursor: pointer;
  height: 20px;
  margin: 0px 4px;
  padding: 0;
  width: 20px;
`;

const FilterSize = styled.select`
  margin-left: 8px;
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
  border: 1px solid #044b7f;
  border-radius: 8px;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0px 5px;
  width: 30px;
`;

const Button = styled.button`
  background-color: white;
  border: 2px solid #044b7f;
  cursor: pointer;
  font-weight: 500;
  padding: 15px;

  &:hover {
    background-color: #f8eeed;
  }
`;

const ProductDetails = ({ product }) => {
  const { add } = useCart();
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
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            name={product.img}
            alt={product.alt}
            sizes="(max-width: 1023px) 100vw, 50vw"
            fetchPriority="high"
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
            <Button type="button" onClick={addToBag}>
              {added ? "ADDED ✓" : "ADD TO BAG"}
            </Button>
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
