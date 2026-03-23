import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/signup",
        data
      );

      setSuccess(response.data.message);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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

 

      {/* ==================== Signup Card ==================== */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start pt-5 mb-5">
        <div className="card border-0 shadow-lg p-3" style={{ maxWidth: "520px", width: "100%", borderRadius: "14px" }}>
          <div className="text-center mb-2">
            <h3 className="fw-bold text-dark mb-1"> FitSpare Motors</h3>
            <p className="text-muted small">Create your account</p>
          </div>

          {loading && <p className="text-center text-primary small">Please wait...</p>}
          {error && <div className="alert alert-danger text-center py-1">{error}</div>}
          {success && <div className="alert alert-success text-center py-1">{success}</div>}

          <form onSubmit={submit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control mb-2 rounded-pill" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2 rounded-pill" />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="form-control mb-2 rounded-pill" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control mb-3 rounded-pill" />

            <button type="submit" disabled={loading} className="btn btn-primary w-100 rounded-pill fw-semibold">
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 mb-2 small">
            Already have an account? <Link to="/signin" className="fw-semibold text-decoration-none">Sign In</Link>
          </p>
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
                <img src="/images2/faba.jpeg" alt="Facebook" width="40"  height="40"/>
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

export default Signup;