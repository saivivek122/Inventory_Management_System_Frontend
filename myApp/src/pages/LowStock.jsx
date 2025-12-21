import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../styles/styles.css"
const LowStock = () => {
  const[products,setProducts]=useState();
  const [loading,setLoading]=useState(true);

 async function handleLowStockProducts(){
  try{
    let res=await axios.get(` https://inventory-management-system-backend-qi6b.onrender.com/products/low-stock`);
    console.log(res.data)
    setProducts(res.data)
    setLoading(false)
  }
  catch(error){
    console.log("Error",error)
  }
 }
 useEffect(()=>{
    handleLowStockProducts()
 },[])
 if(loading)return <p>Loading...</p>
  return (
    <div>
      LowStock page

      {products.length>0 ?products.map((item)=>(
         <div className="product-container low-stock-products" key={item._id} onClick={()=>handleSingleProduct(item._id)}>
              <h3>{item.name}</h3>
              <div className="category">
                <p>
                  <b>Category:</b>
                </p>
                <p>{item.category}</p>
              </div>
              <div className="price-stock">
                <p>
                  <b>₹</b>
                  {item.price}
                </p>
                <p>
                  <b>Available:</b>
                  {item.stock}
                </p>
              </div>
              <p>{item.description}</p>
            </div>
      )):<p>No Products</p>}

    </div>
  )
}

export default LowStock
