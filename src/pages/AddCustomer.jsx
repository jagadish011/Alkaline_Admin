import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from '../constants';


const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopNumber, setShopNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    const reqBody = {
      firstName,
      lastName,
      gender,
      phone,
      password,
      shopAddress,
      shopName,
      shopNumber,
      pincode,
      landmark,
    };

    try {
      const res = await axios.post(`${BASE_URL}customer/createCustomer`, reqBody);
      if (res.status === 201 && res.data.success) {
        toast.success('Customer added successfully');
        navigate('/allCustomer');
      } else {
        toast.error('Failed to add customer');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Customer already exists with this phone number');
      } else {
        console.log('error in adding customer', error);
        toast.error('An error occurred while adding customer');
      }
    }
  };

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Add Customer</h1>
      <form onSubmit={addCustomer} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Gender"
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="98XXXXXX99"
              maxLength={10}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                placeholder="*********"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={togglePassword} className="absolute right-3 text-gray-600 cursor-pointer">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="px-5">
            <label htmlFor="shopName" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Shop Name"
              required
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="shopNumber" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Number
            </label>
            <input
              type="text"
              id="shopNumber"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Shop Number"
              required
              onChange={(e) => setShopNumber(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="shopAddress" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Address
            </label>
            <input
              type="text"
              id="shopAddress"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Shop Address"
              required
              onChange={(e) => setShopAddress(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="110001"
              required
              onChange={(e) => setPincode(e.target.value)}
              min={0}
              maxLength={6}
            />
          </div>
          <div className="px-5">
            <label htmlFor="landmark" className="block mb-2 text-sm font-medium text-gray-900">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Landmark"
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Customer
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCustomer;