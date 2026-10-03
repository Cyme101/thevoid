import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  background-color: #02223c;
  color: white;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  justify-content: center;
`;

const Announcement = () => {
  return <Container>Free Shipping on Orders Over 100$ CAD</Container>;
};

export default Announcement;
