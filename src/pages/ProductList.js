import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Container = styled.div``;

const Title = styled.h1``;

const FilterContainer = styled.div``;

const Filter = styled.div``;

const FilterText = styled.span``;

const Select = styled.select``;

const ProductList = () => {
  return (<Container>
    <Title></Title>
    <FilterContainer>
      <Filter></Filter>
      <FilterText></FilterText>
    </FilterContainer>
  </Container>);
};

export default ProductList;
