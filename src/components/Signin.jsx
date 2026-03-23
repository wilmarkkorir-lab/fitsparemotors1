import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "http://cyberspecter.alwaysdata.net/api/signin",
        data
      );

      setLoading(false);

      if (response.data.user) {
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div style={{
        color: "grey",
        fontStyle: "oblique",
        textAlign: "center",
        margin: "20px 0",
        fontSize: "50px",
        fontWeight: "bold",
      }}>
        welcome to fitspare motors

      </div>

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

  

      {/* ========== SIGNIN FORM ========== */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1 my-5">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center">Welcome Back </h2>
          <p className="text-center text-muted">Sign in to continue</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control mb-3"
            />
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing in..." : "Sign In "}
            </button>
          </form>

          <p className="text-center mt-3">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
{/* ========== FOOTER ========== */}
<footer className="mt-auto">
  <section className="row bg-danger text-light p-4">
    <div className="col-md-3 text-center mb-4">
      <h4>About Us</h4>
      <p>
        FitSpare Motors provides top-quality car spare parts and engine components you can trust. 
        We focus on reliability and durability to keep your vehicle running smoothly.
      </p>
      <p>
        Our team is committed to helping you find the right parts quickly and easily. 
        Your satisfaction and your car’s performance come first.
      </p>
    </div>

    <div className="col-md-3 text-center mb-4">
      <h4>Contact Us</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target;
          const email = form.email.value;
          const comment = form.comment.value;

          if (!email || !comment) return;

          try {
            // Replace with your Formspree form endpoint
            const response = await fetch("https://formspree.io/f/yourformid", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, comment }),
            });

            if (response.ok) {
              form.reset(); // automatically clears fields after sending
            } else {
              console.error("Error sending message");
            }
          } catch (err) {
            console.error("Error sending message", err);
          }
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          required
        />
        <textarea
          name="comment"
          className="form-control mb-3"
          rows="3"
          placeholder="Leave a comment"
          required
        ></textarea>
        <button className="btn btn-primary w-100" type="submit">
          Send
        </button>
      </form>
    </div>

    <div className="col-md-3 text-center mb-4">
      <h4>Stay Connected</h4>
      <p>
        Stay connected with FitSpare Motors on social media! Follow us on Facebook, Instagram, WhatsApp, and LinkedIn to get updates on new car parts, special offers, promotions, and tips to keep your vehicle running smoothly. Join our community and never miss out!
      </p>
      <div className="d-flex justify-content-center gap-2">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img src="/images2/faba.jpeg" alt="Facebook" width="40" height="40" />
        </a>
        <a href="https://wa.me/" target="_blank" rel="noreferrer">
          <img src="/images2/wats.jpg" alt="WhatsApp" width="40" height="40" />
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

export default SigninPage;