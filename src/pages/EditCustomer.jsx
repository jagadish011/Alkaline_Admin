import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const EditCustomer = () => {
  
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [phone, setphone] = useState();
  const [shopName, setshopName] = useState();
  const [shopNumber, setshopNumber] = useState();
  const [shopAddress, setshopAddress] = useState();
  const [pincode, setpincode] = useState();
  const [landmark, setlandmark] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const getCustomerById = async () => {
    try {
        const res  = await axios.get(`${BASE_URL}customer/getCustomerById/${id}`);
        setfirstName(res.data.customerDoc.firstName);
        setlastName(res.data.customerDoc.lastName);
        setphone(res.data.customerDoc.user.phone);
        setshopName(res.data.customerDoc.shopName);
        setshopNumber(res.data.customerDoc.shopNumber);
        setshopAddress(res.data.customerDoc.shopAddress);
        setpincode(res.data.customerDoc.pincode);
        setlandmark(res.data.customerDoc.landmark);
        console.log(res.data);
    } catch (error) {
        console.log("Error in fetching customer",error);
    }
  }

  const 
  updateCustomer = async (e) => {
    e.preventDefault();
    const reqBody = {
        customerId: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        shopName: shopName,
        shopNumber: shopNumber,
        shopAddress: shopAddress,
        pincode: pincode,
        landmark: landmark
    }

    console.log(reqBody);
    try {
        const res = await axios.post(`${BASE_URL}customer/updateCustomer/${id}`, reqBody);
        console.log(res.data);
        if(res.data.success){
            toast.success("Customer updated successfully");
        }else{
            toast.error("Failed to update customer");
        }
        navigate("/allCustomer");
    } catch (error) {
        console.log("Error in updating customer",error);   
    }
  }


  useEffect(() => {
    getCustomerById();
  }, [id]);

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Edit Customer</h1>
      <form onSubmit={updateCustomer} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="98XXXXXX99"
              pattern="[0-9]{10}"
              required
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="shopName" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Shop Name"
              required
              value={shopName}
              onChange={(e) => setshopName(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="shopNumber" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Number
            </label>
            <input
              type="text"
              id="shopNumber"
              name="shopNumber"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Shop Number"
              required
              value={shopNumber}
              onChange={(e) => setshopNumber(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label htmlFor="shopAddress" className="block mb-2 text-sm font-medium text-gray-900">
              Shop Address
            </label>
            <textarea
              type="text"
              id="shopAddress"
              name="shopAddress"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your address"
              required
              value={shopAddress}
              onChange={(e) => setshopAddress(e.target.value)}
            />
          </div>
          <div className="px-5 w-1/3">
            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">
              Postal Pincode
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="110001"
              required
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
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
              name="landmark"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Landmark"
              required
              value={landmark}
              onChange={(e) => setlandmark(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Update Customer
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCustomer;
