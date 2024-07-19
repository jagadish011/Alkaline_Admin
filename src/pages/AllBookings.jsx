import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const AllBooking = () => {
  const [bookingDoc, setBookingDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchBookings = useCallback(
    debounce(async () => {
      try {
        const url = `${BASE_URL}booking/getAllBookings?page=${currentPage}&pageSize=10`;
        const res = await axios.get(url);
        setBookingDoc(res.data.bookings);
        setTotalPages(res.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch booking data.");
      }
    }, 300),
    [currentPage]
  );

  useEffect(() => {
    fetchBookings();
    return () => fetchBookings.cancel();
  }, [fetchBookings]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const downloadBookingPDF = (booking) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Booking Details', 105, 20, null, null, 'center');

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
      doc.setFont(undefined, 'bold');
      doc.text(label, margin, currentY);
      doc.setFont(undefined, 'normal');
      doc.text(String(value) || 'N/A', margin + 50, currentY);
      currentY += lineHeight;
    };

    addDetail('Booking ID:', booking._id, true);
    addDetail('Customer Name:', booking?.customer?.user?.username);
    addDetail('Service:', booking.service);
    addDetail('Total Price:', `₹ ${booking.totalPrice}/-`);
    addDetail('Status:', booking.status);
    addDetail('Date & Time:', new Date(booking.updatedAt).toLocaleString());
    addDetail('Payment Mode:', booking.payments.mode === 'ONLINE' ? `ONLINE (ID: ${booking.payments.paymentId})` : 'COD');

    booking.products.forEach((product, index) => {
      addDetail(`Product ${index + 1}:`, `${product.name} (Count: ${product.count}, Price: ₹${product.price})`);
    });

    doc.save(`Booking_${booking._id}.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookingDoc.map((booking) => ({
      "Booking ID": booking._id,
      "Customer Name": booking?.customer?.user?.username,
      "Service": booking.service,
      "Total Price": booking.totalPrice,
      "Status": booking.status,
      "Date & Time": new Date(booking.updatedAt).toLocaleString(),
      "Payment Mode": booking.payments.mode === 'ONLINE' ? `ONLINE (ID: ${booking.payments.paymentId})` : 'COD',
      "Products": booking.products.map(product => `${product.name} (Count: ${product.count}, Price: ₹${product.price})`).join(", ")
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings.xlsx");
  };

  return (
    <section className="w-screen md:w-full gap-4 flex flex-col">
      <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
        <p className="text-xl md:text-2xl font-bold">Booking Details</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded md:mt-0"
          onClick={downloadExcel}
        >
          Download All
        </button>
      </div>
      <div className="relative border border-gray-800  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-gray-800 uppercase bg-slate-100 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Products</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Date & Time</th>
              <th scope="col" className="px-6 py-3">Payment Mode</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
          {bookingDoc && bookingDoc.length > 0 ? (
            bookingDoc.map((booking, index) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                <td className="px-6 py-4">{booking?.customer?.user?.username}</td>
                <td className="px-6 py-4">
                  {booking?.products.map((product, prodIndex) => (
                    <div key={prodIndex}>
                      {product?.name} (Count: {product?.count}, Price: ₹{product?.price})
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">₹ {booking?.totalPrice}/-</td>
                <td className="px-6 py-4">{booking?.status}</td>
                <td className="px-6 py-4">{new Date(booking.updatedAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  {booking?.payments?.mode === 'ONLINE' ? (
                    <>
                      {booking?.payments?.mode} <br />(ID: {booking?.payments?.paymentId})
                    </>
                  ) : (
                    booking?.payments?.mode
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    onClick={() => downloadBookingPDF(booking)}
                  >
                    <FaDownload/>
                  </button>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No Data about Bookings Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="border bg-[#D9D9D9] rounded-full flex justify-center">
          <button
            className="focus:outline-none text-black p-2 text-2xl"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <p className="p-2">
            {currentPage} / {totalPages}
          </p>
          <button
            className="focus:outline-none text-black p-2 text-2xl"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllBooking;

