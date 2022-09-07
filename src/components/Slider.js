import { useState } from "react";
import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { sliderItems } from "../Data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 100vh;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  width: 100%;
  ${mobile({ display: "none" })}
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
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  align-items: center;
  background-color: #${(props) => props.bg};
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  height: 100%;
  margin-left: 80px;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 125px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 40px 0px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  padding: 10px 15px;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP SALE</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
