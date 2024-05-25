import React, { useState } from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import AddProductPage from "./AddProductPage";

function AdminProductListPage() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
  const [showProductList, setShowProductList] = useState(true);
  const handleAddProduct = (e) => {
    e.preventDefault();
    setShowProductList(false);    
  }
  const deleteProductHandler = (id) => {
    const productsLeft = products.filter((product) => product.id !== id);
    setProducts(productsLeft);
  }

  function fetchCategory(categoryId) {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoryObj = categories.find((category) => category.id === parseInt(categoryId));
    if (categoryObj){
        return categoryObj.name;
    }
    return categoryId;
  }
  return (
    <>
      {showProductList && (
        <Container>
          <Button
            variant="primary"
            className="my-3"
            onClick={(e) => handleAddProduct(e)}
          >
            Add Product.
          </Button>
          <Table striped hover bordered className="table-sm">
            <thead>
              <tr className="text-center">
                <th>Id</th>
                <th>Product</th>
                <th>Product Name</th>
                <th>Product Discription</th>
                <th>Product Category</th>
                <th>Product Price</th>
                <th>Stock Left</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, ind) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <Image src={product.image} width={200} height={200} alt='Loading Image...' rounded></Image>
                  </td>
                  <td>{product.discription}</td>
                  <td>{fetchCategory(product.category)}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Button variant="info" className="mb-3">
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mb-3"
                      onClick={() => deleteProductHandler(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

      )}
      {!showProductList && <AddProductPage></AddProductPage>}
    </>
  );
}

export default AdminProductListPage;
