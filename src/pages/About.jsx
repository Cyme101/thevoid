import { useRef } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Picture from "../components/Picture";
import { mobile, tablet } from "../responsive";
import { useScrollReveal } from "../gsap";
import { ButtonLink } from "../components/Button";

const Hero = styled.section`
  align-items: center;
  display: flex;
  gap: 6vw;
  justify-content: center;
  padding: 80px 80px;
  ${tablet({ flexDirection: "column", padding: "50px 40px" })}
  ${mobile({ flexDirection: "column", padding: "32px 20px", gap: "28px" })}
`;

const HeroImage = styled(Picture)`
  aspect-ratio: 4 / 5;
  max-width: 440px;
  object-fit: cover;
  width: 40vw;
  ${tablet({ width: "70vw" })}
  ${mobile({ width: "100%" })}
`;

const HeroText = styled.div`
  max-width: 560px;
`;

const Eyebrow = styled.p`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 3px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 56px;
  line-height: 1.05;
  margin-bottom: 28px;
  ${mobile({ fontSize: "38px" })}
`;

const Lead = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 32px;
  ${mobile({ fontSize: "17px" })}
`;

const Steps = styled.section`
  background-color: #f5fbfc;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  padding: 80px;
  ${tablet({ gridTemplateColumns: "1fr", padding: "50px 40px" })}
  ${mobile({ gridTemplateColumns: "1fr", padding: "40px 20px", gap: "32px" })}
`;

const Step = styled.div`
  border-top: 1px solid #090909;
  padding-top: 20px;
`;

const StepNumber = styled.span`
  font-family: "Fira Mono", monospace;
  font-size: 14px;
`;

const StepTitle = styled.h2`
  font-size: 26px;
  margin: 10px 0 12px;
`;

const StepText = styled.p`
  font-weight: 300;
  line-height: 1.6;
`;

// Placeholder copy for the steps; edit to match how the studio works.
const steps = [
  {
    title: "Sourced",
    text: "Every piece starts as a second-hand or returned garment that still has a story to tell.",
  },
  {
    title: "Reworked",
    text: "Our designers cut, distress, patch and re-line it into something edgier than it was.",
  },
  {
    title: "Yours",
    text: "A one-of-a-kind piece for you, and one less garment headed for landfill.",
  },
];

const About = () => {
  const stepsRef = useRef(null);
  useScrollReveal(stepsRef, { stagger: 0.15 });

  return (
    <>
      <Announcement />
      <Navbar />
      <Hero>
        <HeroImage
          name="category-jeans"
          alt="Model in a denim jacket and jeans"
          sizes="(max-width: 1023px) 90vw, 440px"
          fetchPriority="high"
        />
        <HeroText>
          <Eyebrow>OUR STORY</Eyebrow>
          <Title>FILL THE VOID WITH STYLE</Title>
          <Lead>
            We are going against the grain and we are focused on sustainability.
            We are using second hand clothes to make edgy and trendy new
            garments. Each piece will reveal a better version of yourself.
          </Lead>
          <ButtonLink to="/productlist">SHOP THE COLLECTION</ButtonLink>
        </HeroText>
      </Hero>
      <Steps ref={stepsRef} aria-label="How it works">
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepNumber>0{index + 1}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepText>{step.text}</StepText>
          </Step>
        ))}
      </Steps>
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
