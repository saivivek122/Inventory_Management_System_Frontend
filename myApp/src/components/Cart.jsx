// import { useCart } from "../context/CartContext";
// import { Button } from "@mui/material";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useCart();

//   if (cartItems.length === 0) {
//     return <p>Your cart is empty</p>;
//   }

//   return (
//     <div className="cart">
//       <h2 className="cart-text">Your Cart</h2>
//     <div className="cart-box">
      
//       {cartItems.map(item => (
//         <div className="cart-items" key={item._id}>
//           <p>{item.name} - ₹{item.price}</p>
//           <button onClick={() => removeFromCart(item._id)}>
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Cart;
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const [open, setOpen] = useState(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Your cart is empty 🛒
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Your Cart
      </Typography>

      {cartItems.map(item => (
        <Card key={item._id} sx={{ mb: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Typography fontWeight="bold">
                {item.name}
              </Typography>
              <Typography color="text.secondary">
                ₹{item.price} each
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => decreaseQuantity(item._id)}
              >
                −
              </Button>

              <Typography>{item.quantity}</Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => increaseQuantity(item._id)}
              >
                +
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "right" }}>
              <Typography fontWeight="bold">
                ₹{item.price * item.quantity}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h6">Total Amount</Typography>
        <Typography variant="h6" fontWeight="bold">
          ₹{cartTotal}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
        >
          Checkout
        </Button>
      </Box>

      {/* ---------- CHECKOUT MODAL ---------- */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <Typography>
            Total amount to pay: <b>₹{cartTotal}</b>
          </Typography>
          <Typography mt={1} color="text.secondary">
            This is a demo checkout (no payment gateway).
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              alert("Order placed successfully 🎉");
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
