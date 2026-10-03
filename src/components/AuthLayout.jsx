import { Link } from "react-router";
import styled from "styled-components";
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "./Button";
import { imageUrl } from "../images";
import { mobile } from "../responsive";

// Full-screen photo (AVIF with a WebP fallback) behind the form card.
const Container = styled.div`
  align-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    url("${(props) => imageUrl(props.$image)}") no-repeat center;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    image-set(
      url("${(props) => imageUrl(props.$image, "avif")}") type("image/avif"),
      url("${(props) => imageUrl(props.$image)}") type("image/webp")
    );
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  opacity: 0.8;
  width: 100vw;
`;

const Card = styled.div`
  background-color: white;
  opacity: 0.9;
  padding: 20px;
  width: 40%;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  flex: 1;
  font-size: 14px;
  margin: 10px 0;
  min-width: 40%;
  padding: 10px;
`;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
  $variant: "accent",
})`
  margin: 30px 0 10px;
  width: 40%;
`;

// Status message shown after submitting (the forms have no backend).
export const Note = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

export const TextLink = styled(Link)`
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
  text-decoration: underline;

  &:hover {
    text-decoration: underline solid black 2px;
  }
`;

// Shared page for the account forms (log in, create account).
const AuthLayout = ({ image, title, children }) => (
  <>
    <Announcement />
    <Navbar />
    <Container $image={image}>
      <Card>
        <Title>{title}</Title>
        {children}
      </Card>
    </Container>
    <Footer />
  </>
);

export default AuthLayout;
