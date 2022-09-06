import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Container = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-size: 30px;
  font-weight: 100;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  width: 50%;
`;

const Filter = styled.div`
  align-items: center;
  display: flex;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin: 0px 5px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 700;
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

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src="https://i.ibb.co/WgqVK33/Jeans-PNG-Image-Transparent-Background.png" />
        </ImgContainer>
        <InfoContainer>
          <Title>Ripped Boyfriend Fit Jeans</Title>
          <Desc>
            This was a returned item then our designers decided to make bigger
            holes in it. These are designed to fit exactly like those grunge
            jeans you always dreamed of finding.
            <br></br>
            <br></br>
            Made in U.S.A.
          </Desc>
          <Price>$75.00 CAD</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              <FilterColor color="#7ea8be" />
              <FilterColor />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon />
              <Amount>1</Amount>
              <AddIcon />
            </AmountContainer>
            <Button>ADD TO BAG</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
