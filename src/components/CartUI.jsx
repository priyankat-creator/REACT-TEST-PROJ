import React from 'react'
//CART RENDERING
function CartUI({
  cart,
  cartTotal,
  addToCartHandler,
  removeFromCartHandler
}) 
{
  return (
    <div className='cart-card'>
      <h1>🛒 Cart</h1>
      {
        cart.map((cartItem)=>(
            <div className='container' key = {cartItem.id}>
                <h2> {cartItem.name}</h2>
                <p>
                    ₹{cartItem.price} × {cartItem.qty}

                </p>
            <button
onClick={() => addToCartHandler(cartItem)}>
   +
</button>

<button
onClick={() =>
removeFromCartHandler(cartItem.id)}>
   -
</button>


            </div>

        ))

      }

      <h2>Total: ₹{cartTotal}</h2>
    </div>
  )
}

export default CartUI
