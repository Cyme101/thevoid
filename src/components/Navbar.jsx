import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router";

import { Badge } from "@mui/material";
import {
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  Search,
} from "@mui/icons-material";
import { mobile } from "../responsive";
import { cartCount, useCart } from "../cart";
import { gsap, useGSAP, prefersReducedMotion } from "../gsap";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 10px;
  ${mobile({ padding: "10px 14px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Left = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`;

const SearchContainer = styled.div`
  border: 1px solid #e1e5ee;
  align-items: center;
  display: flex;
  margin-left: 24px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bolder;

  a {
    color: inherit;
    text-decoration: none;
  }

  ${mobile({ fontSize: "22px", margin: "0 8px" })}
`;

const Right = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  color: #090909;
  cursor: pointer;
  font-size: 14px;
  margin-left: 25px;
  white-space: nowrap;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const BagIcon = styled.span`
  display: inline-flex;
`;

const Navbar = () => {
  const { lines } = useCart();
  const count = cartCount(lines);
  const bagRef = useRef(null);
  const previousCount = useRef(count);

  // Bounce the bag icon when something is added.
  useGSAP(
    () => {
      if (count > previousCount.current && !prefersReducedMotion()) {
        gsap.fromTo(
          bagRef.current,
          { scale: 1, rotation: 0 },
          {
            keyframes: [
              { scale: 1.25, rotation: -12, duration: 0.15 },
              { scale: 0.95, rotation: 8, duration: 0.15 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "elastic.out(1, 0.4)",
              },
            ],
          }
        );
      }
      previousCount.current = count;
    },
    { dependencies: [count] }
  );

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>FR</Language>
          <SearchContainer>
            <Input placeholder="Search" aria-label="Search" />
            <Search style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/">tHE/vOID.</Link>
          </Logo>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItem>SIGN UP</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>LOG IN</MenuItem>
          </Link>
          <Link to="/bag" aria-label={`Bag, ${count} items`}>
            <MenuItem>
              <BagIcon ref={bagRef}>
                <Badge badgeContent={count} color="info">
                  <ShoppingBagOutlinedIcon
                    style={{ color: "#090909", fontSize: 30 }}
                  />
                </Badge>
              </BagIcon>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
