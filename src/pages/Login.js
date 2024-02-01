import styled from "styled-components";
import { mobile } from "../responsive";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  align-items: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://bit.ly/3REAnTv") no-repeat center;
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

const Link = styled.a`
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
  text-decoration: underline;

  &:hover {
    text-decoration: underline solid black 2px;
  }
`;

const Login = () => {
  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>LOGIN</Title>
          <Form>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Link>Forgot your password?</Link>
            <Button>SIGN IN</Button>
            <Link>Create account</Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
