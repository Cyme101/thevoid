import { useRef } from "react";
import styled from "styled-components";
import { products } from "../Data";
import Product from "./Product";
import { useScrollReveal } from "../gsap";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
