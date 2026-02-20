

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(null);
        setProfileOpen(false);
        navigate("/");
        toast.success(data.message);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  // Search → Products page
  useEffect(() => {
    if (
      searchQuery?.length > 0 &&
      location.pathname !== "/products"
    ) {
      navigate("/products");
    }
  }, [searchQuery, location.pathname, navigate]);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b bg-green-200">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        FreshMart
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {/* Search */}
        <div className="flex items-center gap-2 border px-3 rounded-full bg-white">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none text-sm py-1"
            placeholder="Search products"
          />

          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} className="w-6" />
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount()}
          </span>
        </div>

        {/* User */}
        {user ? (
          <div className="relative" ref={profileRef}>
            <img
              src={assets.profile_icon}
              className="w-9 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded shadow w-32 text-sm z-50">
                <li
                  onClick={() => {
                    navigate("/my-orders");
                    setProfileOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="bg-indigo-500 text-white px-6 py-2 rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        <img src={assets.menu_icon} className="w-6" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 p-5 md:hidden">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/products">Products</Link>

          {user ? (
            <>
              <button onClick={() => navigate("/my-orders")}>
                My Orders
              </button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button
              onClick={() => setShowUserLogin(true)}
              className="bg-indigo-500 text-white py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;




