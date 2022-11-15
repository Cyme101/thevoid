import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";

import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";

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

const Image = styled.img`
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

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  margin: 0px 4px;
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
              <FilterTitle>Color </FilterTitle>
              <FilterColor color="#6F8FAF" />
              <FilterColor color="#090909" />
              <FilterColor color="#5dadec" />
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
              <Remove />
              <Amount>1</Amount>
              <Add />
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
