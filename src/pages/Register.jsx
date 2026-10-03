import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { imageUrl } from "../images";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div`
  align-items: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    url("${imageUrl("register-background")}") no-repeat center;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    image-set(
      url("${imageUrl("register-background", "avif")}") type("image/avif"),
      url("${imageUrl("register-background")}") type("image/webp")
    );
  background-size: cover;
  display: flex;
  justify-content: center;
  height: 100vh;
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

const Note = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const Register = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setMessage(
      form.get("password") === form.get("confirmPassword")
        ? "Account creation isn't available yet."
        : "Passwords don't match."
    );
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>CREATE ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              name="firstName"
              placeholder="First Name"
              aria-label="First name"
              autoComplete="given-name"
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              aria-label="Last name"
              autoComplete="family-name"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm password"
              autoComplete="new-password"
              required
            />
            <Button type="submit">CREATE</Button>
            {message && <Note role="status">{message}</Note>}
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
