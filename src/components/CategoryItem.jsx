import { Link } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";
import Picture from "./Picture";

const Image = styled(Picture)`
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  width: 100%;
`;

const Container = styled.div`
  flex: 1;
  height: 70vh;
  margin: 3px;
  overflow: hidden;
  position: relative;
  ${mobile({ height: "30vh" })}

  &:hover ${Image} {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  padding: 10px;
  text-decoration: none;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image
        name={item.img}
        alt={item.alt}
        sizes="(max-width: 767px) 100vw, 33vw"
        loading="lazy"
      />
      <Info>
        <Title>{item.title}</Title>
        <Button as={Link} to={item.to}>
          SHOP HERE
        </Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
