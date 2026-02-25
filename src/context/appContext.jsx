
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


// // src/context/AppContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// // Axios default
// axios.defaults.withCredentials = true;

// export const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // ===== STATES =====
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // ===== FETCH SELLER STATUS =====
//   // const fetchSeller = async () => {
//   //   try {
//   //     const { data } = await axios.get(
//   //       "https://groceryapp-backend-552v.onrender.com/api/seller/is-auth",
//   //       { withCredentials: true } // 🔑 send cookie
//   //     );
//   //     setIsSeller(data.success || false);
//   //   } catch {
//   //     setIsSeller(false);
//   //   }
//   // };
// const fetchSeller = async () => {
//   try {
//     const { data } = await axios.get(
//       "https://groceryapp-backend-552v.onrender.com/api/seller/is-auth",
//       { withCredentials: true } // 🔥 REQUIRED
//     );

//     setIsSeller(data.success);
//   } catch (error) {
//     setIsSeller(false);
//   }
// };
//   // ===== FETCH USER AUTH & CART =====
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://groceryapp-backend-552v.onrender.com/api/user/is-auth",
//         { withCredentials: true }
//       );
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cart || {});
//       } else {
//         toast.error(data.message || "Failed to fetch user");
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || error.message;
//       toast.error(msg);

//       // Auto logout on 401
//       if (error.response?.status === 401) {
//         setUser(null);
//         navigate("/login");
//       }
//     }
//   };

//   // ===== FETCH PRODUCTS =====
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://groceryapp-backend-552v.onrender.com/api/product/list"
//       );
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ===== CART HELPERS =====
//   const addToCart = (itemId) => {
//     const cartData = structuredClone(cartItems || {});
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);
//     toast.success("Added to cart");
//   };

//   const updateCartItem = (itemId, quantity) => {
//     const cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Cart updated");
//   };

//   const removeFromCart = (itemId) => {
//     const cartData = structuredClone(cartItems);
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

//   // ===== INITIAL DATA FETCH =====
//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);

//   // ===== SYNC CART TO DATABASE =====
//   useEffect(() => {
//     const updateCart = async () => {
//       if (!user) return;
//       try {
//         const { data } = await axios.put(
//           "https://groceryapp-backend-552v.onrender.com/api/cart/update",
//           { cartItems },
//           { withCredentials: true } // 🔑 MUST send cookie
//         );
//         if (!data.success) toast.error(data.message);
//       } catch (error) {
//         const msg = error.response?.data?.message || error.message;
//         toast.error(msg);

//         // Auto logout if token invalid/expired
//         if (error.response?.status === 401) {
//           setUser(null);
//           setCartItems({});
//           navigate("/login");
//         }
//       }
//     };

//     updateCart();
//   }, [cartItems, user]);

//   // ===== CONTEXT VALUE =====
//   const value = {
//     navigate,
//     showUserLogin,
//     setShowUserLogin,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     products,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     searchQuery,
//     setSearchQuery,
//     cartCount,
//     totalCartAmount,
//     axios,
//     fetchProducts,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// // ===== CUSTOM HOOK =====
// export const useAppContext = () => useContext(AppContext);


// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// 1. Set global Axios defaults - This makes 'withCredentials' active for ALL calls automatically
axios.defaults.withCredentials = true;
const BACKEND_URL = "https://groceryapp-backend-552v.onrender.com";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // ===== STATES =====
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ===== FETCH SELLER STATUS =====
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/seller/is-auth`);
      setIsSeller(data.success);
    } catch (error) {
      // We don't toast error here because 401 just means they aren't a seller
      setIsSeller(false);
    }
  };

  // ===== FETCH USER AUTH & CART =====
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/is-auth`);
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart || {});
      }
    } catch (error) {
      // If error is 401, it just means user is not logged in. Silence it.
      // Only toast error if it's a real server error (500)
      if (error.response?.status !== 401) {
        const msg = error.response?.data?.message || error.message;
        toast.error(msg);
      }
      setUser(null);
    }
  };

  // ===== FETCH PRODUCTS =====
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/product/list`);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error.message);
    }
  };

  // ===== CART HELPERS =====
  const addToCart = (itemId) => {
    if(!user) return toast.error("Please login to add items to cart");
    const cartData = structuredClone(cartItems || {});
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from cart");
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

  // ===== INITIAL DATA FETCH (On Page Load) =====
  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  // ===== SYNC CART TO DATABASE =====
  useEffect(() => {
    const updateCartInDB = async () => {
      if (!user) return;
      try {
        await axios.put(`${BACKEND_URL}/api/cart/update`, { cartItems });
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
          setCartItems({});
        }
      }
    };

    // Only sync if user is logged in
    const delayDebounce = setTimeout(() => {
      updateCartInDB();
    }, 500); // 500ms debounce to prevent too many API calls while clicking

    return () => clearTimeout(delayDebounce);
  }, [cartItems, user]);

  // ===== CONTEXT VALUE =====
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
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    BACKEND_URL
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);





