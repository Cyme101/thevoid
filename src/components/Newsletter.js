import styled from "styled-components";
import { Send } from "@mui/icons-material";

const Container = styled.div`
  align-items: center;
  background-color: #f7ede2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #fbfaf8;
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 50%;
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
