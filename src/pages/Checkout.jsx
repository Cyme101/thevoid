import { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Picture from "../components/Picture";
import { findProduct } from "../Data";
import { cartSubtotal, lineKey, shippingCost, useCart } from "../cart";
import { formatPrice } from "../price";
import { taxesFor } from "../taxes";
import { mobile, tablet } from "../responsive";

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const Wrapper = styled.div`
  display: flex;
  gap: 60px;
  margin: 0 auto;
  max-width: 1100px;
  padding: 40px 20px 80px;
  ${tablet({ flexDirection: "column", gap: "40px" })}
  ${mobile({ flexDirection: "column", gap: "32px", padding: "24px 16px 60px" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 8px;
`;

const Form = styled.form`
  flex: 3;
`;

const Section = styled.fieldset`
  border: none;
  margin: 0 0 28px;
  padding: 0;
`;

const SectionTitle = styled.legend`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  ${mobile({ flexDirection: "column", gap: "0" })}
`;

const Field = styled.label`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 13px;
  font-weight: 500;
  gap: 6px;
  margin-bottom: 14px;

  input,
  select {
    border: 1px solid #cfd6dc;
    border-radius: 0;
    font-size: 15px;
    padding: 12px;
  }

  input:focus,
  select:focus {
    border-color: #044b7f;
    outline: 2px solid #044b7f;
    outline-offset: -1px;
  }

  input[readonly] {
    background-color: #f5f6f7;
    color: #555;
  }
`;

const Optional = styled.span`
  color: #6b7075;
  font-weight: 300;
`;

const Notice = styled.p`
  background-color: #f5fbfc;
  border-left: 3px solid #044b7f;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 14px 16px;
`;

const PlaceOrder = styled.button`
  background-color: #090909;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 16px;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #02223c;
  }
`;

// Beside the form on desktop; above it on tablets and phones.
const Summary = styled.aside`
  align-self: flex-start;
  border: 1px solid #e6eaee;
  box-sizing: border-box;
  flex: 2;
  padding: 24px;
  width: 100%;
  ${tablet({ order: -1 })}
  ${mobile({ order: -1, padding: "18px" })}
`;

const SummaryTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-bottom: 18px;
`;

const Item = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
`;

const Thumb = styled.div`
  align-items: center;
  background-color: #f5fbfc;
  display: flex;
  flex: none;
  height: 72px;
  justify-content: center;
  position: relative;
  width: 60px;
`;

const ThumbImage = styled(Picture)`
  max-height: 85%;
  max-width: 85%;
  object-fit: contain;
`;

const Quantity = styled.span`
  background-color: #090909;
  border-radius: 10px;
  color: white;
  font-size: 11px;
  min-width: 20px;
  padding: 2px 6px;
  position: absolute;
  right: -8px;
  text-align: center;
  top: -8px;
  box-sizing: border-box;
`;

const ItemText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
`;

const ItemOptions = styled.div`
  color: #6b7075;
  font-size: 13px;
`;

const Line = styled.div`
  display: flex;
  font-size: ${(props) => (props.$total ? "20px" : "15px")};
  font-weight: ${(props) => (props.$total ? 500 : 300)};
  justify-content: space-between;
  margin-top: ${(props) => (props.$total ? "16px" : "10px")};
  padding-top: ${(props) => (props.$total ? "16px" : "0")};
  border-top: ${(props) => (props.$total ? "1px solid #e6eaee" : "none")};
`;

const Message = styled.div`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 640px;
  padding: 60px 20px 40px;
  text-align: center;

  h1 {
    font-size: 34px;
    font-weight: 500;
    margin-bottom: 12px;
  }
`;

const OutlineLink = styled(Link)`
  border: 2px solid #090909;
  color: #090909;
  display: inline-block;
  font-size: 15px;
  font-weight: 500;
  margin-top: 24px;
  padding: 12px 22px;
  text-decoration: none;

  &:hover {
    background-color: #090909;
    color: white;
  }
`;

// Items and totals, used both before and after placing the order.
const OrderSummary = ({ lines, province, title = "ORDER SUMMARY" }) => {
  const subtotal = cartSubtotal(lines);
  const shipping = shippingCost(subtotal);
  const taxes = taxesFor(province, subtotal + shipping);
  const total =
    subtotal + shipping + taxes.reduce((sum, tax) => sum + tax.amount, 0);

  return (
    <Summary aria-label="Order summary">
      <SummaryTitle>{title}</SummaryTitle>
      {lines.map((line) => {
        const product = findProduct(line.id);
        return (
          <Item key={lineKey(line)}>
            <Thumb>
              <ThumbImage name={product.img} alt={product.alt} sizes="60px" />
              <Quantity aria-label={`Quantity ${line.quantity}`}>
                {line.quantity}
              </Quantity>
            </Thumb>
            <ItemText>
              {product.name}
              <ItemOptions>
                {line.color} / {line.size}
              </ItemOptions>
            </ItemText>
            <span>{formatPrice(product.price * line.quantity)}</span>
          </Item>
        );
      })}
      <Line>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </Line>
      <Line>
        <span>Shipping</span>
        <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
      </Line>
      {taxes.map((tax) => (
        <Line key={tax.label}>
          <span>{tax.label}</span>
          <span>{formatPrice(tax.amount)}</span>
        </Line>
      ))}
      <Line $total>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </Line>
    </Summary>
  );
};

const orderNumber = () =>
  `TV-${Date.now().toString(36).slice(-6).toUpperCase()}`;

const Checkout = () => {
  const { lines, clear } = useCart();
  const [order, setOrder] = useState(null);
  const [province, setProvince] = useState("Quebec");

  const placeOrder = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setOrder({
      number: orderNumber(),
      firstName: form.get("firstName"),
      email: form.get("email"),
      lines,
      province,
    });
    clear();
    window.scrollTo(0, 0);
  };

  let content;
  if (order) {
    content = (
      <>
        <Message role="status">
          <h1>Thank you, {order.firstName}!</h1>
          Order <strong>{order.number}</strong> is confirmed.
          <br />
          This is a demo store: no payment was taken, no email is sent to{" "}
          {order.email}, and nothing will ship.
        </Message>
        <Wrapper>
          <OrderSummary
            lines={order.lines}
            province={order.province}
            title="YOUR ORDER"
          />
        </Wrapper>
        <Message>
          <OutlineLink to="/productlist">CONTINUE SHOPPING</OutlineLink>
        </Message>
      </>
    );
  } else if (lines.length === 0) {
    content = (
      <Message>
        <h1>Your bag is empty</h1>
        Add a few pieces before checking out.
        <br />
        <OutlineLink to="/productlist">SHOP ALL</OutlineLink>
      </Message>
    );
  } else {
    content = (
      <Wrapper>
        <Form onSubmit={placeOrder}>
          <Title>Checkout</Title>
          <Section>
            <SectionTitle>CONTACT</SectionTitle>
            <Field>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </Field>
          </Section>
          <Section>
            <SectionTitle>SHIPPING ADDRESS</SectionTitle>
            <Row>
              <Field>
                First name
                <input name="firstName" autoComplete="given-name" required />
              </Field>
              <Field>
                Last name
                <input name="lastName" autoComplete="family-name" required />
              </Field>
            </Row>
            <Field>
              Address
              <input name="address" autoComplete="address-line1" required />
            </Field>
            <Field>
              <span>
                Apartment, suite, etc. <Optional>(optional)</Optional>
              </span>
              <input name="address2" autoComplete="address-line2" />
            </Field>
            <Row>
              <Field>
                City
                <input name="city" autoComplete="address-level2" required />
              </Field>
              <Field>
                Province
                <select
                  name="province"
                  autoComplete="address-level1"
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  required
                >
                  {PROVINCES.map((province) => (
                    <option key={province}>{province}</option>
                  ))}
                </select>
              </Field>
            </Row>
            <Row>
              <Field>
                Postal code
                <input
                  name="postalCode"
                  autoComplete="postal-code"
                  pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]"
                  title="Canadian postal code, e.g. H2X 1Y4"
                  placeholder="H2X 1Y4"
                  required
                />
              </Field>
              <Field>
                Country
                <input name="country" value="Canada" readOnly />
              </Field>
            </Row>
            <Field>
              <span>
                Phone <Optional>(optional)</Optional>
              </span>
              <input name="phone" type="tel" autoComplete="tel" />
            </Field>
          </Section>
          <Notice>
            tHE/vOID is a demo store. No payment is taken and nothing will be
            shipped, so there are no card details to enter.
          </Notice>
          <PlaceOrder type="submit">PLACE ORDER</PlaceOrder>
        </Form>
        <OrderSummary lines={lines} province={province} />
      </Wrapper>
    );
  }

  return (
    <>
      <Announcement />
      <Navbar />
      {content}
      <Footer />
    </>
  );
};

export default Checkout;
