import { useEffect, useState } from "react";
import { mockApi } from "./mockAPI";

// Item component to display products and handle adding to cart
export default function Item({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  // Fetch products from the mock API       
  useEffect(() => {
    async function fetchProducts() {
      const data = await mockApi.getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Handler for adding to cart with alert
  const handleAddToCart = (product) => {
    onAddToCart(product); // Call parent function to update cart
    alert(`${product.name} was successfully added to your cart!`);
  };

  return (
    <div>
      {/* Render the list of products */}
      <h2>Products</h2>
      {products.map((product) => (
        <p key={product.id}>
          {product.name} - ${product.price.toFixed(2)}{" "}
          <br />
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </p>
      ))}
    </div>
  );
}
