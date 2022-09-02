import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 70vh;
  margin: 4px;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const Info = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Title = styled.div``;

const Button = styled.button``;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP HERE!</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
