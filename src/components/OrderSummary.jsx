import styled from "styled-components";
import Picture from "./Picture";
import { findProduct } from "../Data";
import { lineKey, shippingCost } from "../cart";
import { formatPrice } from "../price";
import { taxesFor } from "../taxes";

const Summary = styled.aside`
  border: 1px solid #e6eaee;
  box-sizing: border-box;
  padding: 24px;
  width: 100%;
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
  box-sizing: border-box;
  color: white;
  font-size: 11px;
  min-width: 20px;
  padding: 2px 6px;
  position: absolute;
  right: -8px;
  text-align: center;
  top: -8px;
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
  border-top: ${(props) => (props.$total ? "1px solid #e6eaee" : "none")};
  display: flex;
  font-size: ${(props) => (props.$total ? "20px" : "15px")};
  font-weight: ${(props) => (props.$total ? 500 : 300)};
  justify-content: space-between;
  margin-top: ${(props) => (props.$total ? "16px" : "10px")};
  padding-top: ${(props) => (props.$total ? "16px" : "0")};
`;

// Cart lines with the product details needed to show (and keep) an order:
// a placed order stores this snapshot, so it still reads correctly if the
// catalogue changes later.
export const orderItems = (lines) =>
  lines.map((line) => {
    const product = findProduct(line.id);
    return {
      ...line,
      key: lineKey(line),
      name: product.name,
      price: product.price,
      img: product.img,
      alt: product.alt,
    };
  });

export const orderTotals = (items, province) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = shippingCost(subtotal);
  const taxes = taxesFor(province, subtotal + shipping);
  const total =
    subtotal + shipping + taxes.reduce((sum, tax) => sum + tax.amount, 0);
  return { subtotal, shipping, taxes, total };
};

// Items and totals, used at checkout and on the order confirmation.
const OrderSummary = ({
  items,
  province,
  title = "ORDER SUMMARY",
  className,
}) => {
  const { subtotal, shipping, taxes, total } = orderTotals(items, province);

  return (
    <Summary className={className} aria-label="Order summary">
      <SummaryTitle>{title}</SummaryTitle>
      {items.map((item) => (
        <Item key={item.key}>
          <Thumb>
            <ThumbImage name={item.img} alt={item.alt} sizes="60px" />
            <Quantity aria-label={`Quantity ${item.quantity}`}>
              {item.quantity}
            </Quantity>
          </Thumb>
          <ItemText>
            {item.name}
            <ItemOptions>
              {item.color} / {item.size}
            </ItemOptions>
          </ItemText>
          <span>{formatPrice(item.price * item.quantity)}</span>
        </Item>
      ))}
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

export default OrderSummary;
