import React, { useState } from 'react'
import { Cartcontext } from '../Contexts/Cartcontext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CiSquareMinus } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import '../CSS/viewproduct.css'
function Viewproduct() {
  const { id, title } = useParams()
  const { productList, addtocart, addtowishlist, removefromwishlist, isiteminwishlist, setcheckoutItems } = useContext(Cartcontext);
  const viewprod = productList.find(p => p.id === parseInt(id))
  const [count, setcount] = useState(1);
  const add = () => {
    setcount(count + 1)
  }
  const sub = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  }

  if (!viewprod) {
    return (
      <h4>No Product Found</h4>
    )
  }
  else {
    return (
      <>
        <div className="container ">
          <div className="row">
            <div className="col-md-4 bg-light text-center pro ">
              <img src={viewprod.img} alt="" className='img-fluid py-3 mx-auto d-block' />
              <h4>{viewprod.title}</h4>
              <span onClick={() => { !isiteminwishlist(viewprod) ? addtowishlist(viewprod) : removefromwishlist(viewprod) }}>
                <FaHeart size={30} className={`hear-icon ${isiteminwishlist(viewprod) ? 'active' : ''}`} />
              </span>
            </div>
            <div className="col-md-5 m-5">
              <h5>{viewprod.desc}</h5>
              <h6> RS.{viewprod.price}</h6>
              <div className="buttons m-2">
               <div className="btn btn-primary" onClick={() => addtocart(viewprod, count || 1)}>Add to Cart</div>
                <Link to="/checkout" className='btn btn-success m-2'
                  onClick={() => setcheckoutItems([{ ...viewprod, quantity: count || 1 }])}>Buy Now</Link>
              </div>
              <div>
                <h6>Quantity : {count} </h6>
                <div className='d-flex flex-row align-items-center'>
                  <CiSquareMinus size={24} className='mx-1' onClick={() => sub()} />
                  <h4>{count}</h4>
                  <FaSquarePlus size={24} className='mx-1 plus' onClick={() => add()} />
                </div>
              </div>
            </div>

          </div>

        </div>

      </>
    )
  }
}

export default Viewproduct