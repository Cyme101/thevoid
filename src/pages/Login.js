import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  background-image: url("https://bit.ly/3REAnTv");
  background-position: center no-repeat;
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
  padding: 30px 20px;
  width: 25%;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  font-size: 16px;
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
  padding: 15px 20px;
  width: 30%;
  ${mobile({ width: "40%" })}
`;

const Link = styled.a`
  cursor: pointer;
  font-size: 16px;
  margin: 5px 0;
  text-decoration: none;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Link>Forgot your password?</Link>
          <Button>SIGN IN</Button>
          <Link>Create account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
