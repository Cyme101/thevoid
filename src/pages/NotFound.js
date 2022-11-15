import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  background-color: #faf9f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Number = styled.h1`
  color: #02223c;
  font-size: 60px;
  text-align: center;
  animation: glitch 1s linear infinite;

  @keyframes glitch {
    2%,
    64% {
      transform: translate(2px, 0) skew(0deg);
    }
    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }
    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }

  div:before,
  div:after {
    content: attr(title);
    position: absolute;
    left: 0;
  }

  div:before {
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  @keyframes glitchTop {
    2%,
    64% {
      transform: translate(2px, -2px);
    }
    4%,
    60% {
      transform: translate(-2px, 2px);
    }
    62% {
      transform: translate(13px, -1px) skew(-13deg);
    }
  }

  div:after {
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  @keyframes glitchBotom {
    2%,
    64% {
      transform: translate(-2px, 0);
    }
    4%,
    60% {
      transform: translate(-2px, 0);
    }
    62% {
      transform: translate(-22px, 5px) skew(21deg);
    }
  }
`;

const Text = styled.h2`
  color: #090909;
  font-size: 24px;
  margin: 32px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: #090909;
  border: 1px solid #090909;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0, #090909 4px 4px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;

  ${mobile({ padding: "12px 50px" })}
`;

const NotFound = () => {
  return (
    <Container>
      <Number>404</Number>
      <Text>Oh no! I'm sorry! You can't shop here.</Text>
      <Link to="/">
        <Button>HOME</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
