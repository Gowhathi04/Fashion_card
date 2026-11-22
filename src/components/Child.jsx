import "./Child.css";

const Child = ({ product, isWishlisted, onAddToCart, onToggleWishlist }) => {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} />
        <span className="category-tag">{product.category}</span>
        <button
          type="button"
          className={`heart-button ${isWishlisted ? "selected" : ""}`}
          aria-label={`${isWishlisted ? "Remove" : "Add"} ${product.title} ${isWishlisted ? "from" : "to"} wishlist`}
          onClick={() => onToggleWishlist(product.id)}
        >
          {isWishlisted ? "\u2665" : "\u2661"}
        </button>
      </div>
      <div className="product-details">
        <div>
          <h3>{product.title}</h3>
          <p>₹{product.cost}</p>
        </div>
        <button type="button" className="add-button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Child;