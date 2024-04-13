import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";
import SearchBar from "../components/Searchbar";
import { useState } from "react";

const ProductsListPage = () => {
  const [productsList, setProductsList] = useState(products);
  const [searchbarValue, setSearchbarValue] = useState("");

  console.log(productsList);

  const searchProducts = (event) => {
    event.preventDefault();
    setSearchbarValue(event.target.value);
    console.log(searchbarValue);

    productsList.filter((product) => {
      console.log(product.name.toLowerCase().includes(searchbarValue.toLowerCase()));
    });

    let productsListFiltered = products.filter((product) => {
      if(product.name.toLowerCase().includes(searchbarValue.toLowerCase())){
        return true;
      }
      return false;
    });

    console.log(productsListFiltered);

    setProductsList(productsListFiltered);

    if (searchbarValue === "") {
      setProductsList(products);
    }
  };

  return (
    <>
      <SearchBar
        handler={setSearchbarValue}
        searchBarValue={searchbarValue}
        searchProductsFunction={searchProducts}
      />
      <Row>
        {productsList.map((product) => (
          <Col key={product.id} md={6} sm={12} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductsListPage;
