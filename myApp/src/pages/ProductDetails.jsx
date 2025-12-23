import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSingleProduct() {
    try {
      let res = await axios.get(` https://inventory-management-system-backend-qi6b.onrender.com/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  function handleEdit() {
    navigate(`/products/${id}/edit`);
  }

  async function handleDelete() {
    try {
      let res = await axios.delete(` https://inventory-management-system-backend-qi6b.onrender.com/products/${id}`);
      setMessage(res.data.message);
      navigate("/products");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    handleSingleProduct();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-details" style={{ display: "flex", justifyContent: "center",alignItems:"center",height:"80vh"}}>
      {message}

      {product ? (
        <Card id="product-details-card" sx={{ maxWidth: 400, padding: 2 ,width:"100%",boxShadow:"0px 4px 8px 0 #8F8F8F"}}>
      

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>

            <Typography sx={{ marginTop: 1 }}>
              <b>Category:</b> {product.category}
            </Typography>

            <Typography sx={{ marginTop: 1 }}>
              <b>Price:</b> ₹{product.price}
            </Typography>

            <Typography sx={{ marginTop: 1 }}>
              <b>Stock:</b> {product.stock}
            </Typography>
          </CardContent>

          {user.role === "admin" && (
            <CardActions>
              <Button size="small" variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      ) : (
        <p>No Product Found</p>
      )}
    </div>
  );
};

export default ProductDetails;
