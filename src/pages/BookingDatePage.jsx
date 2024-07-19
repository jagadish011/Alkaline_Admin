import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDatePage = () => {
  const [bookingDoc, setBookingDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [singleDate, setSingleDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [date, setDate] = useState('');

  const getAllBookings = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}booking/getAllBookings?page=${currentPage}&pageSize=10&sortField=bookingDateTime&sortOrder=desc`
      );
      console.log(response?.data);
      setBookingDoc(response?.data?.bookings);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchByDate = async () => {
    if (singleDate) {
      try {
        const formattedDate = singleDate.toISOString().split("T")[0];
        const response = await axios.get(
          `${BASE_URL}booking/getBookingForDate?date=${formattedDate}&page=${currentPage}&pageSize=10&sortField=bookingDateTime&sortOrder=desc`
        );
        console.log(response?.data);
        setBookingDoc(response?.data?.bookingDoc);
        setTotalPages(response?.data?.pagination?.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchByDateRange = async () => {
    if (startDate && endDate) {
      try {
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
        const response = await axios.get(
          `${BASE_URL}booking/getAllBookingsBetweenDatesPagination?startDate=${formattedStartDate}&endDate=${formattedEndDate}&page=${currentPage}&pageSize=10&sortField=bookingDateTime&sortOrder=desc`
        );
        console.log(response?.data);
        setBookingDoc(response?.data?.bookingDoc);
        setTotalPages(response?.data?.pagination?.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      <section className="w-screen md:w-full gap-4 flex flex-col">
        <p className="text-xl md:text-2xl font-bold">Find Booking by Date</p>
        <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
          <button
            onClick={getAllBookings}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              All Bookings
            </span>
          </button>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Find booking by Date
            </span>
          </button>
          {showDatePicker && (
            <div>
              <DatePicker
                selected={singleDate}
                onChange={(date) => {
                  setSingleDate(date);
                  setDate(date);
                }}
                dateFormat="yyyy/MM/dd"
                className="p-2 border rounded-md"
              />
              <button
                onClick={handleSearchByDate}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-blue-500 group-hover:from-green-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Search for this date
                </span>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowDateRange(!showDateRange)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Find booking between Dates
            </span>
          </button>
          {showDateRange && (
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setDate(date);
                }}
                dateFormat="yyyy/MM/dd"
                className="p-2 border rounded-md"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setDate(date);
                }}
                dateFormat="yyyy/MM/dd"
                className="p-2 border rounded-md"
              />
              <button
                onClick={handleSearchByDateRange}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mt-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-blue-500 group-hover:from-green-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Search for these dates
                </span>
              </button>
            </div>
          )}
        </div>
        <div>
          Bookings
          <div>
            {bookingDoc &&
              bookingDoc.map((booking, index) => (
                <div
                  key={index}
                  className="p-2 border-b border-gray-300 bg-slate-300 flex items-center justify-center">
                  <div className="relative flex flex-col mt-6 mb-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div className="p-6">
                      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Order placed by: {booking?.customer?.user?.username}
                      </h5>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Delivery Address: {booking?.customer?.shopAddress}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Landmark: {booking?.customer?.landmark}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Shop Name: {booking?.customer?.shopName}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Pincode: {booking?.customer?.pincode}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Contact: {booking?.customer?.user?.phone}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Total Price: ₹ {booking?.totalPrice}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Booking Status: {booking?.status}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Payment Status: {booking?.payments?.mode}
                      </p>
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        Order Details:
                      </p>
                      <div>
                        {booking?.products &&
                          booking?.products.map((product, index) => (
                            <div
                              className="mb-4 p-4 border rounded"
                              key={index}>
                              <p>Product Name: {product?.name}</p>
                              <p>
                                Ordered Units: {product?.name} X {product?.count}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-10 flex justify-center">
          <div className="border bg-[#D9D9D9] rounded-full flex justify-center">
            <button
              className="focus:outline-none text-black p-2 text-2xl"
              onClick={prevPage}
              disabled={currentPage === 1}>
              <MdKeyboardArrowLeft />
            </button>
            <p className="p-2">
              {currentPage} / {totalPages}
            </p>
            <button
              className="focus:outline-none text-black p-2 text-2xl"
              onClick={nextPage}
              disabled={currentPage === totalPages}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingDatePage;
