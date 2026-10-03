import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router";

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

const SearchContainer = styled.form`
  border: 1px solid #e1e5ee;
  align-items: center;
  display: flex;
  margin-left: 24px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  display: flex;
  padding: 0;
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(query);

  // Keep the box in sync with the URL (e.g. back/forward between searches).
  useEffect(() => {
    setSearch(query);
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = search.trim();
    navigate(
      term ? `/productlist?q=${encodeURIComponent(term)}` : "/productlist"
    );
  };
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
          <SearchContainer role="search" onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search"
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <SearchButton type="submit" aria-label="Search">
              <Search style={{ fontSize: 18 }} />
            </SearchButton>
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
