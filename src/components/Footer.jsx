import { Link } from "react-router";
import styled from "styled-components";
import {
  FacebookRounded as FacebookRoundedIcon,
  Instagram as InstagramIcon,
  Pinterest as PinterestIcon,
  Twitter as TwitterIcon,
  Place as PlaceIcon,
  PhoneInTalk as PhoneInTalkIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import { mobile, tablet } from "../responsive";
import { colors } from "../theme";

const Columns = styled.div`
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
  background-color: #${(props) => props.$color};
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

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: colors.surface })}
`;

const ContactItem = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 10px;
  line-height: 1.5;
  margin-bottom: 20px;

  svg {
    flex-shrink: 0;
  }

  a {
    color: inherit;
  }
`;

// Small print: the photos still show real brands' logos.
const SmallPrint = styled.p`
  border-top: 1px solid ${colors.divider};
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.5;
  padding: 14px 20px;
  text-align: center;

  a {
    color: inherit;
  }
`;

const helpfulLinks = [
  { label: "HOME", to: "/" },
  { label: "ABOUT US", to: "/about" },
  { label: "MY ACCOUNT", to: "/login" },
  { label: "MY WISHLIST", to: "/wishlist" },
  { label: "BAG", to: "/bag" },
  { label: "CLOTHING", to: "/productlist?category=clothing" },
  { label: "SHOES", to: "/productlist?category=shoes" },
  { label: "ACCESSORIES", to: "/productlist?category=accessories" },
];

const Footer = () => {
  return (
    <footer>
      <Columns>
        <Left>
          <Logo>tHE/vOID</Logo>
          <Desc>
            We are going against the grain and we are focused on sustainability.
            We are using second hand clothes to make edgy and trendy new
            garments. Each piece will reveal a better version of yourself.
            <br></br>
            <br></br>
            FILL THE VOID WITH STYLE
          </Desc>
          <SocialContainer>
            <SocialIcon $color="0A80EC">
              <FacebookRoundedIcon />
            </SocialIcon>
            <SocialIcon $color="C10174">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon $color="1C9CEA">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon $color="E60023">
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>HELPFUL LINKS</Title>
          <List>
            {helpfulLinks.map((link) => (
              <ListItem key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </ListItem>
            ))}
          </List>
        </Center>
        <Right>
          <Title>CONTACT US</Title>
          {/* Placeholders: 555-01xx numbers and .example emails are reserved
            for fictional use, so they can't reach a real person. */}
          <ContactItem>
            <PlaceIcon />
            123 Fictional Street, Montréal, QC
          </ContactItem>
          <ContactItem>
            <PhoneInTalkIcon />
            +1 (514) 555-0142
          </ContactItem>
          <ContactItem>
            <EmailIcon />
            hello@thevoid.example
          </ContactItem>
        </Right>
      </Columns>
      <SmallPrint>
        tHE/vOID is a portfolio project, not a real store. No orders are
        processed. Product photos and logos belong to their respective owners.
        Hero photos from <a href="https://unsplash.com">Unsplash</a>.{" "}
        <a href="https://github.com/Cyme101/thevoid">View the code on GitHub</a>
        .
      </SmallPrint>
    </footer>
  );
};

export default Footer;
