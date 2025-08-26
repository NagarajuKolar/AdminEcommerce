import React from 'react'
import '../CSS/Adminuser.css'
function AdminUser() {
  const totalusers = JSON.parse(localStorage.getItem('registeredUser'));
  return (
    <>
      <div className="admin-user">
        <h1>Admin User  Overview</h1>

        <table className="table table-striped mt-4 text-center ">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Password</th>
              <th>No of orders</th>
              <th>Active/InActive</th>
            </tr>
          </thead>
          <tbody>
            {totalusers.map((user,index) =>(
              <tr key={index}>
                <td>{user.fullname}</td>
                <td>{user.password}</td>
                <td>12</td>
                <td> <button>Active</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="users-box">
          <div className="active-users">
              <h3>Total Active Users</h3>
              <p>30</p>
          </div>
          <div className="inactive-users">
            <h3>InActive Users</h3>
            <p>20</p>

          </div>
          <div className="totalorders">
            <h3>Orders Placed</h3>
            <p>100</p>

          </div>
        </div>
      </div>

    </>
  )
}

export default AdminUser