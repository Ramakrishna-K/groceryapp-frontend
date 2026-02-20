

// import { useEffect, useState } from "react";
// import { useAppContext } from "../context/appContext";
// import toast from "react-hot-toast";
// // const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const Cart = () => {
//   const {
//     products,
//     navigate,
//     cartCount,
//     totalCartAmount,
//     cartItems,
//     setCartItems,
//     removeFromCart,
//     updateCartItem,
//     axios,
//     user,
//   } = useAppContext();

//   const [cartArray, setCartArray] = useState([]);
//   const [address, setAddress] = useState([]);
//   const [showAddress, setShowAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentOption, setPaymentOption] = useState("COD");

//   useEffect(() => {
//     if (products.length > 0 && cartItems) {
//       const temp = [];
//       for (const key in cartItems) {
//         const product = products.find((p) => p._id === key);
//         if (product) temp.push({ ...product, quantity: cartItems[key] });
//       }
//       setCartArray(temp);
//     }
//   }, [products, cartItems]);

//   useEffect(() => {
//     if (user) {
//       axios.get(`https://groceryapp-backend-552v.onrender.com/api/address/get`).then(({ data }) => {
//         if (data.success) {
//           setAddress(data.addresses);
//           setSelectedAddress(data.addresses[0] || null);
//         }
//       });
//     }
//   }, [user]);

//   const placeOrder = async () => {
//     if (!selectedAddress) return toast.error("Please select an address");

//     try {
//       const { data } = await axios.post(`https://groceryapp-backend-552v.onrender.com/api/order/cod`, {
//         items: cartArray.map((item) => ({
//           product: item._id,
//           quantity: item.quantity,
//         })),
//         address: selectedAddress._id,
//       });

//       if (data.success) {
//         toast.success(data.message);
//         setCartItems({});
//         navigate("/my-orders");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   if (!products.length || !cartItems) return null;

//   return (
//     <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-4 mx-auto gap-8">
//       {/* ================= LEFT (CART ITEMS) ================= */}
//       <div className="flex-1">
//         <h1 className="text-2xl md:text-3xl font-semibold mb-6">
//           Shopping Cart{" "}
//           <span className="text-indigo-500 text-base font-medium">
//             {cartCount()} Items
//           </span>
//         </h1>

//         {/* Header (Desktop only) */}
//         <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3 border-b border-gray-300">
//           <p>Product Details</p>
//           <p className="text-center">Subtotal</p>
//           <p className="text-center">Action</p>
//         </div>

//         {/* Cart Items */}
//         {cartArray.map((product, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-3 md:gap-0 py-4 border-b border-gray-200"
//           >
//             {/* Product Info */}
//             <div className="flex gap-4 items-center">
//               <div
//                 onClick={() =>
//                   navigate(`/product/${product.category}/${product._id}`)
//                 }
//                 className="w-20 h-20 md:w-24 md:h-24 border rounded flex items-center justify-center cursor-pointer hover:shadow-lg transition"
//               >
//                 <img
//                   src={`https://groceryapp-backend-552v.onrender.com/images/${product.image[0]}`}
//                   className="max-w-full h-full object-cover"
//                   alt={product.name}
//                 />
//               </div>

//               <div className="flex flex-col justify-between">
//                 <p className="font-semibold text-sm md:text-base">
//                   {product.name}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   Weight: {product.weight || "N/A"}
//                 </p>

//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="text-sm">Qty:</span>
//                   <select
//                     value={cartItems[product._id]}
//                     onChange={(e) =>
//                       updateCartItem(product._id, Number(e.target.value))
//                     }
//                     className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                   >
//                     {[...Array(9)].map((_, i) => (
//                       <option key={i} value={i + 1}>
//                         {i + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Subtotal */}
//             <p className="md:text-center text-sm md:text-base font-medium">
//               ₹{product.offerPrice * product.quantity}
//             </p>

//             {/* Remove */}
//             <button
//               onClick={() => removeFromCart(product._id)}
//               className="md:mx-auto self-start md:self-center text-red-500 hover:text-red-700 font-medium"
//             >
//               ❌ Remove
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={() => navigate("/products")}
//           className="mt-6 text-indigo-500 font-medium hover:underline"
//         >
//           ← Continue Shopping
//         </button>
//       </div>

//       {/* ================= RIGHT (SUMMARY) ================= */}
//       <div className="w-full max-w-md bg-gray-100/40 p-6 border border-gray-300 rounded-md h-fit self-start">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <hr className="my-4" />

//         {/* Address */}
//         <p className="text-sm font-medium uppercase mb-2">Delivery Address</p>
//         <div className="relative">
//           <p className="text-gray-600 text-sm mb-2 ,break-words">
//             {selectedAddress
//               ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
//               : "No address found"}
//           </p>

//           <button
//             onClick={() => setShowAddress(!showAddress)}
//             className="text-indigo-500 text-sm hover:underline"
//           >
//             Change
//           </button>

