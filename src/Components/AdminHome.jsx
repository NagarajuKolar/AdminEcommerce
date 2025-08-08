import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Contexts/Authentication'
import '../CSS/AdminHome.css'
import { Cartcontext } from '../Contexts/Cartcontext'
function AdminHome() {
    const {productList}= useContext(Cartcontext)
    const Registereduser = JSON.parse(localStorage.getItem('registeredUser')) || []

    return (

        <>
            <h1>Admin Dashboard </h1>
            <div className="stats">
                    <div>
                        <h3>Total Users</h3>
                        <p>{Registereduser.length}</p>
                    </div>
                    <div>
                        <h3>Total Products</h3>
                        <p>{productList.length}</p>
                    </div>
                    <div>
                        <h3>Orders Today</h3>
                        <p>15</p>
                    </div>
        
            </div>
        </>
    )
}

export default AdminHome