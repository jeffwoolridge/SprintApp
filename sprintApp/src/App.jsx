import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Item from "./components/Item.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Home from "./components/Home.jsx"; 
import './App.css';

// Main App component
export default function App() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Functions to manage the cart
  const clearCart = () => setCart([]);
  const removeItem = (id) => setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  
  // Function to update item quantity in the cart
  const updateQuantity = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Main render function
  return (
    // Using React Router for navigation
    <Router>
      <nav>
        <Link to="/home">Home</Link> | 
        <Link to="/">Products</Link> | 
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home onAddToCart={addToCart} />} /> 
        <Route path="/" element={<Item onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onClearCart={clearCart}
              onRemoveItem={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}
