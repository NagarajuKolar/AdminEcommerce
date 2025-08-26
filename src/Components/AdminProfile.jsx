import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import '../CSS/Adminprofile.css'
import { AuthContext } from '../Contexts/Authentication';
import { useContext, useState,useEffect} from 'react';

function AdminProfile() {
    const { user,setUser } = useContext(AuthContext);

    const [editing, setediting] = useState(false)
    const [formData, setFormData] = useState({
        fullname: user.fullname,
        email: user.email,
        role: user.role
    });

  if (!user) {
    return null; 
  }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSave = () => {
        setUser(formData)
        console.log("Updated data:", formData);
        localStorage.setItem('loggedUser',JSON.stringify(formData))
        setediting(false);
    };
    return (
        <>

            <div className="profile-box">
                <div className="profile-head">
                    <h3>Profile</h3>
                    {editing ?
                        (
                            <>
                                <div className='update-btns'>
                                    <button className="profile-update" onClick={handleSave}>Update</button>
                                    <button className="profile-cancel" onClick={() => setediting(false)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <button className="profile-edit" onClick={() => setediting(true)}>Edit</button>
                        )}
                </div>
                <span >
                    <FaUserCircle className='fa-icon' />
                    <h3 className='fullname'>{formData.fullname}</h3>
                </span>

                <div className="profile-main">
                    <div>
                        <label htmlFor="Name"><strong>Name</strong> </label>
                        {editing ? (
                            <input type="text" name="fullname" onChange={handleChange} value={formData.fullname} />
                        ) : (<span>{formData.fullname}</span>)}

                    </div>
                    <div>
                        <label><strong>Email</strong></label>
                        {editing ? (
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        ) : (
                            <span>{formData.email}</span>
                        )}
                    </div>

                    <div>
                        <label><strong>Role</strong></label>
                        {editing ?
                            (
                                <input type="text" name="role" value={formData.role} onChange={handleChange} />
                            ) : (
                                <span>{formData.role}</span>
                            )}
                    </div>

                </div>
            </div>

        </>
    )
}

export default AdminProfile