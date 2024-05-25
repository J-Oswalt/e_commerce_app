import React, { useState } from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap';
import AlertMessage from '../components/AlertMessage';
import AdminProductListPage from './AdminProductListPage';

function AddProductPage() {
    const [name, setName] = useState(""); 
    const [price, setPrice] = useState(""); 
    const [image, setImage] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [category, setCategory] = useState(""); 
    const [quantity, setQuantity] = useState("");
    const [addProduct, setAddProduct] = useState(true);
    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(false);
    const products = JSON.parse(localStorage.getItem("products")) || [];
   // const categories = JSON.parse(localStorage.getItem("categories")) || [];

    const handleNameChange = (e) => {
        setError("")
        setName(e.target.value);
    };
    const handlePriceChange = (e) => {
        setError("")
        setPrice(e.target.value);
    };
    const handleImageChange = (e) => {
        setError("")
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        }
        reader.readAsDataURL(file);
    };
    const handleDescriptionChange = (e) => {
        setError("")
        setDescription(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setError("")
        setCategory(e.target.value);
    };
    const handleQuantityChange = (e) => {
        setError("")
        setQuantity(e.target.value);
    };
  
    function handleShowProducts(e) {
        e.preventDefault();
        setError("")
        setAddProduct(false);
    }
    function createProduct(e) {
        e.preventDefault();
        let newProduct = {
            id: products.length + 1,
            name: name,
            description: description,
            price: parseFloat(price),
            category: category,
            quantity: parseFloat(quantity),
            image: image,
        };
        products.push(newProduct)
        localStorage.setItem('products', JSON.stringify(products));
        setSuccess("Product added successfully!");
    }

    return (
        <>
    {addProduct && (
        <Container>
            {success && <AlertMessage variant='success' message={success}></AlertMessage>}
            <Button variant='primary' className='mb-3' onClick={(e) => handleShowProducts(e)}> Show Product List!</Button>
            <Container>
                {image && (
                    <div className='text-center'>
                        <Image src={image} width={200} height={200} rounded></Image>
                    </div>
                )}
            </Container>
            <Form onSubmit={createProduct}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product name"
                            value={name}
                            onChange={(e) => handleNameChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => handleDescriptionChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => handlePriceChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            placeholder="Product Quantity"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product Category"
                            value={category}
                            onChange={(e) => handleCategoryChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image:</Form.Label>
                        <Form.Control
                            type="file"
                            value={image}
                            onChange={(e) => handleImageChange(e)}>
                        </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>
                   {" "} Add Product {" "} 
                </Button>
            </Form>

        </Container>
    )}
    {!addProduct && <AdminProductListPage></AdminProductListPage>}
    {error && <AlertMessage variant='danger' message={error}></AlertMessage>}

    
    </>
  )
}

export default AddProductPage