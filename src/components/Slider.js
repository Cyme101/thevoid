import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import img from "../img/kaia.png";

const Container = styled.div`
  display: flex;
  height: 100vh;
  margin-top: 10px;
  position: relative;
  width: 100%;
`;

const Arrow = styled.div`
  align-items: center;
  background-color: #f7f9f9;
  border-radius: 50%;
  bottom: 0;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  left: ${(props) => props.direction === "left" && "15px"};
  right: ${(props) => props.direction === "right" && "15px"};
  margin: auto;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 40px;
`;

const Wrapper = styled.div`
  height: 100%;
`;

const Slide = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  height: 100%;
  margin-left: 280px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1``;

const Desc = styled.p``;

const Button = styled.button``;

const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <KeyboardArrowLeftIcon />
      </Arrow>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image />
          </ImgContainer>
          <InfoContainer>
            <Title>END OF SUMMER SALE</Title>
            <Desc>UP TO 50% OFF</Desc>
            <Button>SHOP SALE</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right">
        <KeyboardArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
