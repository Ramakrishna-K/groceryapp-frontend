
// // src/context/AppContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";
// // const backendURL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// // Axios defaults
// axios.defaults.withCredentials = true;
// // axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// // Create context
// export const AppContext = createContext(null);

// // Provider component
// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate(); // ✅ can now be used in context
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false); // from simple code
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ Fetch seller status
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get(`https://groceryapp-backend-552v.onrender.com/api/seller/is-auth`);
//       setIsSeller(data.success || false);
//     } catch {
//       setIsSeller(false);
//     }
//   };

//   // ✅ Fetch user auth and cart data
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get(`https://groceryapp-backend-552v.onrender.com/api/user/is-auth`);
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cart || {});
//       } else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Fetch products
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(`https://groceryapp-backend-552v.onrender.com/api/product/list`);
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Cart helpers
//   const addToCart = (itemId) => {
//     let cartData = structuredClone(cartItems || {});
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);
//     toast.success("Added to cart");
//   };

//   const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Cart updated");
//   };

//   const removeFromCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] <= 0) delete cartData[itemId];
//       setCartItems(cartData);
//       toast.success("Removed from cart");
//     }
//   };

//   const cartCount = () =>
//     Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

//   const totalCartAmount = () =>
//     Math.floor(
//       Object.entries(cartItems).reduce((total, [id, qty]) => {
//         const product = products.find((p) => p._id === id);
//         return product ? total + qty * product.offerPrice : total;
//       }, 0) * 100
//     ) / 100;

//   // 🔄 Initial fetches
//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);

//   // 🔄 Sync cart to database
//   useEffect(() => {
//     const updateCart = async () => {
//       try {
//         if (!user) return;
//         const { data } = await axios.post(`https://groceryapp-backend-552v.onrender.com/api/cart/update`, { cartItems });
//         if (!data.success) toast.error(data.message);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     updateCart();
//   }, [cartItems, user]);

//   const value = {
//     navigate,              // ✅ included
//     showUserLogin,         // ✅ included
//     setShowUserLogin,      // ✅ included
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     products,
//     cartItems,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     searchQuery,
//     setSearchQuery,
//     cartCount,
//     totalCartAmount,
//     axios,
//     fetchProducts,
//     setCartItems,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

// };

// // Custom hook
// export const useAppContext = () => useContext(AppContext);


// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios defaults
axios.defaults.withCredentials = true;

// Create context
export const AppContext = createContext(null);

// Provider component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get(
        `https://groceryapp-backend-552v.onrender.com/api/seller/is-auth`
      );
      setIsSeller(data.success || false);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch user auth and cart data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `https://groceryapp-backend-552v.onrender.com/api/user/is-auth`
      );
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart || {});
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://groceryapp-backend-552v.onrender.com/api/product/list`
      );
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cart helpers
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
    syncCartToBackend(cartData);
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
    syncCartToBackend(cartData);
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from cart");
      syncCartToBackend(cartData);
    }
  };

  const cartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const totalCartAmount = () =>
    Math.floor(
      Object.entries(cartItems).reduce((total, [id, qty]) => {
        const product = products.find((p) => p._id === id);
        return product ? total + qty * product.offerPrice : total;
      }, 0) * 100
    ) / 100;

  // Sync cart to backend using JWT token
  const syncCartToBackend = async (updatedCart) => {
    const token = localStorage.getItem("token"); // ✅ get stored token
    if (!token) return;
    try {
      const { data } = await axios.put(
        "https://groceryapp-backend-552v.onrender.com/api/cart/update",
        { items: updatedCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Cart synced:", data);
    } catch (err) {
      console.log("Cart sync error:", err.response?.data || err.message);
    }
  };

  // 🔄 Initial fetches
  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  const value = {
    navigate,
    showUserLogin,
    setShowUserLogin,
    user,
    setUser,
    isSeller,
    setIsSeller,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
export const useAppContext = () => useContext(AppContext);











