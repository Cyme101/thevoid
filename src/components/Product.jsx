import styled from "styled-components";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import Picture from "./Picture";

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
  transition: all 1s ease;
  width: 100%;
  z-index: 4;
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

  &:hover ${Info} {
    opacity: 1.5;
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

const Icon = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  width: 40px;

  &:hover {
    background-color: #ade8f4;
    scale: 1.2;
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image name={item.img} alt={item.alt} sizes="320px" loading="lazy" />
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
        <Icon>
          <SearchOutlinedIcon />
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
