


import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/product/stock`, { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 py-6 px-3 md:px-6 lg:px-10 w-full">
      <h2 className="pb-4 text-lg font-medium">All Products</h2>

      {/* ===================== DESKTOP (TABLE) ===================== */}
      <div className="hidden lg:block bg-white border border-gray-300 rounded-md overflow-hidden max-w-6xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-gray-900 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Selling Price</th>
              <th className="px-4 py-3 font-semibold">In Stock</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={`${backendURL}/images/${product.image[0]}`}
                    alt="Product"
                    className="w-14 h-14 object-cover rounded border"
                  />
                  <span className="font-medium truncate ,max-w-[220px]">
                    {product.name}
                  </span>
                </td>

                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">₹{product.offerPrice}</td>

                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.inStock}
                      onChange={() =>
                        toggleStock(product._id, !product.inStock)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== MOBILE + TABLET (CARDS) ===================== */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-300 rounded-md p-3 flex justify-between items-center"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={`${backendURL}/images/${product.image[0]}`}
                alt="Product"
                className="w-14 h-14 object-cover rounded border shrink-0"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {product.category}
                </p>
                <p className="text-sm font-semibold">
                  ₹{product.offerPrice}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={product.inStock}
                onChange={() =>
                  toggleStock(product._id, !product.inStock)
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600"></div>
              <span className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition peer-checked:translate-x-5"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

