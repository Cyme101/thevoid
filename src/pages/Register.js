import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  background-image: url("https://bit.ly/3D3Yc3c");
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
  padding: 20px;
  width: 25%;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0 0;
  min-width: 40%;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #044b7f;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  padding: 15px 20px;
  width: 30%;
  ${mobile({ width: "40%" })}
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
