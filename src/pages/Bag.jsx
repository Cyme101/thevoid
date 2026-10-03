import { Add, Remove } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";
import Picture from "../components/Picture";
import { findProduct } from "../Data";
import {
  FREE_SHIPPING_THRESHOLD,
  shippingCost,
  cartCount,
  cartSubtotal,
  lineKey,
  useCart,
} from "../cart";
import { formatPrice } from "../price";
import { useWishlist } from "../wishlist";
import Button, { ButtonLink } from "../components/Button";
import { colors } from "../theme";
import QuantityButton from "../components/QuantityButton";

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

const TopInfo = styled.div`
  display: flex;
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  cursor: pointer;
  margin: 0px 10px;
  text-decoration: underline;
`;

const TopWishList = styled(Link)`
  color: inherit;
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

const Image = styled(Picture)`
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
  background-color: ${(props) => props.$color};
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
  background-color: ${colors.divider};
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
  font-size: ${(props) => props.$variant === "total" && "24px"};
  font-weight: ${(props) => props.$variant === "total" && "500"};
  justify-content: space-between;
  margin: 30px 0;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ShippingHint = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin: -18px 0 20px;
`;

const TaxNote = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin: -14px 0 16px;
`;

const Empty = styled.p`
  font-size: 20px;
  font-weight: 300;
  padding: 30px 0;
  text-align: center;
`;

const Bag = () => {
  const { lines, setQuantity } = useCart();
  const savedCount = useWishlist().ids.length;
  const count = cartCount(lines);
  const subtotal = cartSubtotal(lines);
  const isEmpty = lines.length === 0;
  const shipping = shippingCost(subtotal);
  const navigate = useNavigate();
  const goToCheckout = () => navigate("/checkout");

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <ButtonLink to="/productlist" $size="sm">
            CONTINUE SHOPPING
          </ButtonLink>
          <TopInfo>
            <TopText>Shopping Bag({count})</TopText>
            <TopWishList to="/wishlist">
              Your WishList({savedCount})
            </TopWishList>
          </TopInfo>
        </Top>
        <Bottom>
          <ProductInfo>
            {isEmpty && <Empty>Your bag is empty.</Empty>}
            {lines.map((line) => {
              const product = findProduct(line.id);
              const key = lineKey(line);
              const color = product.colors.find((c) => c.name === line.color);

              return (
                <div key={key}>
                  <Product>
                    <ProductDetail>
                      <Link to={`/product/${product.id}`}>
                        <Image
                          name={product.img}
                          alt={product.alt}
                          sizes="200px"
                        />
                      </Link>
                      <Details>
                        <ProductName>
                          <b>PRODUCT:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.sku}
                        </ProductId>
                        <ProductColor
                          $color={color?.hex}
                          title={line.color}
                          aria-label={`Color: ${line.color}`}
                        />
                        <ProductSize>
                          <b>Size:</b> {line.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <QuantityButton
                          type="button"
                          aria-label={`Add one ${product.name}`}
                          onClick={() => setQuantity(key, line.quantity + 1)}
                        >
                          <Add />
                        </QuantityButton>
                        <ProductAmount aria-live="polite">
                          {line.quantity}
                        </ProductAmount>
                        <QuantityButton
                          type="button"
                          aria-label={
                            line.quantity === 1
                              ? `Remove ${product.name} from bag`
                              : `Remove one ${product.name}`
                          }
                          onClick={() => setQuantity(key, line.quantity - 1)}
                        >
                          <Remove />
                        </QuantityButton>
                      </ProductAmountContainer>
                      <ProductPrice>
                        {formatPrice(product.price * line.quantity)}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </div>
              );
            })}
          </ProductInfo>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{formatPrice(subtotal)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping</SummaryItemText>
              <SummaryItemPrice>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </SummaryItemPrice>
            </SummaryItem>
            {shipping > 0 && (
              <ShippingHint>
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
                free shipping.
              </ShippingHint>
            )}
            <SummaryItem $variant="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {formatPrice(subtotal + shipping)}
              </SummaryItemPrice>
            </SummaryItem>
            <TaxNote>Taxes calculated at checkout.</TaxNote>
            <Button
              type="button"
              $variant="filled"
              $fullWidth
              disabled={isEmpty}
              onClick={goToCheckout}
            >
              CHECKOUT
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Bag;
