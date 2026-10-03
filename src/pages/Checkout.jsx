import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderSummary, { orderItems } from "../components/OrderSummary";
import { useCart } from "../cart";
import { newOrderNumber, saveOrder } from "../orders";
import { mobile, tablet } from "../responsive";
import Button, { ButtonLink } from "../components/Button";
import { colors } from "../theme";

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
    border: 1px solid ${colors.borderStrong};
    border-radius: 0;
    font-size: 15px;
    padding: 12px;
  }

  input:focus,
  select:focus {
    border-color: ${colors.brand};
    outline: 2px solid ${colors.brand};
    outline-offset: -1px;
  }

  input[readonly] {
    background-color: #f5f6f7;
    color: ${colors.muted};
  }
`;

const Optional = styled.span`
  color: ${colors.muted};
  font-weight: 300;
`;

const Notice = styled.p`
  background-color: ${colors.surface};
  border-left: 3px solid ${colors.brand};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 14px 16px;
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

const PlaceOrder = styled(Button)`
  letter-spacing: 1px;
  padding: 16px;
`;

const ShopButton = styled(ButtonLink)`
  margin-top: 24px;
`;

// Beside the form on desktop; above it on tablets and phones.
const CheckoutSummary = styled(OrderSummary)`
  align-self: flex-start;
  flex: 2;
  ${tablet({ order: -1 })}
  ${mobile({ order: -1, padding: "18px" })}
`;

const Checkout = () => {
  const { lines, clear } = useCart();
  const [province, setProvince] = useState("Quebec");
  const navigate = useNavigate();

  const placeOrder = (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const order = {
      ...form,
      number: newOrderNumber(),
      placedAt: new Date().toISOString(),
      items: orderItems(lines),
    };
    saveOrder(order);
    clear();
    navigate(`/order/${order.number}`, { state: { order } });
  };

  let content;
  if (lines.length === 0) {
    content = (
      <Message>
        <h1>Your bag is empty</h1>
        Add a few pieces before checking out.
        <br />
        <ShopButton to="/productlist">SHOP ALL</ShopButton>
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
          <PlaceOrder type="submit" $variant="filled" $fullWidth>
            PLACE ORDER
          </PlaceOrder>
        </Form>
        <CheckoutSummary items={orderItems(lines)} province={province} />
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
