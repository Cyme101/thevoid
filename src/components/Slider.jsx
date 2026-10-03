import { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";
import { sliderItems } from "../Data";
import Picture from "./Picture";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.button`
  align-items: center;
  background-color: #f7f9f9;
  border: none;
  border-radius: 50%;
  bottom: 0;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  left: ${(props) => props.$direction === "left" && "10px"};
  right: ${(props) => props.$direction === "right" && "10px"};
  margin: auto;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 50px;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.$slideIndex * -100}vw);
`;

const Slide = styled.div`
  align-items: center;
  background-color: #${(props) => props.$bg};
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled(Picture)`
  height: 90%;
  ${tablet({ height: "80%" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  ${tablet({ overflow: "hidden" })}
`;

const Title = styled.h1`
  font-size: 60px;
  ${tablet({ fontSize: "50px" })}
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  ${tablet({ fontSize: "20px" })}
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
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        type="button"
        $direction="left"
        aria-label="Previous slide"
        onClick={() => handleClick("left")}
      >
        <KeyboardArrowLeftIcon />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {sliderItems.map((item, index) => (
          <Slide $bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image
                name={item.img}
                alt={item.alt}
                sizes="60vh"
                {...(index === 0
                  ? { fetchPriority: "high" }
                  : { loading: "lazy" })}
              />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button as={Link} to="/productlist">
                SHOP SALE
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        type="button"
        $direction="right"
        aria-label="Next slide"
        onClick={() => handleClick("right")}
      >
        <KeyboardArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
