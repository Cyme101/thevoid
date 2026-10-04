import { useRef } from "react";
import styled from "styled-components";
import { categories } from "../Data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import { useScrollReveal } from "../gsap";
import { contained } from "../layout";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-block: 20px;
  ${contained()}
  ${mobile({ flexDirection: "column", paddingBlock: "10px" })}
`;

const Categories = () => {
  const containerRef = useRef(null);
  useScrollReveal(containerRef, { y: 60, stagger: 0.15 });

  return (
    <Container ref={containerRef}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
