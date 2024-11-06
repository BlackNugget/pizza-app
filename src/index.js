import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Header() {
  return (
    <header className="header">
      <h1>Darren's Night</h1>
    </header>
  );
}

function Pizza({ name, description, price, image, soldOut, onAddToCart, onToggleFavorite, isFavorite }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <span>{soldOut ? "Sold Out" : `$${price}`}</span>
        <button onClick={() => onAddToCart(name, price)} disabled={soldOut} className="btn add-cart">
          Add to Cart
        </button>
        <button onClick={() => onToggleFavorite(name)} className={`btn favorite ${isFavorite ? "favorite-active" : ""}`}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </li>
  );
}

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (name, price) => {
    setCart([...cart, { name, price }]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleToggleFavorite = (name) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(name) ? prevFavorites.filter((fav) => fav !== name) : [...prevFavorites, name]
    );
  };

  return (
    <div className="container">
      <Header />
      <Menu favorites={favorites} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} />
      <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
      <Favorites favorites={favorites} />
      <Footer isCartEmpty={cart.length === 0} />
    </div>
  );
}

function Menu({ favorites, onAddToCart, onToggleFavorite }) {
  const pizzas = [
    { name: "Seven Delight Sushi", description: "Salmon makizushi, nigirizushi, lemon, lime, rice, seaweed, and soya sauce", price: 25, image: "pizzas/sushiplate.jpeg" },
    { name: "Midnight Grilled Salmon", description: "Salmon, broccoli, tomato, chimes and balsamic glaze", price: 18, image: "pizzas/salmon.jpg" },
    { name: "Nova Scotia Lobster Roll", description: "Tomato, mozzarella, ham, arugula, and burrata cheese", price: 46, image: "pizzas/lobster.jpeg" },
    { name: "Funghi", description: "Grilled Lemon, bread, lobster, and chips", price: 31, image: "pizzas/funghi.jpg", soldOut: true },
    { name: "Seared Scallops", description: "Scallops, chimes, and olive oil", price: 29, image: "pizzas/scallops.jpeg" },
    { name: "Truffle Fries", description: "Potato, ranch, shredded cheese, and truffle", price: 8, image: "pizzas/fries.jpg" },
    { name: "Choco Pizza", description: "Chocolate spread, M&Ms, and nuts", price: 23, image: "pizzas/chocopizza.jpeg" },
    { name: "Wagyu Beef", description: "A4 Wagyu Beef, carrot, lettuce, secret sauce, and sesame seed", price: 162, image: "pizzas/beef.jpg" },
    { name: "Skibidi Pizza", description: "Tomato, chicken, chocolate, white chocolate, and mozzarella", price: 42, image: "pizzas/skibidi.webp" },
    { name: "Cheeseburger", description: "beef, lettuce, cucumber, tomato, egg, and cheese", price: 27, image: "pizzas/cheeseburger.jpg" },
    { name: "Grilled Chicken Salad", description: "Chicken, lettuce, tomato, and olive oil", price: 16, image: "pizzas/grilledchicken.avif" },
    { name: "Avocado Salad", description: "Avocado, tomato, cucumber, and sunflower seeds", price: 22, image: "pizzas/avocado.png" },
  ];

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzas.map((pizza, index) => (
          <Pizza
            key={index}
            {...pizza}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(pizza.name)}
          />
        ))}
      </ul>
    </main>
  );
}

function Cart({ cart, onRemoveFromCart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => onRemoveFromCart(index)} className="btn remove-cart">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
    </section>
  );
}

function Favorites({ favorites }) {
  return (
    <section className="favorites">
      <h2>Your Favorites</h2>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => <li key={index}>{favorite}</li>)
        ) : (
          <p>No favorites added yet.</p>
        )}
      </ul>
    </section>
  );
}

function Footer({ isCartEmpty }) {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 10 && currentHour <= 22;

  return (
    <footer className="footer">
      <div className="order">
        <p>{isOpen ? "We're currently open" : "Sorry, we're closed"}</p>
        {!isCartEmpty && isOpen && (
          <button className="btn order-now">Order Now</button>
        )}
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
