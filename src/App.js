// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddProduct from './components/AddProduct';
import GetProducts from './components/GetProduct';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import MakePayment from './components/MakePayment';


function App() {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
          <h1>Fitspare Motors</h1>
          </header>

          <Link to="/" className='btn btn-danger'>Home</Link>
          <Link to="/addproduct" className='btn btn-primary'>Add Product</Link>
          <Link to="/signup" className='btn btn-success'>Sign Up</Link>
          <Link to="/signin" className='btn btn-info'>Sign In</Link>
      
          
         
        </div>

        <Routes>
          <Route path='/makepayment' element={<MakePayment/>}/>
         
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/' element={<GetProducts/>}/>
        
        </Routes>
    </Router>
  );
}

export default App;