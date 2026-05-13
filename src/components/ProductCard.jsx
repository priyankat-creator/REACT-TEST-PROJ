import React, { useState } from "react";
// DUMB / PRESENTER COMPONENT
const ProductCard = ({ product, addToCartHandler, removeFromCartHandler,
  cart, }) => {
  const [isWishList, setWishList] = useState(false);
  const [msg, setMsg] = useState("");

  //state colocation
  const wishListHandler = () => {
    setWishList((isW) => !isW);
    setMsg((isW) => (isW ? "Removed from Wishlist":"Added to WishList" ));
  };
  // if(Math.random() > 0.5 )
  //       throw new Error("Product Failed");

  const [price, setPrice] = useState(product.price);

  const originalPrice = product.price; //original price always preserved:

  const discHandler = (applyDiscount) => {
    const discAmt = (originalPrice * applyDiscount) / 100;

    const newPrice = Math.round(originalPrice - discAmt);

    setPrice(newPrice);
    setMsg("Dicsount will be Applied at checkout.");
  };

  const ooStckMsg = (
    <p
      style={{
        color: "red",
        fontSize: "25px",
      }}
    >
      Out of Stock
    </p>
  );
  let ratingDisplay = "";
  if (product.rating === 1) {
    ratingDisplay = "⭐☆☆☆☆";
  } else if (product.rating == 2) {
    ratingDisplay = "⭐⭐☆☆☆";
  } else if (product.rating == 3) {
    ratingDisplay = "⭐⭐⭐☆☆";
  } else if (product.rating == 4) {
    ratingDisplay = "⭐⭐⭐⭐☆";
  } else if (product.rating == 5) {
    ratingDisplay = "⭐⭐⭐⭐⭐";
  }
const cartItem =
cart.find(item => item.id === product.id);

const qty = cartItem ? cartItem.qty : 0;


  return (
    <div className="card">
      <img
        src={product.imgSrc}
        alt="product"
        width="150px"
        height="150px"
      ></img>
      <h2>{product.name}</h2>
      <p>₹{price}/-</p>
      <p>{ratingDisplay}</p>

      {/* condiitonal rendering */}
      
      {product.isAvailable ? (
        <button
          onClick={() => {
            addToCartHandler(product);
            setMsg("item added to cart");
          }}
        >
          Add to Cart
        </button>
      ) : (
        <h2>Out of Stock</h2>
      )}

      {/* {product.isAvailable ? (

  qty === 0 ? (

    <button onClick={()=>{
      addToCartHandler(product);
      setMsg("Item Added To Cart");
    }}>
      Add To Cart
    </button>

  ) : (

    <div className="qty-container">

      <button
      onClick={() => addToCartHandler(product)}>
        +
      </button>

      <span>{qty}</span>

      <button
      onClick={() =>
      removeFromCartHandler(product.id)}>
        -
      </button>

    </div>

  )

) : (
  <h2>Out Of Stock</h2>
)} */}

      <button onClick={wishListHandler}>{isWishList ? "❤️" : "🤍"}</button>
      <p style={{ color: "blue", fontWeight: "bold" }}>{msg}</p>
    </div>
  );
};

export default ProductCard;
