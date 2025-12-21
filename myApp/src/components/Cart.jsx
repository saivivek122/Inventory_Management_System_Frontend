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
import { useCart } from "../context/CartContext";
import { Button } from "@mui/material";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
   
  } = useCart();

  if (cartItems.length === 0) {
    return <h3>Your cart is empty</h3>;
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => (
        <div
          key={item._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "10px"
          }}
        >
          <p style={{ width: "150px" }}>{item.name}</p>
          <p>₹{item.price}</p>

          <Button
            variant="outlined"
            onClick={() => decreaseQuantity(item._id)}
          >
            −
          </Button>

          <p>{item.quantity}</p>

          <Button
            variant="outlined"
            onClick={() => increaseQuantity(item._id)}
          >
            +
          </Button>

          <p>
            Total: ₹{item.price * item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
