import React from "react";
import styled from "styled-components";

import Badge from "@mui/material/Badge";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Search } from "@mui/icons-material";
import { mobile } from "../responsive";
import { tablet } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "40px" })}
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 10px;
  ${mobile({ padding: "5px 0px", margin: "8px" })}

`;

const Language = styled.span`
  font: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
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
  ${mobile({ marginRight: "20px" })}
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
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>FR</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 18 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>tHE/vOID.</Logo>
        </Center>
        <Right>
          <MenuItem>SIGN UP</MenuItem>
          <MenuItem>LOG IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={3} color="info">
              <ShoppingBagOutlinedIcon style={{ color: 46494, fontSize: 30 }} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
