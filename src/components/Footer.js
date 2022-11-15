import styled from "styled-components";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";

import PlaceIcon from "@mui/icons-material/Place";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";

import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  align-items: center;
  background-color: #${(props) => props.color};
  border-radius: 50%;
  color: white;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 20px;
  width: 40px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  width: 50%;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f5fbfc" })}
`;

const ContactItem = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>tHE/vOID</Logo>
        <Desc>
          We are going against the grain and we are focused on sustainability.
          We are using second hand clothes to make edgy and trendy new garments.
          Each piece will reveal a better version of yourself.
          <br></br>
          <br></br>
          FILL THE VOID WITH STYLE
        </Desc>
        <SocialContainer>
          <SocialIcon color="0A80EC">
            <FacebookRoundedIcon />
          </SocialIcon>
          <SocialIcon color="C10174">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="1C9CEA">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>HELPFUL LINKS</Title>
        <List>
          <ListItem>HOME</ListItem>
          <ListItem>MY ACCOUNT</ListItem>
          <ListItem>MY ORDERS</ListItem>
          <ListItem>MY WISHLIST</ListItem>
          <ListItem>BAG</ListItem>
          <ListItem>WOMEN'S</ListItem>
          <ListItem>MEN'S</ListItem>
          <ListItem>ACCESSORIES</ListItem>
          <ListItem>POLICIES</ListItem>
          <ListItem>TERMS OF SERVICE</ListItem>
          <ListItem>CHAT WITH OUR TEAM</ListItem>
        </List>
      </Center>
      <Right>
        <Title>CONTACT US</Title>
        <ContactItem>
          <PlaceIcon style={{ marginRight: "10px" }} /> 61 East Harvey Drive,
          Fairport, NY 14450
        </ContactItem>
        <ContactItem>
          <PhoneInTalkIcon style={{ marginRight: "10px" }} /> +1 (212) 555-3336
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} /> contact@thevoid
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
