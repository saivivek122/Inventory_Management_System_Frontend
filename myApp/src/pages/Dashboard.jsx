import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chart from "./ChartJs";
import ChartJs from "./ChartJs";
const Dashboard = () => {
  const [productStats, setProductStats] = useState();
  const [loading, setLoading] = useState(true);
  async function handleProductStats() {
    try {
      const res = await axios.get(`https://inventory-management-system-backend-qi6b.onrender.com/products/stats`);
      setProductStats(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log("Error", err);
    }
  }
  useEffect(() => {
    handleProductStats();
  }, []);
  if (loading) return <div className="loader"></div>;
  return (
    <div className="dash-board-container">
      <div className="left-container">
       <p className="overview-text">Overview</p>
        <p>
          <p>{productStats.totalProducts}</p>
          <b>Total Products</b>
        </p>

        <p>
          <p className={productStats.totalStock < 3000 && "low-stock"}>
            {productStats.totalStock}
          </p>
          <b>Total Stock </b>
        </p>

        <p>
          <p> {productStats.totalValue}</p>

          <b>Total Value </b>
        </p>
        <p>
          <p>{productStats.averagePrice}</p>
          <b>Average Price </b>{" "}
        </p>
      </div>
    
        <div className="right-container-one">
        {productStats ? (
             <Card
               sx={{
                 maxWidth: 600,
                 padding: 2,
                 width: "100%",
                 boxShadow: "0px 4px 8px 0 #8F8F8F",
                backgroundColor:"transparent",
                border:"1px solid #8F8F8F"
               }}
             >
               <CardContent>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Least Expensive Product</Typography>
                 <Typography gutterBottom variant="p" component="div">
                   {productStats.leastExpensive.name}
                 </Typography>

                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
                   {productStats.leastExpensive.description}
                 </Typography>

                 <Typography sx={{ marginTop: 1 }}>
                   <b>Category:</b> {productStats.leastExpensive.category}
                 </Typography>

                 <Typography sx={{ marginTop: 1 }}>
                   <b>Price:</b> ₹{productStats.leastExpensive.price}
                 </Typography>

                 <Typography sx={{ marginTop: 1,color:productStats.leastExpensive.stock<5?"red":"green" }}>
                   <b style={{color:"black"}}>Stock:</b> {productStats.leastExpensive.stock}
                 </Typography>
               </CardContent>
             </Card>
       ) : (
            <p>No Product Found</p>
          )}
          </div>
          
      
      <div className="right-container-two">
          {productStats ? (
             <Card
               sx={{
                 maxWidth: 400,
                 padding: 2,
                 width: "100%",
                 boxShadow: "0px 4px 8px 0 #8F8F8F",
                 backgroundColor:"transparent",
                 border:"1px solid #8F8F8F"
                 
               }}
             >
               <CardContent>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Most Expensive Product</Typography>
                 <Typography gutterBottom variant="p" component="div">
                   {productStats.mostExpensive.name}
                 </Typography>

                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
                   {productStats.mostExpensive.description}
                 </Typography>

                 <Typography sx={{ marginTop: 1 }}>
                   <b>Category:</b> {productStats.mostExpensive.category}
                 </Typography>

                 <Typography sx={{ marginTop: 1 }}>
                   <b>Price:</b> ₹{productStats.mostExpensive.price}
                 </Typography>

                 <Typography sx={{ marginTop: 1,color:productStats.mostExpensive.stock<"5"?"red":"green" }}>
                   <b style={{color:"black"}}>Stock:</b> {productStats.mostExpensive.stock}
                 </Typography>
               </CardContent>
             </Card>
       ) : (
            <p>No Product Found</p>
          )}
          </div>
         <ChartJs/>
    </div>
  );
};

export default Dashboard;

{
  /* <div className="stats-container">
        <div className="least-expensive-product">
          
          <p>
            <h3 className="least-expensive-text">Least Expensive Product</h3>
            <p>{productStats.leastExpensive.name}</p>
            <b>Name</b> 
          </p>
          <p>
            <p>{productStats.leastExpensive.price}</p>
            <b>Price</b> 
          </p>
          <p>
            <p className={productStats.leastExpensive.stock<5 &&"low-stock"}>{productStats.leastExpensive.stock}</p>
            <b>Stock</b> 
          </p>
          <p>
            <p>{productStats.leastExpensive.category}</p>
            <b>Category</b> 
          </p>
          <p>
            <p> {productStats.leastExpensive.description}</p>
            <b>Description</b>
          </p>
        </div>
        <div className="most-expensive-product">
          <h3 className="most-expensive-text">Most Expensive Product</h3>
          <p>
            <p> {productStats.mostExpensive.name}</p>
            <b>Name</b>
          </p>
          <p>
            <p>{productStats.mostExpensive.price}</p>
            <b>Price</b> 
          </p>
          <p>
            <p className={productStats.mostExpensive.stock<5&&"low-stock"}>{productStats.mostExpensive.stock}</p>
            <b>Stock</b> 
          </p>
          <p>
            <p> {productStats.mostExpensive.category}</p>
            <b>Category</b>
          </p>
          <p>
            <p>{productStats.mostExpensive.description}</p>
            <b>Description</b> 
          </p>
        </div>
      </div> */
}

//  <div className="dashboard-container">
//       <h2 className="welcome-text">Welcome To Dashboard</h2>
//       <div className="product-details">
//         <div className="product-detail-card">
//           <h3 className="overview-text">Overview</h3>
//           <p>
//             <p>{productStats.totalProducts}</p>
//             <b>Total Products</b>{" "}
//           </p>

//           <p>
//             <p className={productStats.totalStock < 3000 && "low-stock"}>
//               {productStats.totalStock}
//             </p>
//             <b>Total Stock </b>
//           </p>

//           <p>
//             <p> {productStats.totalValue}</p>

//             <b>Total Value </b>
//           </p>

//           <p>
//             <p>{productStats.averagePrice}</p>
//             <b>Average Price </b>{" "}
//           </p>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "80vh",
//           }}
//         >
//           {productStats ? (
//             <Card
//               sx={{
//                 maxWidth: 400,
//                 padding: 2,
//                 width: "100%",
//                 boxShadow: "0px 4px 8px 0 #8F8F8F",
//               }}
//             >
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {productStats.leastExpensive.name}
//                 </Typography>

//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   {productStats.leastExpensive.description}
//                 </Typography>

//                 <Typography sx={{ marginTop: 1 }}>
//                   <b>Category:</b> {productStats.leastExpensive.category}
//                 </Typography>

//                 <Typography sx={{ marginTop: 1 }}>
//                   <b>Price:</b> ₹{productStats.leastExpensive.price}
//                 </Typography>

//                 <Typography sx={{ marginTop: 1 }}>
//                   <b>Stock:</b> {productStats.leastExpensive.stock}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ) : (
//             <p>No Product Found</p>
//           )}
//         </div>
//       </div>
//     </div>
