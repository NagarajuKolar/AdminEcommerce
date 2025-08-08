import React, { useState } from 'react'
import '../CSS/AdminProduct.css'
import { IoMdClose } from "react-icons/io";
import { useContext } from 'react';
import { Cartcontext } from '../Contexts/Cartcontext'
function AdminProducts() {
    const { productList,setProductList } = useContext(Cartcontext)
    const [newproduct, setnewproduct] = useState(false)
    const [productdata, setproductdata] = useState({
        title: '',
        desc: '',
        category: '',
        brand: '',
        oldprice: '',
        price: '',
        stock: ''
    })
    const handlechange = (e) => {
        setproductdata({
            ...productdata,
            [e.target.name]: e.target.value
        });
    }
    const handleaddproduct = () => {
        setnewproduct(!newproduct)
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        setProductList([...productList, productdata]); 
        alert("product Added");
        setproductdata({
            title: '',
            desc: '',
            category: '',
            brand: '',
            oldprice: '',
            price: '',
            stock: ''
        })

    }
    return (
        <>
            <h2>Products</h2>
            <button onClick={handleaddproduct} className='addprod'>Add New Product +</button>
            {newproduct && (
                <div className="addside">
                    <div className="form-header">
                        <h4>Add New Product</h4>
                        <button className="close-btn" onClick={() => setnewproduct(false)}><IoMdClose /></button>
                    </div>

                    <form onSubmit={handlesubmit} className="product-form">

                        <label>Title</label>
                        <input type="text" placeholder="Enter product title"
                            name="title" value={productdata.title}
                            onChange={handlechange} />
                        <label>Description</label>
                        <textarea placeholder="Enter product description"
                            name="desc" value={productdata.desc} onChange={handlechange}>
                        </textarea>
                        <label>Category</label>
                        <select onChange={handlechange} name="category" value={productdata.category}>
                            <option value="">Select category</option>
                        </select>
                        <label>Brand</label>
                        <select onChange={handlechange} name="brand" value={productdata.brand}>
                            <option value="">Select brand</option>
                        </select>
                        <label>Price</label>
                        <input type="number" placeholder="Enter product price"
                            name="oldprice" value={productdata.oldprice} onChange={handlechange} />
                        <label>Sale Price</label>
                        <input type="number" placeholder="Enter sale price"
                            name="price" value={productdata.price} onChange={handlechange} />
                        <label>Total Stock</label>
                        <input type="number" placeholder="Enter total stock"
                            name="stock" value={productdata.stock} onChange={handlechange} />
                        <button type="submit" className="add-btn">Add</button>
                    </form>
                </div>
            )}



        </>
    )
}

export default AdminProducts