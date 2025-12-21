import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  async function addNewProduct() {
    console.log("New product");
    if(name.trim()=="" ||price.trim()=="" ||stock.trim()=="" ||category.trim()=="" ||description.trim()==""){
      console.log("required")
      setMessage("All Fields are required");
      return
    }
    try {
      let res = await axios.post(`http://localhost:3000/products`, {
        name: name,
        price: price,
        stock: stock,
        category: category,
        description: description,
      });
      console.log(res.data);
      setMessage(res.data);
      setLoading(false);
      navigate("/products")
      setName("");
      setPrice("");
      setStock("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.log("Error", error);
      setMessage(error);
      setLoading(false);
    }
  }
  function handleAddProduct(value, filed) {
    if (filed == "name") {
      setName(value);
    }
    if (filed == "price") {
      setPrice(value);
    }
    if (filed == "stock") {
      setStock(value);
    }
    if (filed == "category") {
      setCategory(value);
    }
    if (filed == "description") {
      setDescription(value);
    }
  }
  // useEffect(()=>{
  //   addNewProduct()
  // },[])
  // if(loading)return <p>Loading...</p>
  return (
    <div>
     <h3 className="add-product-text">AddProduct</h3> 
      <div className="add-new-product">
        <p className="add-product-message">{message}</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => handleAddProduct(e.target.value, "name")}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => handleAddProduct(e.target.value, "price")}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => handleAddProduct(e.target.value, "stock")}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => handleAddProduct(e.target.value, "category")}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => handleAddProduct(e.target.value, "description")}
        />
        <button onClick={addNewProduct}>Add</button>
      </div>
    </div>
  );
};

export default AddProduct;
