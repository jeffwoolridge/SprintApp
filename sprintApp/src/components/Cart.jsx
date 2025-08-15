import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, onRemoveItem, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} × {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
              <div className="button">
              <button onClick={() => onUpdateQuantity(item.id, "increase")}>+ </button>
              <button onClick={() => onUpdateQuantity(item.id, "decrease")}>-  </button>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${total.toFixed(2)}</h3>
    
      <div style={{ marginTop: "10px" }}>
        <button>
          <Link to="/">Continue Shopping</Link>
        </button>
        <button>
          <Link to="/checkout">Proceed to Checkout</Link>
        </button>
      </div>
    </div>
  );
}
