import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../Contexts/Cartcontext'
import { Themecontext } from '../Contexts/Themecontext'
import { AuthContext } from '../Contexts/Authentication';
import { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const { cart, wishlist, productList, search, setsearch, } = useContext(Cartcontext);
  const navigate = useNavigate();

  const { login, logout, user } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(Themecontext)
  const [openlogin, setopenlogin] = useState(false)
  const [openRegister, setopenRegister] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmpassword: ''
  });
  const [errors, seterrors] = useState({});
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const Validate = () => {
    const newerrors = {};
    let isValid = true;

    if (!formData.fullname.trim()) {
      newerrors.fullname = "Name is Required"
      isValid = false;
    }
    if (!formData.username.trim()) {
      newerrors.username = "username is Required"
      isValid = false;
    }

    if (!formData.email.trim()) {
      newerrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newerrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.mobile.trim()) {
      newerrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newerrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (!formData.password) {
      newerrors.password = "Password is required";
      isValid = false;
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newerrors.password = "Must contain at least one number and one special character";
      isValid = false;
    }

    if (!formData.confirmpassword) {
      newerrors.confirmpassword = "Confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmpassword) {
      newerrors.confirmpassword = "Passwords do not match";
      isValid = false;
    }

    seterrors(newerrors)
    return isValid;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = login(loginData.email, loginData.password);

    if (success) {
      alert('Login successful');
      setopenlogin(false);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

    const handlelogout = () =>{
    const success=logout()
    if(success){
      navigate('/')
    }
    else{
      alert('failed to logout')
    }
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Validate();
    if (isValid) {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUser')) || [];
    existingUsers.push(formData);
    localStorage.setItem('registeredUser', JSON.stringify(existingUsers));
      alert("Registered successfully!");
      setFormData({
        fullname: '',
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmpassword: ''
      });

      seterrors({});
      setopenRegister(false);
    }
  };

  const handleRegister = () => {
    setopenRegister(!openRegister)
  }

  const handlelogin = () => {
    setopenlogin(!openlogin)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (

    <>

      <div className="container-fluid bg-dark  fixed-top">
        <header className="d-flex flex-wrap justify-content-center py-2 mb-1 ">
          <form className=" d-flex align-items-center mb-3 ms-md-5 mb-md-0 me-md-auto  " role="search">
            <input type="search" className="form-control form-control-dark text-bg-white"
              placeholder="Search..." aria-label="Search"
              style={{ width: '400px' }} id="searchinput" value={search} onChange={(e) => setsearch(e.target.value)} />
          </form>


          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/" className="nav-link " aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link">
                WishList({wishlist.length})
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item me-2" style={{ margin: "auto" }}>
              <div className="form-check form-switch nav-item">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault"
                  checked={darkMode}
                  onChange={toggleTheme} />
              </div>
            </li>
          </ul>

          <Link to="/cart" className="btn btn-primary"> Cart({cart.length})</Link>
          {user ? (
            <button onClick={handlelogout} >Logout</button>
          ) : (
            <button onClick={handlelogin}>Login</button>
          )}

          {user ? (
            <button >{user.fullname}</button>
          ) : (
            <button onClick={handleRegister}>Register</button>
          )}



        </header>
      </div>

      <div className={`login-section ${openlogin ? 'show' : ''}`}>
        <div className="login-form">
          <div className="form-headers">
            <h2>Admin Panel</h2>
            <IoMdClose className="close" onClick={() => setopenlogin(false)} />
          </div>

          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="">Email Adress *</label>
            <input type="text" placeholder="Enter Your Email Adress" name='email'
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <label htmlFor="">Password*</label>
            <input type="password" placeholder="Enter password" name="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <div className="forgot">
              <div>
                <input type="Checkbox" className='me-1' />
                <label htmlFor="remember">Remember</label>
              </div>
              <a href="#" className="password-forgot">Forgot Password?</a>
            </div>
            <div className="logins">
              <a href="">Create Account?</a>
              <button>Login</button>
            </div>
          </form>

        </div>
      </div>

      <div className={`register-section ${openRegister ? 'show' : ''}`}>
        <div className="register">
          <div className="closeregister">
            <IoMdClose onClick={() => setopenRegister(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="fname">Full Name*</label>
                <input type="text" id="fname" placeholder="Enter your first name"
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange} />
                {errors.fullname && <small className="text-danger">{errors.fullname}</small>}
              </div>
              <div className="col">
                <label htmlFor="lname">User Name*</label>
                <input type="text" id="lname" placeholder="Enter your last name"
                  name='username'
                  value={formData.username}
                  onChange={handleChange} />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Email*</label>
                <input type="email" placeholder="Enter your Email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange} />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              <div className="col">
                <label>Phone number</label>
                <input type="number" placeholder="Enter your Phone number"
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange} />
                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
              </div>
            </div>

            {/* <div className="row">
              <div className="col-full">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Address Line 1" />
              </div>
            </div> */}

            {/* <div className="row">
              <div className="col">
                <label htmlFor="country">Country *</label>
                <select id="country" name='country' onChange={handleChange} value={formData.country}>
                  <option>Country</option>
                  <option>India</option>
                  <option>Country</option>
                </select>
                {errors.country && <small className="text-danger">{errors.country}</small>}
              </div>
              <div className="col">
                <label htmlFor="region">Region State</label>
                <select id="region" name='state' value={formData.state}>
                  <option>Region/State</option>
                  <option>Telangana</option>
                </select>
              </div>
            </div> */}
            <div className="row">
              <div className="col">
                <label>PassWord*</label>
                <input type="password" placeholder="Type your password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange} />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <div className="col">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Confirm Password"
                  name='confirmpassword'
                  value={formData.confirmpassword}
                  onChange={handleChange} />
                {errors.confirmpassword && <small className="text-danger">{errors.confirmpassword}</small>}
              </div>
            </div>
            <div className="form-footer">
              <p>Have an account? <a href="#">Login</a></p>
              <button type="submit">Register</button>
            </div>



          </form>
        </div>
      </div>
    </>
  )
}

export default Navbar