import { useState } from 'react';
import './App.css';
import Child from './components/Child';

import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";

const products = [
  { id: 1, image: image1, title: "Jeans", cost: 500, category: "Casual" },
  { id: 2, image: image2, title: "Tank Top", cost: 600, category: "Western" },
  { id: 3, image: image3, title: "Trousers", cost: 700, category: "Traditional" },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const categories = ["All", "Casual", "Traditional", "Western"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.includes(productId)
        ? currentWishlist.filter((id) => id !== productId)
        : [...currentWishlist, productId]
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="MY Fashion Store home">
          <span>MY</span> Fashion Store
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#wishlist">Wishlist <b>{wishlist.length}</b></a>
          <a href="#cart">Cart <b>{cartCount}</b></a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">NEW SEASON EDIT</p>
            <h1>Style that feels<br />like <em>you.</em></h1>
            <p>Discover everyday pieces with a polished, effortless look.</p>
            <a className="shop-button" href="#products">Shop collection</a>
          </div>
        </section>

        <section className="shop-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Our Collection</h2>
            </div>
            <label className="search-box">
              <span aria-hidden="true">&#9906;</span>
              <input
                type="search"
                placeholder="Search outfits"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
          </div>

          <div className="category-filters" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products">
              {filteredProducts.map((product) => (
                <Child
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">No outfits match your search.</p>
          )}
        </section>

        <section className="store-panels">
          <div className="panel wishlist-panel" id="wishlist">
            <div className="panel-heading">
              <h2>Wishlist</h2>
              <span>{wishlist.length} items</span>
            </div>
            {wishedProducts.length === 0 ? (
              <p className="empty-state">Your wishlist is empty. Tap the heart on an outfit you love.</p>
            ) : (
              <div className="wishlist-list">
                {wishedProducts.map((product) => (
                  <div className="wishlist-item" key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <div>
                      <h3>{product.title}</h3>
                      <p>₹{product.cost}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.title} from wishlist`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      &#9829;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel cart-panel" id="cart">
            <div className="panel-heading">
              <h2>Your Cart</h2>
              <span>{cartCount} items</span>
            </div>
            {cart.length === 0 ? (
              <p className="empty-state">Your cart is empty. Add an outfit to get started.</p>
            ) : (
              <>
                <div className="cart-list">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p>₹{item.cost}</p>
                        <div className="quantity-controls">
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.title} quantity`}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.title} quantity`}>+</button>
                        </div>
                      </div>
                      <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>₹{cartTotal}</strong>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default App;