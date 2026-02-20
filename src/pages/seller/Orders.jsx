




import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";
// const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Orders = () => {
  const placeholderImage =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`https://groceryapp-backend-552v.onrender.com/api/order/seller`);
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Poll every 10 seconds
    const interval = setInterval(fetchOrders, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to simulate auto-paid for COD delivered orders
  const getUpdatedOrders = () => {
    return orders.map((order) => {
      let isPaid = order.isPaid;

      if (order.paymentType === "COD" && order.status === "Delivered") {
        const deliveredTime = new Date(order.updatedAt).getTime();
        const age = Date.now() - deliveredTime;

        if (age >= 20 * 1000) {
          isPaid = true; // mark as paid after 20 sec
        }
      }

      return { ...order, isPaid };
    });
  };

  const updatedOrders = getUpdatedOrders();

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      <h2 className="text-lg md:text-xl font-semibold">Orders List</h2>

      {updatedOrders.map((order, index) => (
        <div
          key={index}
          className="
            bg-blue-50 border border-gray-300 rounded-lg
            p-4 space-y-4
            flex flex-col
            lg:grid lg:grid-cols-[2fr_1.2fr_0.6fr_1fr]
            lg:items-center lg:gap-6
            max-w-full overflow-hidden
          "
        >
          {/* ---------------- PRODUCTS ---------------- */}
          <div className="flex flex-wrap gap-3">
            {order.items
              .filter((item) => item.product)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border p-1 rounded"
                >
                  <img
                    className="w-12 h-12 object-contain shrink-0"
                    src={
                      item.product.image?.[0]
                        ? `https://groceryapp-backend-552v.onrender.com/images/${item.product.image[0]}`
                        : placeholderImage
                    }
                    alt={item.product.name}
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-medium">
                      {item.product.name}
                      {item.quantity > 1 && (
                        <span className="ml-1 text-indigo-500">
                          x{item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* ---------------- ADDRESS ---------------- */}
          <div className="text-xs md:text-sm leading-relaxed">
            <p className="font-semibold">
              {order.address?.firstName} {order.address?.lastName}
            </p>
            <p className="text-gray-600">
              {order.address?.street}, {order.address?.city},{" "}
              {order.address?.state}, {order.address?.zipcode},{" "}
              {order.address?.country}
            </p>
          </div>

          {/* ---------------- AMOUNT ---------------- */}
          <p className="text-sm md:text-base font-semibold text-gray-700">
            ₹{order.amount}
          </p>

          {/* ---------------- STATUS ---------------- */}
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <p>
              <span className="font-semibold">Method:</span> {order.paymentType}
            </p>

            <p>
              <span className="font-semibold">Order:</span> {order.status}
            </p>

            <p>
              <span className="font-semibold">Payment:</span>{" "}
              <span
                className={
                  order.isPaid
                    ? "text-green-600 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>

            <p className="text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
