import React, { useState, useEffect } from "react";
import ProductsPanel from "./components/ProductsPanel";
import ProductsList from "./components/ProductsList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Home from "./components/Home";
import Contact from "./components/Contact";
import CartUI from "./components/CartUI";
import Checkout from "./components/Checkout";
import Uncontrolledcoupon from "./components/Uncontrolledcoupon";
import ErrorBoundary from "../../errorboundary/src/ErrorBoundary";
import Login from "./components/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isDark, setDark] = useState(false);

  const [cart, setCart] = useState([]);

  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  // Load only if dark
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDark(true);
    }
  }, []);

  //  Toggle + save
  const toggleThemeHandler = () => {
    setDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  //product is which we  wish to add to cart
  const addToCartHandler = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    //find returns that obj from list of it  exists--
    //item already incart--update qty {id:1,qty:3},
    if (existingProduct) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem,
      );
      //if not matches keep other items as it is cartItem

      setCart(updatedCart);
    }
    //item not there in cart  {id:2,qty:1}  add fresh product to cart
    else {
      setCart([
        ...cart,
        { ...product, qty: 1 },
        //add this fresh product obj with qty as 1 to cart []
      ]);
    }
  };
  const removeFromCartHandler = (id) => {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem,
      )
      //after qty -1 if qty becomes  zero , filter/remove  them frm cart[]
      .filter((cartItem) => cartItem.qty > 0);
    //keep only  cart items  with qty >0

    setCart(updatedCart);
  };
  //DERIVED STATE
  const cartTotalBeforeCouponDisc = cart.reduce(
    (sumAcc, currCartItem) => sumAcc + currCartItem.price * currCartItem.qty,
    0,
  );

  const finalPriceAfterCouponDisc =
    cartTotalBeforeCouponDisc - couponDiscountAmount;

  return (
    <div className={isDark ? "app dark" : "app light"}>
      <button onClick={toggleThemeHandler}>
        Switch to {isDark ? "Light" : "Dark"}
      </button>
      <BrowserRouter>
        <Header />  
         {/* outside  routes written so header  shown on every page */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HeroSection />} />
          <Route path="/header" element={<Header />} />

          <Route path="/home" element={<Home />} />

          <Route
            path="/products"
            element={
              <ErrorBoundary>
                <ProductsPanel
                  ProductsList={ProductsList}
                  addToCartHandler={addToCartHandler}
                  removeFromCartHandler={removeFromCartHandler}
                  cart={cart}
                />{" "}
              </ErrorBoundary>
            }
          />

          {/* CART SUMMARY */}
          {cart.length > 0 && (
            <Route
              path="/cart"
              element={
                <>
                  <CartUI
                    cart={cart}
                    cartTotal={finalPriceAfterCouponDisc}
                    addToCartHandler={addToCartHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />

                  <Uncontrolledcoupon
                    setCouponMsg={setCouponMsg}
                    setCouponDiscountAmount={setCouponDiscountAmount}
                    cartTotal={finalPriceAfterCouponDisc}
                  />

                  <h3>{couponMsg}</h3>

                  {finalPriceAfterCouponDisc > 0 && (
                    <Checkout cartTotal={finalPriceAfterCouponDisc} />
                  )}
                </>
              }
            />
          )}

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
