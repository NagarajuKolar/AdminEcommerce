import { useState, useContext, createContext, useEffect } from 'react'
import image from '../assets/mens clothing.jpeg'
export const Cartcontext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
  const [wishlist, setwishlist] = useState([]);
  const [checkoutItems, setcheckoutItems] =useState([]);
const [search,setsearch]=useState('')

  
  useEffect(() => {
    const storedCart = localStorage.getItem("cartitems");
    const storedWishlist = localStorage.getItem("wishlistitems");

    if (storedCart) {
      setcart(JSON.parse(storedCart));
    }

    if (storedWishlist) {
      setwishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlistitems', JSON.stringify(wishlist));
  }, [wishlist]);

const [productList, setProductList] = useState([
  { id: 1, img: image, title: 'denim', desc: "best fit denims",price : 2000,newprice : 2000,},
  { id: 2, img: image, title: 'cisco', desc: "best fit denims" ,price: 3000,newprice : 2000},
  { id: 3, img: image, title: 'Buffalo', desc: "best fit denims",price: 3000 ,newprice : 2000},
  { id: 4, img: image, title: 'Nike', desc: "best fit denims",price: 3000,newprice : 2000},
  { id: 5, img: image, title: 'Adidas', desc: "best fit denims",price: 3000,newprice : 2000},
  { id: 6, img: image, title: 'raymond', desc: "best fit denims",price: 3000 ,newprice : 2000},
  { id: 7, img: image, title: 'Ram-raj', desc: "best fit denims",price: 3000 ,newprice : 2000},
  { id: 8, img: image, title: 'Rupa', desc: "best fit denims" ,price: 3000,newprice : 2000}
]);

  const addtocart = (item,quantity=1) => {
    setcart((prevcart) => {
      const alreadyincart = prevcart.find(carItem => carItem.id === item.id);
      if (!alreadyincart) {
        const updatedcart = [...prevcart, {...item,quantity}]; //adding  item to prevcart
        return updatedcart;
      }
      else {
        return prevcart;
      }

    })
  };

const removefromcart = (item) =>{
  const cartStorage = JSON.parse(localStorage.getItem('cartitems')) || [];
  const updatedcart = cartStorage.filter(wishlist => wishlist.id !== item.id);
  setcart(updatedcart);
  localStorage.setItem('cartitems', JSON.stringify(updatedcart));
}


 
  const addtowishlist = (item) => {
    setwishlist((prevwishlist) => {
      const alreadyinwishlist = prevwishlist.find(carItem => carItem.id === item.id);
      if (!alreadyinwishlist) {
        const updatedwishlist = [...prevwishlist, item];
        return updatedwishlist;
      }
      else {
        return prevwishlist;
      }

    })
  };

  const removefromwishlist = (item) => {
    setwishlist((prev) => {
      const itemtoremove = prev.find(cartitem => cartitem.id === item.id)

      if (itemtoremove) {
        const updatedwishlist = prev.filter(cartItem => cartItem !== itemtoremove)
        return updatedwishlist;
      }
      else {
        return prev;
      }
    })
  }

  const isiteminwishlist = (item) => {
    return wishlist.some(wishitem => wishitem.id === item.id)
  };


  const isitemincart = (item) => {
    return cart.some(cart => cart.id === item.id)
  }

  return (
    <Cartcontext.Provider value={{
      cart, addtocart, wishlist, addtowishlist, removefromcart,
      removefromwishlist, isiteminwishlist, isitemincart,productList,setProductList,checkoutItems, setcheckoutItems,search,setsearch
    }}>
      {children}
    </Cartcontext.Provider>
  );
}


