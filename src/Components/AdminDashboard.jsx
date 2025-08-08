import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../CSS/Admindashboard.css'
import { Outlet } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

import { AuthContext } from '../Contexts/Authentication';
function AdminDashboard() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <div className="admin-container">
        <aside className='admin-sidebar'>
          <nav>
            <h3>Admin Panel</h3>
            <ul style={{ listStyle: "none" }}>
              <li><NavLink to="" end> Home</NavLink></li>
              <li><NavLink to="users">Users</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
            </ul>
          </nav>
          <div className="profile">
            <div className='profile-icon '><CgProfile /></div>
            <div>{user ? user.fullname : "UserProfile"}</div>
          </div>
        </aside>
        <main className='admin-main'>
          <div className="main-headers">
            <h2>Admin Management</h2>
            <div className="header-icons">
                <FaBell />
              < FaUserAlt />
            
            </div>
          </div>
          <Outlet />
        </main>


      </div>
    </>
  )
}

export default AdminDashboard