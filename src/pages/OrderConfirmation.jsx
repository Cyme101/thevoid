import { useLocation, useParams } from "react-router";
import styled, { keyframes } from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderSummary from "../components/OrderSummary";
import { findOrder } from "../orders";
import { mobile, tablet } from "../responsive";
import { ButtonLink } from "../components/Button";
import { colors } from "../theme";

const draw = keyframes`
  to { stroke-dashoffset: 0; }
`;

const Header = styled.section`
  padding: 60px 20px 36px;
  text-align: center;
  ${mobile({ padding: "36px 16px 24px" })}
`;

// Circle, then tick, draw themselves in (static for reduced motion).
const Check = styled.svg`
  height: 72px;
  margin-bottom: 20px;
  width: 72px;

  circle,
  path {
    fill: none;
    stroke: ${colors.ink};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }

  circle {
    animation: ${draw} 0.6s ease-out forwards;
    stroke-dasharray: 214;
    stroke-dashoffset: 214;
  }

  path {
    animation: ${draw} 0.35s ease-out 0.55s forwards;
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
  }

  @media (prefers-reduced-motion: reduce) {
    circle,
    path {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 8px;
  ${mobile({ fontSize: "30px" })}
`;

const Lead = styled.p`
  font-size: 20px;
  font-weight: 300;
`;

const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 40px;
  justify-content: center;
  margin-top: 28px;

  div {
    text-align: center;
  }

  dt {
    color: ${colors.muted};
    font-size: 12px;
    letter-spacing: 1.5px;
    margin-bottom: 4px;
  }

  dd {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 40px;
  margin: 0 auto;
  max-width: 1000px;
  padding: 20px 20px 40px;
  ${tablet({ flexDirection: "column", gap: "24px" })}
  ${mobile({ flexDirection: "column", gap: "20px", padding: "12px 16px 32px" })}
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.section`
  border: 1px solid ${colors.border};
  padding: 24px;
  ${mobile({ padding: "18px" })}

  h2 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1.5px;
    margin-bottom: 14px;
  }

  p,
  li {
    font-weight: 300;
    line-height: 1.6;
  }

  ol {
    margin: 0;
    padding-left: 20px;
  }

  ol + p {
    color: ${colors.muted};
    font-size: 14px;
    margin-top: 12px;
  }
`;

const Address = styled.address`
  font-style: normal;
  font-weight: 300;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 0 20px 70px;
`;

const NotFound = styled.div`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  padding: 80px 20px 40px;
  text-align: center;

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const OrderConfirmation = () => {
  const { number } = useParams();
  const { state } = useLocation();
  // Router state right after checkout; saved orders after a reload.
  const order =
    state?.order?.number === number ? state.order : findOrder(number);

  return (
    <>
      <Announcement />
      <Navbar />
      {order ? (
        <>
          <Header role="status">
            <Check viewBox="0 0 72 72" aria-hidden="true">
              <circle cx="36" cy="36" r="34" />
              <path d="M22 37 L32 47 L51 27" />
            </Check>
            <Title>Thank you, {order.firstName}!</Title>
            <Lead>Your order is placed.</Lead>
            <Meta>
              <div>
                <dt>ORDER NUMBER</dt>
                <dd>{order.number}</dd>
              </div>
              <div>
                <dt>DATE</dt>
                <dd>{formatDate(order.placedAt)}</dd>
              </div>
              <div>
                <dt>EMAIL</dt>
                <dd>{order.email}</dd>
              </div>
            </Meta>
          </Header>
          <Body>
            <Column>
              <Card aria-labelledby="shipping-to">
                <h2 id="shipping-to">SHIPPING TO</h2>
                <Address>
                  {order.firstName} {order.lastName}
                  <br />
                  {order.address}
                  {order.address2 && (
                    <>
                      <br />
                      {order.address2}
                    </>
                  )}
                  <br />
                  {order.city}, {order.province} {order.postalCode}
                  <br />
                  {order.country}
                </Address>
              </Card>
              <Card aria-labelledby="whats-next">
                <h2 id="whats-next">WHAT HAPPENS NEXT</h2>
                <ol>
                  <li>
                    In a real store, a confirmation email would go to{" "}
                    {order.email}.
                  </li>
                  <li>Your pieces would be packed and shipped.</li>
                  <li>You'd get a tracking link once it's on its way.</li>
                </ol>
                <p>
                  tHE/vOID is a demo store: no payment was taken and nothing
                  will ship.
                </p>
              </Card>
            </Column>
            <Column>
              <OrderSummary
                items={order.items}
                province={order.province}
                title="YOUR ORDER"
              />
            </Column>
          </Body>
          <Actions>
            <ButtonLink to="/productlist" $variant="filled">
              CONTINUE SHOPPING
            </ButtonLink>
            <ButtonLink to="/">BACK TO HOME</ButtonLink>
          </Actions>
        </>
      ) : (
        <NotFound>
          <h1>Order not found</h1>
          We couldn't find order {number} on this device.
          <Actions style={{ paddingTop: 24 }}>
            <ButtonLink to="/productlist" $variant="filled">
              SHOP ALL
            </ButtonLink>
          </Actions>
        </NotFound>
      )}
      <Footer />
    </>
  );
};

export default OrderConfirmation;
