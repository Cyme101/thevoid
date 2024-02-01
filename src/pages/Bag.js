import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
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
  ${mobile({ padding: "20px" })}
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

const TopInfo = styled.div`
  display: flex;
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  cursor: pointer;
  margin: 0px 10px;
  text-decoration: underline;
`;

const TopWishList = styled.div`
  cursor: pointer;
  margin: 0px 10px;
  text-decoration: underline;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const ProductInfo = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
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
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 300;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  color: gray;
  height: 1px;
`;

const Summary = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  flex: 1;
  height: 50vh;
  padding: 16px;
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
  padding-top: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  font-size: ${(props) => props.type === "total" && "24px"};
  font-weight: ${(props) => props.type === "total" && "500"};
  justify-content: space-between;
  margin: 30px 0;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
  padding: 10px;
  width: 100%;
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
            <TopWishList>Your WishList(0)</TopWishList>
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
                    <b>PRODUCT:</b> VENTURER PREPARE FOR WAR BOMBER JACKET
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
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
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
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$44.00 CAD</ProductPrice>
              </PriceDetail>
            </Product>
            <Product>
              <ProductDetail>
                <Image src="https://i.ibb.co/rfhzhpP/photo-1619521440807-ba72afd67b12-removebg-preview.png" />
                <Details>
                  <ProductName>
                    <b>PRODUCT:</b> Converse x Comme des Garçons PLAY Chuck 70
                    High Top
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
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$200.00 CAD</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
          </ProductInfo>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$474.00 CAD</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping</SummaryItemText>
              <SummaryItemPrice>FREE</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$474.00 CAD</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Bag;
