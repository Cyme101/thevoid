import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material/";

const Container = styled.div``;

const Circle = styled.div``;

const Image = styled.img``;

const Info = styled.div``;

const Icon = styled.div``;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
      </Info>
    </Container>
  );
};
