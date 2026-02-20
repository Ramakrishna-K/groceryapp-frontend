



import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";
import React, { useState, useEffect } from "react";
// const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `https://groceryapp-backend-552v.onrender.com/api/seller/login`,
        { email, password },
        {
          withCredentials: true, // if backend uses cookies
        }
      );

      // ❌ Login failed
      if (!data.success) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ Save JWT token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Update seller state
      setIsSeller(true);
      toast.success("Login successful");
      navigate("/seller");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Server error"
      );
    }
  };

  return (
    !isSeller && (
      <div className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/50 text-gray-600">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 m-auto items-start p-8 py-12 w-75 ,sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            />
          </div>

          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;








