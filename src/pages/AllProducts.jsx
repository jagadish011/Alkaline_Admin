import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import bottle from "../assets/bottle.jpeg";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const toastShown = useRef(false);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}product/getAllProducts`);
      console.log(response?.data);
      if (!toastShown.current) {
        setProducts(response?.data?.products || []);
        toast.success("Products fetched successfully.");
        toastShown.current = true;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editProduct/${id}`);
  };

  const handleDelete = async(productId)=>{
    try {
      const confirmDelete = window.confirm("You are deleteing the product, Are you sure you want to continue with this ?");
      if (!confirmDelete) {
        await axios.delete(`${BASE_URL}product/deleteProduct/${productId}`);
        setProducts((prevDocs)=> prevDocs.filter((product)=> product._id !==productId));
        toast.success("Product deleted successfully.")
      }
    } catch (error) {
      console.error(error);
      toast.error("Faild to delete Product")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-14">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products&&products.map((product) => (
          <div
            key={product._id}
            className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-contain"
                src={bottle}
                alt={product.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </a>
              <p className="mb-2 text-lg text-gray-700 dark:text-gray-400">
                Price: ₹{product.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {product.productDesc}
              </p>
              <button
                className="bg-indigo-700 hover:bg-indigo-500 text-white text-xs font-normal p-2 rounded-md w-full"
                onClick={() => handleEdit(product._id)}>
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-black text-white text-xs font-normal p-2 rounded-md w-full"
                onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
