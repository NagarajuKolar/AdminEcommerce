import React, { useState } from 'react'
import { Cartcontext } from '../Contexts/Cartcontext'
import { useContext } from 'react'
import { Link } from 'react-router-dom';

function Checkout() {
    const { productList, checkoutItems } = useContext(Cartcontext);
    const [adressshow, setadressshow] = useState(false);
    const openmodal = () => {
        setadressshow(!adressshow)
    }
    let totalPrice = 0;
    for (let item of checkoutItems) {
        totalPrice = totalPrice + item.price * item.quantity;
    }

    return (
        <>
            <h4 className='m-5'>
                <Link className='text-decoration-none' onClick={() => setadressshow(true)} >Add Address</Link>
            </h4>


            
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6 col-12">
                        <table className="table text-center table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkoutItems.map((item, index) => (
                                    <tr key={index}>
                                        <td><img src={item.img} alt={item.title} style={{ width: "50px", height: "50px" }} />
                                            <div>{item.title}</div>
                                        </td>
                                        <td>{item.desc} </td>
                                        <td>{item.quantity}</td>
                                        <td> RS.{item.quantity * (item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                    <div className="col-lg-4 col-md-6 col-12  border p-3" style={{ maxWidth: '370px', background: '#6c5a5e40' }} >
                        <h5>PRICE DETAILS</h5>
                        <hr />

                        <div className="row mb-3">
                            <div className="col-8"> Total Items </div>
                            <div className="col-4 text-end">{checkoutItems.length}</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-8">Price({checkoutItems.length} items)</div>
                            <div className="col-4 text-end text-success"> {totalPrice}</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-8">Shipping</div>
                            <div className="col-4 text-end text-success"> ₹88</div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-8">Coupons for you</div>
                            <div className="col-4 text-end"> - ₹88</div>
                        </div>

                        <hr />


                        <div className="row fw-bold mt-2">
                            <div className="col-8">Total Amount</div>
                            <div className="col-4 text-end">{totalPrice}</div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Checkout