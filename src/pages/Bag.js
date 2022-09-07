import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  padding: 20px;
  text-align: center;
`;

const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

const TopButton = styled.button`
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  border: ${(props) => props.type === "filled" && "none"};
  color: ${(props) => props.type === "filled" && "white"};
  cursor: pointer;
  font-weight: 600;
  padding: 10px;
`;

const TopInfo = styled.div``;

const TopText = styled.span`
  cursor: pointer;
  margin: 0px 10px;
  text-decoration: underline;
`;

const TopWishList = styled.div``;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductInfo = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 22px;
  margin: 6px;
`;
const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 300;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  color: gray;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
`;

const Bag = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopInfo>
            <TopText>Shopping Bag(3)</TopText>
            <TopWishList></TopWishList>
          </TopInfo>
          <TopButton type="filled">CHECKOUT</TopButton>
        </Top>
        <Bottom>
          <ProductInfo>
            <Product>
              <ProductDetail>
                <Image src="https://i.ibb.co/CV8bSjV/Bomber-Jacket-Transparent-Images.png" />
                <Details>
                  <ProductName>
                    <b>PRODUCT:</b> PREPARE FOR WAR BOMBER JACKET
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> RN30004
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>1</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>$230.00 CAD</ProductPrice>
              </PriceDetail>
            </Product>
            <Product>
              <ProductDetail>
                <Image src="https://i.ibb.co/xYrsqC9/Obey-Cap-PNG-Transparent-Image.png" />
                <Details>
                  <ProductName>
                    <b>PRODUCT:</b> Brand Patch Strapback Hat
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> OBE-CAP-1234567-QA66
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> O/S
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>1</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>$44.00 CAD</ProductPrice>
              </PriceDetail>
            </Product>
            <Product>
              <ProductDetail>
                <Image src="https://i.ibb.co/rfhzhpP/photo-1619521440807-ba72afd67b12-removebg-preview.png" />
                <Details>
                  <ProductName>
                    <b>PRODUCT:</b> Converse x Comme des Garçons PLAY Chuck 70 High Top
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 16620479x
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> W 6
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon />
                  <ProductAmount>1</ProductAmount>
                  <RemoveIcon />
                </ProductAmountContainer>
                <ProductPrice>$200.00 CAD</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
          </ProductInfo>

          <Summary>summary</Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Bag;
