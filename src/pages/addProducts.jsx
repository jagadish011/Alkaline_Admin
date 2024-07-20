import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    const reqBody = {
      name,
      productDesc,
      capacity,
      img: '',
      price,
    };

    try {
      const res = await axios.post(`${BASE_URL}product/addProduct`, reqBody);
      if (res.status === 201 && res.data.success) {
        toast.success('Product added successfully');
        navigate('/allProducts');
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('An error occurred while adding the product');
    }
  };

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Add Product</h1>
      <form onSubmit={addProduct} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">
              Capacity
            </label>
            <input
              type="text"
              id="capacity"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Capacity"
              required
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="productDesc" className="block mb-2 text-sm font-medium text-gray-900">
              Product Description
            </label>
            <textarea
              id="productDesc"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Description"
              required
              onChange={(e) => setProductDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
