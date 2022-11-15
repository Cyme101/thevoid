import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  background-color: #02223c;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Error = styled.h1`
  color: red;
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
  color: grey;
  font-size: 30px;
`;

const Button = styled.button`

`

const NotFound = () => {
  return (
    <Container>
      <Error>
        <h1>404</h1>
        <Text>Oh No! I'm sorry! You can't shop here.</Text>
      </Error>
      <Link to="/">
        <Button>hOME.</Button>
        </Link>
    </Container>
  );
};

export default NotFound;
