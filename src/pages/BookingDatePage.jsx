import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const BookingDatePage = () => {
  const [bookingDoc, setBookingDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [singleDate, setSingleDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [date, setDate] = useState("");

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

  const downloadBookingPDF = (booking) => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(18);
    doc.text("Booking Details", 105, 20, null, null, "center");

    const lineHeight = 10;
    let currentY = 40;
    const margin = 20;

    const addDetail = (label, value, isHighlighted = false) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      if (isHighlighted) {
        doc.setFontSize(14);
      } else {
        doc.setFontSize(12);
      }
      doc.setFont(undefined, "bold");
      doc.text(label, margin, currentY);
      doc.setFont(undefined, "normal");
      doc.text(String(value) || "N/A", margin + 50, currentY);
      currentY += lineHeight;
    };

    addDetail("Booking ID:", booking._id, true);
    addDetail("Customer Name:", booking?.customer?.user?.username);
    addDetail("Delivery Address:", booking?.customer?.shopAddress);
    addDetail("Contact:", booking?.customer?.user?.phone);
    addDetail("Total Price:", `₹ ${booking.totalPrice}/-`);
    addDetail("Status:", booking.status);
    addDetail("Payment Status:", booking?.payments?.paymentId);
    addDetail("Payment Mode:", booking?.payments?.mode);
    addDetail("Date & Time:", new Date(booking.updatedAt).toLocaleString());
    addDetail(
      "Payment Mode:",
      booking.payments.mode === "ONLINE"
        ? `ONLINE (ID: ${booking.payments.paymentId})`
        : "COD"
    );

    booking.products.forEach((product, index) => {
      addDetail(
        `Product ${index + 1}:`,
        `${product.name} (Count: ${product.count}, Price: ₹${product.price})`
      );
    });

    doc.save(`Booking_${booking._id}.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      bookingDoc.map((booking) => ({
        "Booking ID": booking._id,
        "Customer Name": booking?.customer?.user?.username,
        Service: booking.service,
        "Total Price": booking.totalPrice,
        Status: booking.status,
        "Date & Time": new Date(booking.updatedAt).toLocaleString(),
        "Payment Mode":
          booking.payments.mode === "ONLINE"
            ? `ONLINE (ID: ${booking.payments.paymentId})`
            : "COD",
        Products: booking.products
          .map(
            (product) =>
              `${product.name} (Count: ${product.count}, Price: ₹${product.price})`
          )
          .join(", "),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  return (
    <>
      <section className="w-screen md:w-full gap-4 flex flex-col">
        <p className="text-xl md:text-2xl font-bold">Find Booking by Date</p>
        <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
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
          <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
            <p className="text-xl md:text-2xl font-bold">Booking Details</p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded md:mt-0"
              onClick={downloadExcel}>
              Download All
            </button>
          </div>
          <div>
            <div className="relative border border-gray-800  shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-800">
                <thead className="text-xs text-gray-800 uppercase bg-slate-100 border-b border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivery Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Landmark
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Shop Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pincode
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer Contact
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Mode
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookingDoc && bookingDoc.length > 0 ? (
                    bookingDoc.map((booking, index) => (
                      <tr
                        className="bg-white border-b hover:bg-gray-50"
                        key={index}>
                        <td className="px-6 py-4">
                          {booking?.customer?.user?.username}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.customer?.shopAddress}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.customer?.landmark}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.customer?.shopName}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.customer?.pincode}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.customer?.user?.phone}
                        </td>
                        <td className="px-6 py-4">₹ {booking?.totalPrice}/-</td>
                        <td className="px-6 py-4">{booking?.status}</td>
                        <td className="px-6 py-4">
                          {booking?.payments?.paymentId}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.products.map((product, prodIndex) => (
                            <div key={prodIndex}>
                              {product?.name} (Count: {product?.count}, Price: ₹
                              {product?.price})
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          {booking?.payments?.mode === "ONLINE" ? (
                            <>
                              {booking?.payments?.mode} <br />
                              (ID: {booking?.payments?.paymentId})
                            </>
                          ) : (
                            <>
                              {booking?.payments?.mode} <br />
                              (ID:{booking?.payments?.paymentID})
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                            onClick={() => downloadBookingPDF(booking)}>
                            <FaDownload />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No Data about Bookings Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
