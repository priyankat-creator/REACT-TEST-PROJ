import React,{useRef, useState} from 'react'

function Uncontrolledcoupon({setCouponMsg,setCouponDiscountAmount,cartTotal}) 
{

    const couponRef =  useRef()


    function applyCoupon()
    {
//closure as memory state
        const couponCode = couponRef.current.value.trim().toUpperCase();
        if(couponCode === ''){
            setCouponMsg("⚠️ Please enter a coupon");
            couponRef.current.focus();   // bring cursor back
            return;
          
        }
        if(couponCode === "SAVE10"){
            const discAmt = cartTotal * 0.10;
            setCouponDiscountAmount(discAmt);
            setCouponMsg("10% coupon applied  successfully")
        }
        else{
            setCouponDiscountAmount(0)
            setCouponMsg('Invalid Coupon')
             // focus again for retry
      couponRef.current.focus();
    }
    // ✅ Clear input after submit
    couponRef.current.value = "";

        }

    
    
  return (
    <div>
       {/*
        ✅ UNCONTROLLED INPUT

        - No value prop
        - No onChange
        - React is NOT tracking typing
        - Value accessed via ref

        ✅ autoFocus:
        - Cursor automatically appears when component loads
      */}
      <input
        type="text"
        ref={couponRef}
        placeholder="Enter coupon (SAVE10)"
        autoFocus
        style={{ padding: "8px", marginRight: "10px" }}
      />

      {/*
        ✅ Button triggers logic

        - Reads value using ref
        - Updates lifted state (App)
      */}
      <button onClick={applyCoupon}>
        Apply Coupon
      </button>
      
    </div>
  )
}

export default Uncontrolledcoupon
