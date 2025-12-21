import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "../styles/styles.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const EditProduct = () => {
  const {id}=useParams();
  const [name,setName]=useState();
  const [price,setPrice]=useState();
  const [stock,setStock]=useState();
  const [category,setCategory]=useState();
  const [description,setDescription]=useState();
  const [loading,setLoading]=useState(true)
  const [message,setMessage]=useState()
  const navigate=useNavigate()
  
  async function handleSingleProduct(){
    try{
      let res=await axios.get(`http://localhost:3000/products/${id}`);
      let product=res.data;
      setName(product.name);
      setPrice(product.price)
      setStock(product.stock);
      setCategory(product.category);
      setDescription(product.description);
      setLoading(false)
    }
    catch(error){
      console.log("Error",error)
      setLoading(false)
    }
  }
  function handleEdit(value,field){
    if(field=="name"){
      setName(value)
    }
    if(field=="price"){
      setPrice(value)
    }
    if(field=="stock"){
      setStock(value)
    }
    if(field=="category"){
     setCategory(value)
    }
    if(field=="description"){
      setDescription(value)
    }


  }
  async function addEditProduct(){
      if(name.trim()=="" ||price.toString().trim()=="" ||stock.toString().trim()=="" ||category.trim()=="" ||description.trim()==""){
      console.log("required")
      setMessage("All Fields are required");
      return
    }
    try{
      let res=await axios.put(`http://localhost:3000/products/${id}`,{
        name:name,
        price:Number(price),
        stock:Number(stock),
        category:category,
        description:description
      })
      setMessage(res.data)
      navigate(`/products/${id}`)
      
    }
    catch(error){
      console.log(error)
      setMessage(error)
    }
  }

  useEffect(()=>{
    handleSingleProduct()
      
  },[])
  if(loading)return <p>Loading...</p>
  return (
    <div>
     <h3 className='edit-product-text'>Edit Product </h3> 
     <p className='edit-product-message'> {message}</p>
      <div className='edit-product'>
      <input placeholder='name' value={name} onChange={(e)=>handleEdit(e.target.value,"name")}/>
      <input placeholder='price' value={price} onChange={(e)=>handleEdit(e.target.value,"price")}/>
      <input placeholder='stock' value={stock} onChange={(e)=>handleEdit(e.target.value,"stock")}/>
      <input placeholder='category' value={category} onChange={(e)=>handleEdit(e.target.value,"category")}/>
      <input placeholder='description' value={description} onChange={(e)=>handleEdit(e.target.value,"description")}/>
      <button onClick={addEditProduct}>Submit</button>
      
      </div>
    </div>
  )
}

export default EditProduct
