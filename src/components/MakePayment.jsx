import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePayment = () => {
  const img_url = "http://cyberspecter.alwaysdata.net/static/images/";
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("Please wait as we process your payment...");
    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/mpesa_payment",
        data
      );

      setMessage(response.data.message || "Payment successful!");
      setPhone(""); // Clear phone input after successful payment

      // Optional: Automatically clear success message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || err.message || "Payment failed");
    }
  };

  if (!product) {
    return <p className="text-center text-danger mt-5">No product selected!</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light py-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: 500, width: "100%", borderRadius: "15px" }}>
        <h2 className="text-center mb-3" style={{ color: "#C71585", fontWeight: "bold" }}>
          Lipa na Mpesa
        </h2>

        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="text-center mb-3">
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            style={{ maxHeight: 200, borderRadius: "10px", objectFit: "cover" }}
          />
        </div>

        <div className="text-center mb-3">
          <h5 style={{ fontWeight: "bold" }}>{product.product_name}</h5>
          <p>{product.product_description}</p>
          <p style={{ fontWeight: "bold" }}>Ksh {product.product_cost}</p>
        </div>

        <form onSubmit={submit}>
          <input
            type="tel"
            className="form-control mb-3 rounded-pill shadow-sm"
            placeholder="Enter phone number"
            required
            value={phone}
            style={{ borderColor: "#00BFFF" }}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="btn w-100 rounded-pill"
            style={{ background: "#FFA500", color: "white", fontWeight: "bold" }}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;