import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div`
  align-items: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://bit.ly/3D3Yc3c") no-repeat center;
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

const Register = () => {
  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>CREATE ACCOUNT</Title>
          <Form>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Input placeholder="Confirm Password" />
            <Button>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
