import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

const Container = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div``;

const ImgContainer = styled.div``;

const Image = styled.img``;

const InfoContainer = styled.div``;

const Title = styled.h1``;

const Desc = styled.p``;

const Price = styled.span``;

const FilterContainer = styled.div``;

const Filter = styled.div``;

const FilterTitle = styled.span``;

const FilterColor = styled.div``;

const FilterSize = styled.select``;

const FilterSizeOption = styled.option``;

const Button = styled.button``;

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer></ImgContainer>
        <Image></Image>
        <InfoContainer>
          <Title></Title>
          <Desc></Desc>
          <Price></Price>
          <FilterContainer>
            <Filter>
              <FilterTitle></FilterTitle>
            </Filter>
          </FilterContainer>
          <Button>ADD TO CART</Button>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
