import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "http://cyberspecter.alwaysdata.net/static/images/";

  // Fetch products from API
  const getProducts = async () => {
    setLoading("Loading products, please wait...");
    setError("");
    try {
      const response = await axios.get("http://cyberspecter.alwaysdata.net/api/get_product_details");
      setProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Failed to load products: " + err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* NAVBAR */}
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
            <Link to="/addproduct" className="nav-link">Add Product</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/signin" className="nav-link active">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* WELCOME MARQUEE */}
      <div className="text-center my-3">
        <h2 style={{ color: "mediumvioletred", fontStyle: "oblique" }}>
          <span className="animated-marquee">
            𝕎𝔼𝕃ℂ𝕆𝕄𝔼 𝕋𝕆 𝔽𝕀𝕋𝕊ℙ𝔸ℝ𝔼 𝕄𝕆𝕋𝕆ℝ𝕊
          </span>
        </h2>
      </div>

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
        
        }
        .card-margin {
          margin: 10px;
        }
      `}</style>

  
      {/* ========== CAROUSEL ========== */}
      <section className="row">
        <div className="col-12">
          <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images2/willy 90.jpeg" className="d-block w-100" height="450" alt="slide1"/>
              </div>
              <div className="carousel-item">
                <img src="/images2/willy 91.jpeg" className="d-block w-100" height="450" alt="slide2"/>
              </div>
              <div className="carousel-item">
                <img src="/images2/willy 93.jpeg" className="d-block w-100" height="450" alt="slide3"/>
              </div>
              <div className="carousel-item">
                <img src="/images2/willy 94.jpeg" className="d-block w-100" height="450" alt="slide4"/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-danger"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-danger"></span>
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
       <div  className='row mt-4 text-center'>
      <h3 className='text-center text-primary'>Available Products</h3>
      <h4 className='text-info'>{loading}</h4>
      <h4 className='text-danger'>{error}</h4>

      {/* map over products array and desplay them */}
      {products.map((product)=>(
        <div className='col-md-3 justify-content-center mb-4'>
          <div className='card shadow p-3 text-center card-margin'>
            <img src={img_url+product.product_photo} alt={product.product_photo}  className='product_img mt-3'/>
            <div className='card-body'>
              <h5 className='mt-2'>{product.product_name}</h5>
              <p className='text-muted'>{product.product_description}</p>
                <b className='text-warning'>ksh:{product.product_cost}</b> <br />
                <button className='btn btn-primary' onClick={()=>navigate('/makepayment',{state:{product}})}>Buy Now</button>
             

            </div>
       
            </div>
          </div>
        ))}
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

export default GetProducts;