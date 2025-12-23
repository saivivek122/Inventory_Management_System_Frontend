import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  Box
} from "@mui/material";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export default function UserBuy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  // 🔢 total cart items
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://inventory-management-system-backend-qi6b.onrender.com/products"
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    logoutUser();              // clear auth
    navigate("/login");        // redirect
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* ---------- USER NAVBAR ---------- */}
      <AppBar position="sticky" color="default" sx={{ mb: 3 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Shop
          </Typography>

          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              width: { xs: "100%", sm: "300px" }
            }}
          >
            <FaSearch color="gray" />
            <InputBase
              placeholder="Search products..."
              sx={{ ml: 1, flex: 1 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          {/* Right actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Cart */}
            <Box
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart size={22} />
              {totalCartItems > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -6,
                    right: -8,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {totalCartItems}
                </Box>
              )}
            </Box>

            {/* Logout */}
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleLogout}
              startIcon={<FaSignOutAlt />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ---------- PRODUCTS ---------- */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {filteredProducts.length === 0 ? (
          <Typography>No products found</Typography>
        ) : (
          filteredProducts.map(product => {
            const cartItem = cartItems.find(
              item => item._id === product._id
            );

            return (
              <Card key={product._id} sx={{ width: 300 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image="https://picsum.photos/300/200"
                  alt={product.name}
                />

                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography fontWeight="bold">
                    ₹{product.price}
                  </Typography>

                  {!cartItem ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => decreaseQuantity(product._id)}
                      >
                        −
                      </Button>
                      <Typography>{cartItem.quantity}</Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => increaseQuantity(product._id)}
                      >
                        +
                      </Button>
                    </Box>
                  )}
                </CardActions>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
