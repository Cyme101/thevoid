import { useRef } from "react";
import styled from "styled-components";
import { products } from "../Data";
import Product from "./Product";
import { useScrollReveal } from "../gsap";
import { mobile } from "../responsive";
import { contained } from "../layout";

const Container = styled.div`
  display: grid;
  gap: 40px 24px;
  /* At least 240px per card, and never more than 4 per row */
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(240px, calc((100% - 3 * 24px) / 4)), 1fr)
  );
  padding-block: 20px 60px;
  ${contained()}
  ${mobile({
    gap: "28px 12px",
    gridTemplateColumns: "repeat(2, 1fr)",
    paddingBlock: "12px 40px",
  })}
`;

const Products = ({ items = products }) => {
  const containerRef = useRef(null);
  useScrollReveal(containerRef, { stagger: 0.08, dependencies: [items] });

  return (
    <Container ref={containerRef}>
      {items.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
