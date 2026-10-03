import { useState } from "react";
import { Link as RouterLink } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";
import { imageUrl } from "../images";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  align-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    url("${imageUrl("login-background")}") no-repeat center;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    image-set(
      url("${imageUrl("login-background", "avif")}") type("image/avif"),
      url("${imageUrl("login-background")}") type("image/webp")
    );
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  opacity: 0.8;
  width: 100vw;
`;

const Wrapper = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  font-size: 14px;
  margin: 10px 0;
  min-width: 40%;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #044b7f;
  border: none;
  color: white;
  cursor: pointer;
  margin: 30px 0 10px 0;
  padding: 15px;
  width: 40%;
`;

const Link = styled(RouterLink)`
  color: inherit;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
  text-decoration: underline;

  &:hover {
    text-decoration: underline solid black 2px;
  }
`;

const Note = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const Login = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>LOGIN</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              required
            />
            <Link as="span">Forgot your password?</Link>
            <Button type="submit">SIGN IN</Button>
            {submitted && (
              <Note role="status">Sign-in isn't available yet.</Note>
            )}
            <Link to="/register">Create account</Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
