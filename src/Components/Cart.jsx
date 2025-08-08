import React from 'react'
import { useContext } from 'react'
import { Cartcontext } from '../Contexts/Cartcontext'
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removefromcart, addtowishlist, isiteminwishlist, setcheckoutItems,search} = useContext(Cartcontext)
  const searchedproducts = cart.filter((item) => {
  return (
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.category || "").toLowerCase().includes(search.toLowerCase())
  );
});
  return (
    <>
      <div className="container-fluid">
            {cart.length === 0 ? (
      <h2 className="text-center mt-5">Your Cart is Empty</h2>)
      :  searchedproducts.length === 0 ?
          (<h2 className='text-center mt-5'>Product not Found</h2>)
           : (
            <>
              <div className="d-flex  justify-content-center  flex-wrap">
                {searchedproducts.map((item, index) => (

                  <div className="card mx-4 mb-4 " key={index} style={{ width: '18rem' }}>
                    <img src={item.img} className="card-img-top" alt="image" />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.desc}</p>
                      <span onClick={() => { !isiteminwishlist(item) ? addtowishlist(item) : removefromwishlist(item) }}>
                        <FaHeart size={30} className={`heart-icon ${isiteminwishlist(item) ? 'active' : ''}`} />
                      </span>
                      <p>Quantity : {item.quantity}</p>
                       <p><span style={{ textDecoration: "line-through" }}>RS.{item.price}  </span> <span> RS.{item.newprice}</span></p>
                      <div className='d-flex justify-content-between'>
                        <div className="btn btn-primary" onClick={() => removefromcart(item)}>Remove</div>
                        <div className="btn btn-primary ms-3" onClick={() => addtowishlist(item)}>Add to Wishlist</div>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
              {cart && (
              <div className="d-flex justify-content-end me-4 mt-4 ">
                <Link
                  to="/checkout"
                  className="btn btn-lg btn-success px-3 fs-3 mb-3"
                  onClick={() => setcheckoutItems([...cart])} >
                  Buy Now
                </Link>
              </div>
              )}
            </>

          )}
      </div>
    </>
  )
}

export default Cart