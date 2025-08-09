import React, { useState,useEffect} from 'react'
import '../CSS/AdminProduct.css'
import { IoMdClose } from "react-icons/io";
import { useContext } from 'react';
import { Cartcontext } from '../Contexts/Cartcontext'
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import image from '../assets/mens clothing.jpeg'
function AdminProducts() {
    const { 
         productList, search, setProductList } = useContext(Cartcontext);
    const [newproduct, setnewproduct] = useState(false)
    const [editid,seteditid]=useState(null)
    const [productdata, setproductdata] = useState({
        title: '',
        desc: '',
        category: '',
        image: '',
        brand: '',
        oldprice: '',
        price: '',
        stock: ''
    })

    const handlechange = (e) => {
        const { name, type, files, value } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setproductdata({
                        ...productdata,
                        [name]: reader.result,  // base64 string
                    });
                };
                reader.readAsDataURL(file);
            }
        }
        else {
            setproductdata({
                ...productdata,
                [name]: value,
            });
        }
    };

    const handleaddproduct = () => {
        setnewproduct(!newproduct)
    }
const handlesubmit = (e) => {
  e.preventDefault();

  if (editid) { 
    const updatedList = productList.map((product) =>
      product.id === editid ? { ...productdata, id: editid } : product
    );
    setProductList(updatedList);
    alert('Product Updated');
  } else {
    const newProductWithId = {
      ...productdata,
      id: productList.length ? productList[productList.length - 1].id + 1 : 1,
    };
    setProductList([...productList, newProductWithId]);
    alert('Product Added');
  }


  setproductdata({
    title: '',
    desc: '',
    category: '',
    brand: '',
    oldprice: '',
    price: '',
    stock: '',
    image: ''
  });
  setnewproduct(false);
  seteditid(null);
};

    const handledelete =(id)=>{
       const filtered= productList.filter(p => p.id !== id)
       setProductList(filtered);
       localStorage.setItem('productList',JSON.stringify(filtered))
    }
    const handleEdit =(id) =>{
       const productToedit= productList.find(p => p.id === id) 
       setproductdata(productToedit) // filing form
       seteditid(id)
       setnewproduct(true)

    }
    return (
        <>
            
            <div>
                <button onClick={handleaddproduct} className='addprod mb-3'>Add New Product +</button>
            </div>
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

                        <label htmlFor="imageInput">Upload image:</label>
                        <input type="file" id="imageInput" name="image" onChange={handlechange} accept="image/*" />

                        <label>Category</label>
                        <select onChange={handlechange} name="category" value={productdata.category}>
                            <option value="">Select category</option>
                        </select>
                        <label>Brand</label>
                        <input type="text" placeholder="Enter Brand"
                            name="brand" value={productdata.brand}
                            onChange={handlechange} />


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
            <h2 style={{fontfamily : "serif"}}>Products</h2>
            <div className='product-table'>
                <table className="table table-bordered table-striped text-center" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No products available</td></tr>
                        ) : (
                            productList.map((product, index) => (
                                <tr key={index}>
                                    <td> <img src={product.image} className="me-2" style={{width:"60px",height:"60px"}}/>{product.title}</td>
                                    <td>RS {product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button onClick={()=>handleEdit(product.id)}className='me-3 edit-btn'>Edit</button>
                                        <button onClick={()=>handledelete(product.id)} className='delete-btn'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

        </>
    )
}

export default AdminProducts