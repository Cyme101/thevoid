import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { findCategory, searchProducts } from "../Data";
import { contained } from "../layout";

const Container = styled.div``;

// Heading, count and filters, lined up with the product grid below.
const Header = styled.div`
  ${contained()}
`;

const Title = styled.h1`
  margin: 20px 0;
`;

const ResultCount = styled.p`
  font-weight: 300;
  margin: -10px 0 0;
`;

const NoResults = styled.div`
  font-size: 20px;
  font-weight: 300;
  padding: 60px 20px;
  text-align: center;

  a {
    color: inherit;
    display: inline-block;
    font-size: 16px;
    margin-top: 16px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 15px 0;
  ${mobile({ margin: "0", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Option = styled.option``;

const Select = styled.select`
  margin-right: 20px;
  padding: 8px;
  ${mobile({ margin: "10px 0px" })}
`;

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const category = findCategory(searchParams.get("category"));
  const results = useMemo(
    () =>
      searchProducts(query).filter(
        (product) => !category || product.category === category.id
      ),
    [query, category]
  );

  let title = "All Products";
  if (query) {
    title = `Results for “${query}”${category ? ` in ${category.label}` : ""}`;
  } else if (category) {
    title = category.label;
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Header>
        <Title>{title}</Title>
        <ResultCount role="status">
          {results.length} {results.length === 1 ? "product" : "products"}
        </ResultCount>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select defaultValue="" aria-label="Color">
              <Option value="" disabled>
                Color
              </Option>
              <Option>Black</Option>
              <Option>Grey</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Teal</Option>
              <Option>White</Option>
            </Select>
            <Select defaultValue="" aria-label="Size">
              <Option value="" disabled>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select aria-label="Sort products">
              <Option>New Arrivals</Option>
              <Option>Price (low to high)</Option>
              <Option>Price (high to low)</Option>
            </Select>
          </Filter>
        </FilterContainer>
      </Header>
      {results.length > 0 ? (
        <Products items={results} />
      ) : (
        <NoResults>
          {query ? `No products match “${query}”.` : "No products here yet."}
          <br />
          <Link to="/productlist">See all products</Link>
        </NoResults>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
