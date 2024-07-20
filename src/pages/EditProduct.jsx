import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [img, setImg] = useState(''); // Static image, can be set to a default if required

  const { id } = useParams();
  const navigate = useNavigate();
console.log(id);
  const getProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}product/getProductById/${id}`);
      if (response.data.success) {
        const product = response.data.productDoc;
        console.log(product);
        setName(product.name);
        setPrice(product.price);
        setCapacity(product.capacity);
        setProductDesc(product.productDesc);
        setImg(product.img);
      } else {
        toast.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const reqBody = {
      name,
      price,
      capacity,
      productDesc,
      orderCount: 0, // Keeping orderCount as 0
      img: '', // Static image, can be updated if needed
    };

    try {
      const response = await axios.post(`${BASE_URL}product/editProduct/${id}`, reqBody);
      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/allProducts'); // Redirect to All Products page after update
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Edit Product</h1>
      <form onSubmit={updateProduct} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Name"
              required
              value={name}
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
              name="price"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Price"
              required
              value={price}
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
              name="capacity"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Capacity"
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="productDesc" className="block mb-2 text-sm font-medium text-gray-900">
              Product Description
            </label>
            <textarea
              id="productDesc"
              name="productDesc"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Product Description"
              required
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;
