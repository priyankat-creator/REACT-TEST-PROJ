import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ControlledSearch from "./ControlledSearch";

function ProductsPanel({
  ProductsList,
  addToCartHandler,
  removeFromCartHandler,
  cart
}) {

   // STATE COLOCATION
  const [search,setSearch] = useState("");

  // DERIVED FILTERED PRODUCTS
  const filteredProductsList = ProductsList.filter((searchProduct)=>(
    searchProduct.name
    .toLowerCase()
    .includes(search.toLowerCase())
  ))

  return (
    <>
    <ControlledSearch
   search={search}
   setSearch={setSearch}
/>

    <section id="products" className="container">

      

      {/* {ProductsList.map((prod) => ( */}
       {filteredProductsList.map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          addToCartHandler={addToCartHandler}
          removeFromCartHandler={removeFromCartHandler}
          cart={cart}
        />
      ))}
    </section>
    </>
  );
}

export default ProductsPanel;
