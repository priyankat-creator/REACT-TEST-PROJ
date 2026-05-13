import {Link} from 'react-router-dom'
function Header() {
  return (
    <header style={{ background: "black", color: "white", padding: "10px" }}>
      <h2>Smart Store</h2>

   <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: "15px 25px"
  }}
>

  {/* Left Links */}
  <div style={{ display: "flex", gap: "15px" }}>

    <Link
      to="/"
      style={{ color: "white", textDecoration: "none" }}
    >
      Home
    </Link>

    <Link
      to="/products"
      style={{ color: "white", textDecoration: "none" }}
    >
      Products
    </Link>

    <Link
      to="/cart"
      style={{ color: "white", textDecoration: "none" }}
    >
      Cart
    </Link>

    <Link
      to="/contact"
      style={{ color: "white", textDecoration: "none" }}
    >
      Contact
    </Link>

  </div>

  {/* Right Links */}
  <div style={{ display: "flex", gap: "15px" }}>

    <Link
      to="/login"
      style={{ color: "white", textDecoration: "none" }}
    >
      Login
    </Link>

    <Link
      to="/checkout"
      style={{ color: "white", textDecoration: "none" }}
    >
      Checkout
    </Link>

  </div>

</nav>
    </header>
  );
}

export default Header;