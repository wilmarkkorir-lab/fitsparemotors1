import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_cost, setProduct_cost] = useState("");
  const [product_photo, setProduct_photo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      setProduct_photo(null);
      setPreviewUrl(null);
      return;
    }
    setProduct_photo(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/add_product",
        data
      );

      setSuccess(response.data.message || "Product added successfully!");
      setProduct_name("");
      setProduct_description("");
      setProduct_cost("");
      setProduct_photo(null);
      setPreviewUrl(null);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (

        <div className="d-flex flex-column min-vh-100">
    
          {/* ========== NAVBAR ========== */}
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <img src="/images2/logo 1.jpeg" alt="Logo" style={{ height: 30, width: 30 }} className="me-2"/>
            <Link to="/" className="navbar-brand"><b>FitSpare Motors</b></Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/addproduct" className="nav-link">AddProduct</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/signin" className="nav-link active">Sign In</Link>
              </div>
            </div>
          </nav>
    
          {/* ========== WELCOME BANNER ========== */}
          <div className="text-center my-3">
            <h2 style={{ color: "mediumvioletred", fontStyle: "oblique" }}>
              <span className="animated-marquee">
                𝕎𝔼𝕃ℂ𝕆𝕄𝔼 𝕋𝕆 𝔽𝕀𝕋𝕊ℙ𝔸ℝ𝔼 𝕄𝕆𝕋𝕆ℝ𝕊
              </span>
            </h2>
          </div>
    
          {/* CSS for marquee */}
          <style>{`
            .animated-marquee {
              display: inline-block;
              white-space: nowrap;
              animation: scroll-left 15s linear infinite;
            }
            @keyframes scroll-left {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
    

      {/* Add Product Form */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start py-5">
        <div className="card p-4 shadow-sm" style={{ maxWidth: 500, width: "100%" }}>
          <h3 className="text-center mb-3">Add Product</h3>

          {loading && <p className="text-warning text-center">Adding product...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <form onSubmit={submit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Product Name"
              required
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Product Description"
              rows={3}
              required
              value={product_description}
              onChange={(e) => setProduct_description(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Price (Ksh)"
              required
              value={product_cost}
              onChange={(e) => setProduct_cost(e.target.value)}
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              required
              onChange={handleFileChange}
            />

            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="img-fluid mb-3" style={{ maxHeight: 150 }} />
            )}

            <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading || !product_photo}>
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button className="btn btn-secondary w-100" onClick={() => navigate("/")}>
              Go Back
            </button>
          </form>
        </div>
      </div>

            {/* ========== FOOTER ========== */}
      <footer className="mt-auto">
        <section className="row bg-danger text-light p-4">
          <div className="col-md-3 text-center mb-4">
            <h4>About Us</h4>
            <p>FitSpare Motors provides top-quality car spare parts and engine components you can trust. We focus on reliability and durability to keep your vehicle running smoothly.</p>
            <p>Our team is committed to helping you find the right parts quickly and easily. Your satisfaction and your car’s performance come first.</p>
          </div>

          <div className="col-md-3 text-center mb-4">
            <h4>Contact Us</h4>
            <form>
              <input type="email" placeholder="Enter your email" className="form-control mb-3"/>
              <textarea className="form-control mb-3" rows="3" placeholder="Leave a comment"></textarea>
              <button className="btn btn-primary">Send</button>
            </form>
          </div>

          <div className="col-md-3 text-center mb-4">
            <h4>Stay Connected</h4>
            <p>Stay connected with FitSpare Motors on social media! Follow us on Facebook, Instagram, WhatsApp, and LinkedIn to get updates on new car parts, special offers, promotions, and tips to keep your vehicle running smoothly. Join our community and never miss out!</p>
            <div className="d-flex justify-content-center gap-2">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src="/images2/faba.jpeg" alt="Facebook" width="40" height="40" />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                <img src="/images2/wats.jpg" alt="WhatsApp" width="40" height="40"   />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src="/images2/insta.jpeg" alt="Instagram" width="40" height="40" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <img src="/images2/linked.jpeg" alt="LinkedIn" width="40" height="40" />
              </a>
            </div>
          </div>

          <div className="col-md-3 text-center mb-4">
            <img src="/images2/logo 2.jpeg" alt="logo" style={{ width: 300, height: 300 }} />
          </div>
        </section>

        <section className="bg-dark text-light text-center py-3">
          <h5 className="fs-6 mt-2">
            Developed by Wilmark Kipkirui Korir. &copy;2026. All rights reserved.
          </h5>
        </section>
      </footer>
    </div>
  );
};

export default AddProduct;