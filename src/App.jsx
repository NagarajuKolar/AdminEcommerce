import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Navbar from './Components/Navbar';
import Wishlist from './Components/Wishlist';
import { CartProvider } from './Contexts/Cartcontext';
import { ThemeProvider } from './Contexts/Themecontext';
import Viewproduct from './Components/Viewproduct';
import Checkout from './Components/Checkout';
import './App.css'
import { AuthProvider } from './Contexts/Authentication';
import AdminDashboard from './Components/AdminDashboard';
import { useLocation } from 'react-router-dom';
import AdminHome from './Components/AdminHome';
import AdminUser from './Components/AdminUser';
import AdminProducts from './Components/AdminProducts';
function App() {
  const location = useLocation()
const hidenavbar = location.pathname.toLowerCase().startsWith('/admin');


  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            {!hidenavbar && <Navbar />}
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/wishlist' element={<Wishlist />}></Route>
              <Route path='/:title/:id' element={<Viewproduct />}></Route>
              <Route path='/checkout' element={<Checkout />}></Route>
              {/* <Route path='/login' element={<Login />}></Route> */}

              <Route path='/admin' element={<AdminDashboard />}>
                <Route index element={<AdminHome />}></Route>
                <Route path="users" element={<AdminUser />}></Route>
                <Route path="products" element={<AdminProducts />}></Route>
              </Route>



            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>


    </>
  )
}

export default App
