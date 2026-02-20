


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";

const Products = () => {
  const { products, searchQuery } = useAppContext();
  const { category } = useParams(); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = products;

    result = result.filter((product) => product.inStock);

    if (category) {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery.length > 0) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, searchQuery, category]);

  return (
    <div className="mt-16">
      <h1 className="text-3xl lg:text-4xl font-medium capitalize">
        {category ? category : "All Products"}
      </h1>

      <div className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;







