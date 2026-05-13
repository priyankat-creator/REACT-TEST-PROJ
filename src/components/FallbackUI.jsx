import React from 'react'

function FallbackUI() {

  return (

    <div
    style={{

      padding:"20px",
      margin:"20px",
      border:"2px solid red",
      borderRadius:"10px",
      backgroundColor:"#ffe6e6"

    }}>

      <h2>
        ⚠️ Products Failed To Load
      </h2>

      <p>
        Something went wrong while
        loading products.
      </p>
 {/* retry or  reload */}
      <button
      onClick={() =>
      window.location.reload()}>   
             Reload Page

      </button>

    </div>

  )
}

export default FallbackUI