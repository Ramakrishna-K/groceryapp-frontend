
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/appContext";
// import toast from "react-hot-toast";
// // const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const MyOrders = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const { axios, user } = useContext(AppContext);

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get(`https://groceryapp-backend-552v.onrender.com/api/order/user`);
//       if (data.success) {
//         setMyOrders(data.orders);
//       } else {
//         toast.error(data.message || "Failed to fetch orders");
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (user) fetchOrders();
//   }, [user]);

//   // Frontend live status updater
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMyOrders((prevOrders) =>
//         prevOrders.map((order) => {
//           const age = Date.now() - new Date(order.createdAt).getTime();
//           let status = "Pending";

//           if (age >= 3 * 60 * 10) status = "Delivered";
//           else if (age >= 1 * 60 * 10) status = "Order Placed";

//           return { ...order, status };
//         })
//       );
//     }, 60);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="mt-12 pb-16 px-2 sm:px-0">
//       <h2 className="text-2xl md:text-3xl font-medium mb-6">My Orders</h2>

//       {myOrders.length > 0 ? (
//         myOrders.map((order, index) => (
//           <div
//             key={index}
//             className="my-4 border border-gray-300 rounded-lg p-4 max-w-4xl overflow-hidden"
//           >
//             {/* ===== Order Header (Mobile column, Desktop row) ===== */}
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3 ,break-words">
//               <span className="font-medium">
//                 Order ID: {order.shortOrderId || order._id}
//               </span>
//               <span className="font-medium">
//                 Payment: {order.paymentType}
//               </span>
//               <span className="font-medium">
//                 Total: ₹{order.amount}
//               </span>
//             </div>

//             {/* ===== Order Items ===== */}
//             {order.items?.length > 0 &&
//               order.items
//                 .filter((item) => item && item.product)
//                 .map((item, idx) => {
//                   const product = item.product;
//                   const image = product.image?.[0] || "default.png";
//                   const quantity = item.quantity || 1;

//                   return (
//                     <div
//                       key={idx}
//                       className="border-t border-gray-200 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
//                     >
//                       {/* Product Info */}
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={`https://groceryapp-backend-552v.onrender.com/images/${image}`}
//                           alt={product.name}
//                           className="w-14 h-14 object-cover max-w-full"
//                         />
//                         <div className="break-words,">
//                           <p className="font-medium">{product.name}</p>
//                           <p className="text-sm text-gray-600">
//                             {product.category}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Order Details */}
//                       <div className="text-sm md:text-base">
//                         <p>Quantity: {quantity}</p>
//                         <p>Status: {order.status}</p>
//                         <p>
//                           Date:{" "}
//                           {new Date(order.createdAt).toLocaleString()}
//                         </p>
//                       </div>

//                       {/* Amount */}
//                       <p className="font-medium">
//                         Amount: ₹{(product.offerPrice || 0) * quantity}
//                       </p>
//                     </div>
//                   );
//                 })}
//           </div>
//         ))
//       ) : (
//         <p className="mt-6 text-gray-500">You have no orders yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
// const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user, cartItems } = useContext(AppContext);

  // ---------------- Sync cart to backend ----------------
  useEffect(() => {
    const syncCartToBackend = async () => {
      const token = localStorage.getItem("token"); // get stored token
      if (!token || !cartItems || Object.keys(cartItems).length === 0) return;

      try {
        const { data } = await axios.put(
          "https://groceryapp-backend-552v.onrender.com/api/cart/update",
          { items: cartItems },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Cart synced:", data);
      } catch (err) {
        console.log("Cart sync error:", err.response?.data || err.message);
      }
    };

    if (user) syncCartToBackend();
  }, [cartItems, axios, user]);

  // ---------------- Fetch orders ----------------
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://groceryapp-backend-552v.onrender.com/api/order/user`
      );
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  // ---------------- Frontend live status updater ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      setMyOrders((prevOrders) =>
        prevOrders.map((order) => {
          const age = Date.now() - new Date(order.createdAt).getTime();
          let status = "Pending";

          if (age >= 3 * 60 * 10) status = "Delivered";
          else if (age >= 1 * 60 * 10) status = "Order Placed";

          return { ...order, status };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 pb-16 px-2 sm:px-0">
      <h2 className="text-2xl md:text-3xl font-medium mb-6">My Orders</h2>

      {myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="my-4 border border-gray-300 rounded-lg p-4 max-w-4xl overflow-hidden"
          >
            {/* ===== Order Header ===== */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3 ,break-words">
              <span className="font-medium">
                Order ID: {order.shortOrderId || order._id}
              </span>
              <span className="font-medium">Payment: {order.paymentType}</span>
              <span className="font-medium">Total: ₹{order.amount}</span>
            </div>

            {/* ===== Order Items ===== */}
            {order.items?.length > 0 &&
              order.items
                .filter((item) => item && item.product)
                .map((item, idx) => {
                  const product = item.product;
                  const image = product.image?.[0] || "default.png";
                  const quantity = item.quantity || 1;

                  return (
                    <div
                      key={idx}
                      className="border-t border-gray-200 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://groceryapp-backend-552v.onrender.com/images/${image}`}
                          alt={product.name}
                          className="w-14 h-14 object-cover max-w-full"
                        />
                        <div className="break-words,">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="text-sm md:text-base">
                        <p>Quantity: {quantity}</p>
                        <p>Status: {order.status}</p>
                        <p>
                          Date:{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Amount */}
                      <p className="font-medium">
                        Amount: ₹{(product.offerPrice || 0) * quantity}
                      </p>
                    </div>
                  );
                })}
          </div>
        ))
      ) : (
        <p className="mt-6 text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
