import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const CustomerBooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}booking/getBookingByCustomer/${id}`);
      if (res.status === 200 ) {
        setBookings(res.data.bookingDoc);
        if (!toastShown.current) {
          toast.success("Bookings fetched successfully.");
          toastShown.current = true;
        }
      } else {
        toast.error("Failed to fetch bookings.");
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
      toast.error("An error occurred while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (bookings.length === 0) {
    return <div className="flex justify-center items-center h-screen">No bookings found.</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg border">
      <h2 className="text-3xl font-bold mb-8">Customer Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">
            Booking Date: {new Date(booking.bookingDateTime).toLocaleString()}
          </h3>
          <p className="text-lg">
            Status: <span className="font-bold">{booking.status}</span>
          </p>
          <p className="text-lg">
            Name: <span className="font-bold">{booking.customer.user.username}</span>
          </p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Products:</h4>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-start">Product Name</th>
                  <th className="py-2 px-4 border-b text-start">Quantity</th>
                  <th className="py-2 px-4 border-b text-start">Price</th>
                  <th className="py-2 px-4 border-b text-start">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {booking.products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.count}</td>
                    <td className="py-2 px-4 border-b">₹ {product.price}</td>
                    <td className="py-2 px-4 border-b">₹ {product.count * product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <p className="text-lg font-bold">
                Total Price: ₹{" "}
                {booking.products.reduce((total, product) => total + product.count * product.price, 0)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Payment:</h4>
            <p className="text-lg">
              Mode: <span className="font-bold">{booking.payments.mode}</span>
            </p>
            <p className="text-lg">
              Payment ID: <span className="font-bold">{booking.payments.paymentId}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerBooking;
