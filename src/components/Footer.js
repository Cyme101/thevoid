import styled from "styled-components";

const Container = styled.div``;

const Left = styled.div``;

const Logo = styled.h1``;

const Desc = styled.p``;

const SocialContainer = styled.div``;

const SocialIcon = styled.div``;

const Center = styled.div``;

const Title = styled.h3``;

const List = styled.ul``;

const ListItem = styled.div``;

const Right = styled.div``;

const ContactItem = styled.div``;

const Payment = styled.img``;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo />
        <Desc></Desc>
        <SocialContainer>
          <SocialIcon></SocialIcon>
          <SocialIcon></SocialIcon>
          <SocialIcon></SocialIcon>
          <SocialIcon></SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title></Title>
        <List>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
        </List>
      </Center>
      <Right>
        <Title></Title>
        <ContactItem></ContactItem>
        <ContactItem></ContactItem>
        <ContactItem></ContactItem>
      </Right>
      <Payment />
    </Container>
  );
};

export default Footer;
