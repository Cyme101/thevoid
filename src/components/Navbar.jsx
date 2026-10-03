import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";

import { Badge } from "@mui/material";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  Search,
} from "@mui/icons-material";
import { mobile } from "../responsive";
import { cartCount, useCart } from "../cart";
import { useWishlist } from "../wishlist";
import { productCategories } from "../Data";
import { gsap, useGSAP, prefersReducedMotion } from "../gsap";

const Container = styled.header``;

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
  ${mobile({ marginLeft: "0" })}
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

  /* Smallest phones (e.g. 320px wide) */
  @media (max-width: 359px) {
    font-size: 19px;
    margin: 0 6px;
  }
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

  @media (max-width: 359px) {
    margin-left: 7px;
  }
`;

// Hidden on phones to make room; the login page links to account creation.
const SignUpLink = styled(Link)`
  text-decoration: none;
  ${mobile({ display: "none" })}
`;

const BagIcon = styled.span`
  display: inline-flex;
`;

// Second row: the shop sections and the about page.
const ShopNav = styled.nav`
  border-bottom: 1px solid #eef0f2;
  border-top: 1px solid #eef0f2;
  display: flex;
  gap: 36px;
  justify-content: center;
  margin-top: 10px;
  padding: 12px 20px;
  ${mobile({
    gap: "22px",
    justifyContent: "flex-start",
    overflowX: "auto",
    padding: "10px 14px",
    scrollbarWidth: "none",
  })}
`;

const ShopLink = styled(Link)`
  color: #090909;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.5px;
  padding-bottom: 3px;
  position: relative;
  text-decoration: none;
  white-space: nowrap;

  /* Underline: shown for the current section, slides in on hover */
  &::after {
    background-color: #090909;
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    transform: scaleX(${(props) => (props["aria-current"] ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.3s ease;
    width: 100%;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const isProductList = (pathname) => pathname === "/productlist";

const shopLinks = [
  {
    label: "SHOP ALL",
    to: "/productlist",
    isCurrent: (pathname, params) =>
      isProductList(pathname) && !params.get("category") && !params.get("q"),
  },
  ...productCategories.map((category) => ({
    label: category.label.toUpperCase(),
    to: `/productlist?category=${category.id}`,
    isCurrent: (pathname, params) =>
      isProductList(pathname) && params.get("category") === category.id,
  })),
  {
    label: "ABOUT",
    to: "/about",
    isCurrent: (pathname) => pathname === "/about",
  },
];

const Navbar = () => {
  const { lines } = useCart();
  const count = cartCount(lines);
  const savedCount = useWishlist().ids.length;
  const bagRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
          <SignUpLink to="/register">
            <MenuItem>SIGN UP</MenuItem>
          </SignUpLink>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>LOG IN</MenuItem>
          </Link>
          <Link to="/wishlist" aria-label={`Wishlist, ${savedCount} saved`}>
            <MenuItem>
              <Badge badgeContent={savedCount} color="info">
                <FavoriteBorderOutlinedIcon
                  style={{ color: "#090909", fontSize: 28 }}
                />
              </Badge>
            </MenuItem>
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
      <ShopNav aria-label="Shop">
        {shopLinks.map((link) => (
          <ShopLink
            key={link.to}
            to={link.to}
            aria-current={
              link.isCurrent(pathname, searchParams) ? "page" : undefined
            }
          >
            {link.label}
          </ShopLink>
        ))}
      </ShopNav>
    </Container>
  );
};

export default Navbar;
