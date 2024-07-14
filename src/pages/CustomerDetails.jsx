import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`${BASE_URL}customer/getCustomerById/${id}`);
      if (res.status === 200 && res.data.success) {
        setCustomer(res.data.customerDoc);
      } else {
        toast.error("Failed to fetch customer data.");
      }
    } catch (error) {
      console.log("error in fetching the customer", error);
      toast.error("An error occurred while fetching customer data.");
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  useEffect(() => {
    if (customer) {
      toast.success("Customer data fetched successfully.");
    }
  }, [customer]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg border">
        <div className="px-4 py-6">
          <h2 className="text-3xl font-bold mb-8">Customer Details</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p>
                <span className="font-semibold">First Name:</span> {customer.firstName}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span> {customer.lastName}
              </p>
              <p>
                <span className="font-semibold">Shop Name:</span> {customer.shopName}
              </p>
              <p>
                <span className="font-semibold">Shop Number:</span> {customer.shopNumber}
              </p>
              <p>
                <span className="font-semibold">Shop Address:</span> {customer.shopAddress}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span> {customer.pincode}
              </p>
              <p>
                <span className="font-semibold">Landmark:</span> {customer.landmark}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Date Created:</span> {new Date(customer.dateCreated).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Date Modified:</span> {new Date(customer.dateModified).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-6 pb-8">
          <button
            onClick={() => navigate(`/editCustomer/${id}`)}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
