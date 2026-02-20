

import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SellerLayout = () => {
  const { setIsSeller, axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/seller/logout`);
      if (data.success) {
        setIsSeller(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* ===== TOP HEADER ===== */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-semibold">
            Grocery Store App
          </h1>
        </Link>

        <div className="flex items-center gap-3 md:gap-5 text-gray-500">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-3 py-1"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* ===== SIDEBAR ===== */}
        <div className="md:w-70 w-12 bg-white border-r border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 text-sm
                ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-600 border-r-4 border-indigo-500"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* ===== PAGE CONTENT (AdminLayout logic) ===== */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;




