import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const AddAdmin = () => {
    const [username, setUserName] =  useState('');
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(0);

    const navigate = useNavigate();

    const addAdmin =async(e)=>{
        e.preventDefault();

        const reqBody = {
            username,
            password,
            phone,
            role: "ADMIN"
        }

        try {
            const res = await axios.post(`${BASE_URL}user/register`, reqBody);
            if (res.status === 200 || res.success === true) {
                window.confirm("You have created an Admin who has all access to the application as yourself. If you intend to revert back this change then please delete the Created Admin")
                toast.success(`User with Admin ROle created`)
                navigate(`/home`)
            } else{
                toast.error(`Failed to create user with Admin role`)
            }
        } catch (error) {
            console.error("Error adding the User for Admin role",error);
            toast.error('Error Adding')
        }
    }

  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <h1 className="text-2xl font-medium">Add Product</h1>
        <form
          onSubmit={addAdmin}
          className="bg-white rounded-2xl border-slate-300 border">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="px-5 pt-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Admin Name"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="px-5 pt-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                maxLength={10}
                max={9999999999}
                min={6666666666}
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="bottom-0 left-0 w-full flex justify-center p-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Create Admin
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAdmin;
