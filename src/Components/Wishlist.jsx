import React from 'react'
import { useContext } from 'react'
import { Cartcontext } from '../Contexts/Cartcontext'
import { CiHeart } from "react-icons/ci";
import '../CSS/wishlist.css'
import { FaHeart } from "react-icons/fa";
function Wishlist() {
  const { wishlist, addtocart, removefromwishlist,isiteminwishlist } = useContext(Cartcontext);
  return (
    <>
      <div className=' d-flex flex-wrap'>
        {wishlist.map((item, index) => (
          <div className="card mx-4 mb-4 " key={index} style={{ width: '20rem' }}>
            <img src={item.img} className="card-img-top" alt="image" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.desc}</p>
              <span onClick={() => { !isiteminwishlist(item) ? addtowishlist(item) : removefromwishlist(item) }}>
                <FaHeart size={30} className={`heart-icon ${isiteminwishlist(item) ? 'active' : ''}`} />
              </span>
              <div className='d-flex justify-content-between '>
                <div className="btn btn-primary" onClick={() => addtocart(item)}>Add to cart</div>
                <div className="btn btn-primary ms-3" onClick={() => removefromwishlist(item)}>remove from Wishlist</div>
              </div>
            </div>
          </div>
        )
        )}

      </div>

    </>
  )
}

export default Wishlist