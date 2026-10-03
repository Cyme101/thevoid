import styled from "styled-components";
import { Send } from "@mui/icons-material";
import { mobile } from "../responsive";


const Container = styled.div`
  align-items: center;
  background-color: #f7ede2;
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: center;
  ${mobile({ height: "50vh" })}
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "50px", textAlign: "center" })}
`;

const Desc = styled.p`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #fbfaf8;
  display: flex;
  height: 40px;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  font-size: 16px;
  font-weight: 500;
  padding-left: 20px;
`;

const Button = styled.button`
  background-color: #02223c;
  border: none;
  color: white;
  cursor: pointer;
  flex: 1;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>JOIN THE LIST</Title>
      <Desc>Receive promotions, alerts, and new releases.</Desc>
      <InputContainer>
        <Input placeholder="Email Address"></Input>
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