//           {showAddress && (
//             <div className="absolute bg-white border w-full mt-2 text-sm z-10 shadow-lg rounded">
//               {address.map((addr, i) => (
//                 <p
//                   key={i}
//                   onClick={() => {
//                     setSelectedAddress(addr);
//                     setShowAddress(false);
//                   }}
//                   className="p-2 hover:bg-gray-100 cursor-pointer rounded"
//                 >
//                   {addr.street}, {addr.city}
//                 </p>
//               ))}
//               <p
//                 onClick={() => navigate("/add-address")}
//                 className="p-2 text-indigo-500 cursor-pointer text-center font-medium hover:bg-gray-100 rounded"
//               >
//                 + Add Address
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Payment */}
//         <p className="text-sm font-medium uppercase mt-5 mb-2">
//           Payment Method
//         </p>
//         <select
//           onChange={(e) => setPaymentOption(e.target.value)}
//           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
//         >
//           <option value="COD">Cash On Delivery</option>
//           <option value="Online">Online Payment</option>
//         </select>

//         <hr className="my-4" />

//         {/* Totals */}
//         <div className="text-gray-700 space-y-2 text-sm">
//           <p className="flex justify-between">
//             <span>Price</span>
//             <span>₹{totalCartAmount()}</span>
//           </p>
//           <p className="flex justify-between">
//             <span>Shipping</span>
//             <span className="text-green-600 font-medium">Free</span>
//           </p>
//           <p className="flex justify-between">
//             <span>Tax (2%)</span>
//             <span>₹{Math.floor((totalCartAmount() * 2) / 100)}</span>
//           </p>
//           <p className="flex justify-between text-lg font-semibold">
//             <span>Total</span>
//             <span>₹{totalCartAmount() + Math.floor((totalCartAmount() * 2) / 100)}</span>
//           </p>
//         </div>

//         <button
//           onClick={placeOrder}
//           className="w-full py-3 mt-6 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition"
//         >
//           {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";
// const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const backendURL = "https://groceryapp-backend-552v.onrender.com";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const temp = [];
      for (const key in cartItems) {
        const product = products.find((p) => p._id === key);
        if (product) temp.push({ ...product, quantity: cartItems[key] });
      }
      setCartArray(temp);
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${backendURL}/api/address/get`)
        .then(({ data }) => {
          if (data.success) {
            setAddress(data.addresses);
            setSelectedAddress(data.addresses[0] || null);
          }
        })
        .catch((err) => {
          console.error("Address fetch error:", err);
        });
    }
  }, [user]);

  const placeOrder = async () => {
    if (!selectedAddress) return toast.error("Please select an address");

    try {
      const { data } = await axios.post(`${backendURL}/api/order/cod`, {
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ===== 🔹 Cart Update Function (merged from CartUpdate.jsx) =====
  const handleUpdateCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update the cart");
        return;
      }

      const { data } = await axios.put(
        `${backendURL}/api/cart/update`,
        { items: cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems(data.updatedCart || cartItems);
      toast.success("Cart updated successfully!");
    } catch (error) {
      console.error(
        "Cart update error:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please log in again.");
      } else {
        toast.error("Failed to update cart.");
      }
    }
  };

  if (!products.length || !cartItems) return null;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-4 mx-auto gap-8">
      {/* ================= LEFT (CART ITEMS) ================= */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-indigo-500 text-base font-medium">
            {cartCount()} Items
          </span>
        </h1>

        {/* Header (Desktop only) */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3 border-b border-gray-300">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Cart Items */}
        {cartArray.map((product, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-3 md:gap-0 py-4 border-b border-gray-200"
          >
            {/* Product Info */}
            <div className="flex gap-4 items-center">
              <div
                onClick={() =>
                  navigate(`/product/${product.category}/${product._id}`)
                }
                className="w-20 h-20 md:w-24 md:h-24 border rounded flex items-center justify-center cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={`${backendURL}/images/${product.image[0]}`}
                  className="max-w-full h-full object-cover"
                  alt={product.name}
                />
              </div>

              <div className="flex flex-col justify-between">
                <p className="font-semibold text-sm md:text-base">
                  {product.name}
                </p>
                <p className="text-gray-500 text-sm">
                  Weight: {product.weight || "N/A"}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">Qty:</span>
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {[...Array(9)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <p className="md:text-center text-sm md:text-base font-medium">
              ₹{product.offerPrice * product.quantity}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(product._id)}
              className="md:mx-auto self-start md:self-center text-red-500 hover:text-red-700 font-medium"
            >
              ❌ Remove
            </button>
          </div>
        ))}

        {/* ===== Update Cart Button ===== */}
        <button
          onClick={handleUpdateCart}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Cart
        </button>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 text-indigo-500 font-medium hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* ================= RIGHT (SUMMARY) ================= */}
      <div className="w-full max-w-md bg-gray-100/40 p-6 border border-gray-300 rounded-md h-fit self-start">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <hr className="my-4" />

        {/* Address */}
        <p className="text-sm font-medium uppercase mb-2">Delivery Address</p>
        <div className="relative">
          <p className="text-gray-600 text-sm mb-2 ,break-words">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-500 text-sm hover:underline"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute bg-white border w-full mt-2 text-sm z-10 shadow-lg rounded">
              {address.map((addr, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                >
                  {addr.street}, {addr.city}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="p-2 text-indigo-500 cursor-pointer text-center font-medium hover:bg-gray-100 rounded"
              >
                + Add Address
              </p>
            </div>
          )}
        </div>

        {/* Payment */}
        <p className="text-sm font-medium uppercase mt-5 mb-2">
          Payment Method
        </p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="my-4" />

        {/* Totals */}
        <div className="text-gray-700 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{Math.floor((totalCartAmount() * 2) / 100)}</span>
          </p>
          <p className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>
              ₹
              {totalCartAmount() +
                Math.floor((totalCartAmount() * 2) / 100)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;





