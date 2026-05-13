import { useState, useEffect } from "react";

// checkout uses derived cart total
const Checkout = ({ cartTotal }) => {

  const [form, setForm] = useState({
    name: "",
    address: "",
    delivery: "",
    payment: "",
    terms: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // LOAD FORM FROM SESSION STORAGE
  useEffect(() => {

    const savedForm =
      sessionStorage.getItem("checkoutForm");

    if (savedForm) {

      setForm(JSON.parse(savedForm));

    }

  }, []);

  // SAVE FORM TO SESSION STORAGE
  useEffect(() => {

    sessionStorage.setItem(
      "checkoutForm",
      JSON.stringify(form)
    );

  }, [form]);

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value
    }));

  };

  const handleSubmit = (e) => {

  e.preventDefault();

  setError("");
  setSuccess("");

  if (
    form.name.trim() === "" ||
    form.address.trim() === ""
  ) {
    setError("Fill all fields");
    return;
  }

  if (form.delivery === "") {
    setError("Select delivery type");
    return;
  }

  if (form.payment === "") {
    setError("Select payment method");
    return;
  }

  if (!form.terms) {
    setError("Accept terms");
    return;
  }

  setSuccess(
    "Order Placed Successfully ✅"
  );

  sessionStorage.removeItem(
    "checkoutForm"
  );

  setForm({
    name: "",
    address: "",
    delivery: "",
    payment: "",
    terms: false
  });

};

  return (

    <section id="checkout">

      <h2 style={{textAlign:"center"}}>Checkout</h2>

      <h3 style={{textAlign:"center",color:"blueviolet"}}>
        Total Amount:
        ₹{Math.round(cartTotal)}
      </h3>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        {/* ADDRESS */}
        <textarea
          name="address"
          placeholder="Enter address"
          value={form.address}
          onChange={handleChange}
        />

        <br /><br />

        {/* DELIVERY */}
        <select
          name="delivery"
          value={form.delivery}
          onChange={handleChange}
        >

          <option value="">
            Select Delivery
          </option>

          <option value="Standard">
            Standard Delivery
          </option>

          <option value="Express">
            Express Delivery
          </option>

          <option value="SameDay">
            Same Day Delivery
          </option>

        </select>

        <br /><br />

        {/* PAYMENT */}
        <p>Payment Method:</p>

        <label>

          <input
            type="radio"
            name="payment"
            value="COD"
            checked={
              form.payment === "COD"
            }
            onChange={handleChange}
          />

          COD

        </label>

        <label>

          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={
              form.payment === "UPI"
            }
            onChange={handleChange}
          />

          UPI

        </label>

        <br /><br />

        {/* TERMS */}
        <label>

          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />

          Accept Terms

        </label>

        <br /><br />

        <button type="submit">
          Place Order
        </button>
        {
        error &&
        <p style={{ color:"red" }}>
          {error}
        </p>
      }

      {
        success &&
        <p style={{ color:"green" }}>
          {success}
        </p>
      }

      </form>

      

    </section>

  );
};

export default Checkout;