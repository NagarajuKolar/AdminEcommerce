import { React } from 'react'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../Contexts/Cartcontext'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useContext } from 'react'
import '../CSS/Home.css'

function Home() {
    const { addtocart, addtowishlist, wishlist, removefromwishlist, isiteminwishlist, isitemincart, productList, search } = useContext(Cartcontext);
    const searchedproducts = productList.filter((item) => {
        return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            (item.category || "").toLowerCase().includes(search.toLowerCase())
        );
    });
    return (
        <>

            <div className="container-fluid banner">
                <div className="left-text">
                    <h1 className="heading">ShopShy</h1>
                    <p>
                        Welcome to our online store, your one-stop destination for quality
                        products at unbeatable prices. Explore a wide range of categories
                        including fashion, electronics, home essentials, and more. Enjoy fast
                        shipping, secure payments, and 24/7 customer support for a seamless
                        shopping experience. Discover deals, save more, and shop with
                        confidence — all from the comfort of your home.
                    </p>
                </div>
                <div className="right">
                    <div
                        className="box" id="box1"
                        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=')" }}>
                        <div className="label">Online Shopping</div>
                    </div>

                    <div
                        className="box" id="box2"
                        style={{ backgroundImage: "url('https://media.istockphoto.com/id/864505242/photo/mens-clothing-and-personal-accessories.jpg?s=612x612&w=0&k=20&c=TaJuW3UY9IZMijRrj1IdJRwd6iWzXBlrZyQd1uyBzEY=')" }}>
                        <div className="label">Men's Fashion</div>
                    </div>

                    <div
                        className="box"
                        id="box3"
                        style={{ backgroundImage: "url('https://mccoymart.com/post/wp-content/webp-express/webp-images/uploads/2019/04/kitchen-items-List.jpg.webp')" }} >
                        <div className="label">Home & Kitchen</div>
                    </div>

                    <div
                        className="box" id="box4"
                        style={{ backgroundImage: "url('https://m.media-amazon.com/images/I/61n0aVXta7L._UY1000_.jpg')" }}>
                        <div className="label">Elegant Watches</div>
                    </div>

                    <div
                        className="box" id="box5"
                        style={{ backgroundImage: "url('https://www.matrixbricks.com/wp-content/uploads/2024/06/img75.webp')" }} >
                        <div className="label">Lady's Fashion</div>
                    </div>

                    <div
                        className="box" id="box6"
                        style={{ backgroundImage: "url('https://www.itedgenews.africa/wp-content/uploads/2021/03/Consumer-Electronics.png')" }}>
                        <div className="label">Electronics</div>
                    </div>

                    <div
                        className="box" id="box7"
                        style={{ backgroundImage: "url('https://okcredit-blog-images-prod.storage.googleapis.com/2021/11/Footwear-business1--1-.jpg')" }}>
                        <div className="label">Footwear</div>
                    </div>
                </div>
            </div>

            <div className="product-cards-container mt-4">
                {searchedproducts.map((item, index) => (

                    <div className="product-card mx-2 mb-4 mb-3" key={index} >
                        <Link to={`/${item.title}/${item.id}`}>
                            <img src={item.image} className="card-img-top" alt="image" />
                        </Link>
                        <div className="card-body">
                            <div className="card-top-content">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                    {item.desc.length > 60
                                        ? item.desc.slice(0,60) + "..."
                                        : item.desc}
                                </p>
                            </div>
                            <span onClick={() => { !isiteminwishlist(item) ? addtowishlist(item) : removefromwishlist(item) }}>
                                <FaHeart size={30} className={`heart-icon ${isiteminwishlist(item) ? 'active' : ''}`} />
                            </span>
                            <div className='d-flex justify-content-between'>
                                {!isitemincart(item)
                                    ? (<div className="btn btn-primary" onClick={() => addtocart(item)}>Add to Cart</div>)
                                    : (<Link to='/cart' className="btn btn-primary">Go to Cart</Link>)}
                                <Link to={`/${item.title}/${item.id}`} className="btn btn-primary ms-3">View Product</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>


        </>
    )
}

export default Home