import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Option = styled.option``;

const Select = styled.select`
  margin-right: 20px;
  padding: 10px;
`;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title></Title>
      <FilterContainer>
        <Filter>
          <FilterText></FilterText>
          <Select>
            <Option disabled selected></Option>
            <Option></Option>
            <Option></Option>
            <Option></Option>
            <Option></Option>
            <Option></Option>
          </Select>
          <Select>
            <Option disabled selected>
              <Option></Option>
              <Option></Option>
              <Option></Option>
              <Option></Option>
              <Option></Option>
            </Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText></FilterText>
          <Select>
            <Option></Option>
            <Option></Option>
            <Option></Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
    </Container>
  );
};

export default ProductList;
