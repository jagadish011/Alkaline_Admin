import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Home = () => {
  const [bookingDoc, setBookingDoc] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  const [currentView, setCurrentView] = useState("total");
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [paymentId, setPaymentId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getTodayDate = new Date();

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const getBookingByDate = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}booking/getBookingForDate?date=${todayDate}&page=${currentPage}&pageSize=10&sortField=bookingDateTime&sortOrder=desc`
      );
      // const response = await axios.get(
      //   `${BASE_URL}booking/getBookingForDate?date=2024-7-15&page=${currentPage}&pageSize=10&sortField=bookingDateTime&sortOrder=desc`
      // );
      console.log(response?.data);
      setBookingDoc(response?.data?.bookingDoc || []);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const formattedDate = formatDate(getTodayDate);
    setTodayDate(formattedDate);
  }, []);

  useEffect(() => {
    if (todayDate) {
      getBookingByDate();
    }
  }, [todayDate]);

  const pendingBookings = bookingDoc.filter(
    (booking) => booking.status !== "COMPLETED"
  );
  const completedBookings = bookingDoc.filter(
    (booking) =>
      booking.status === "COMPLETED" &&
      booking.payments.paymentId !== "CASH_ON_DELIVERY"
  );
  const completedBookingPaymentCOD = bookingDoc.filter(
    (booking) =>
      booking.status === "COMPLETED" &&
      booking.payments.paymentId === "CASH_ON_DELIVERY" &&
      booking.payments.mode === "OFFLINE"
  );

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderBookings = () => {
    let bookingsToDisplay = [];

    switch (currentView) {
      case "pending":
        bookingsToDisplay = pendingBookings;
        break;
      case "completed":
        bookingsToDisplay = completedBookings;
        break;
      case "completedBookingPaymentCOD":
        bookingsToDisplay = completedBookingPaymentCOD;
        break;
      case "total":
      default:
        bookingsToDisplay = bookingDoc;
        break;
    }

    useEffect(() => {}, [bookingDoc]);

    return (
      <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-300">
        {bookingsToDisplay.length === 0 ? (
          <div className="flex items-center justify-center ">
            <div className="mt-6 p-6 border border-gray-300 bg-white mb-6 shadow-md rounded-xl w-96 text-center text-gray-700">
              <h5 className="font-sans text-xl font-semibold">
                Nothing to show here
              </h5>
            </div>
          </div>
        ) : (
          bookingsToDisplay.map((booking, index) => (
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
                    Payment ID: {booking?.payments?.paymentId}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Order Details:
                  </p>
                  <div>
                    {booking?.products &&
                      booking?.products.map((product, index) => (
                        <div className="mb-4 p-4 border rounded" key={index}>
                          <p>Product Name: {product?.name}</p>
                          <p>
                            Ordered Units: {product?.name}X {product?.count}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {booking.status !== "COMPLETED" && (
                  <div className="p-6 pt-0">
                    <button
                      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/100 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      type="button"
                      onClick={() => {
                        setShowDeliveredModal(true);
                        setSelectedBookingId(booking._id);
                      }}>
                      Delivered ?
                    </button>
                  </div>
                )}

                {booking.status === "COMPLETED" &&
                  booking.payments.paymentId === "CASH_ON_DELIVERY" && (
                    <div className="p-6 pt-0">
                      <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/100 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button"
                        onClick={() => {
                          setShowPaymentModal(true);
                          setSelectedBookingId(booking._id);
                          console.log(selectedBookingId);
                        }}>
                        Update Payment
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const handleCloseDeliveredModal = () => setShowDeliveredModal(false);
  const handleDelivered = async () => {
    if (!selectedBookingId) return;
    try {
      const response = await axios.post(
        `${BASE_URL}booking/complete/${selectedBookingId}`
      );
      console.log(response?.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setShowDeliveredModal(false);
    setSuccessMessage("Order marked as delivered!");
  };

  const handleClosePaymentModal = () => setShowPaymentModal(false);
  const handleUpdatePayment = async (e) => {
    if (!selectedBookingId) return;
    e.preventDefault();
    const reqBody = {
      paymentId: paymentId,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}booking/updatePaymentIdForCompletedBooking/${selectedBookingId}`,
        reqBody
      );

      console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
    setShowPaymentModal(false);
    setSuccessMessage("Payment updated successfully!");
  };

  return (
    <>
      <section className="w-screen md:w-full gap-4 flex flex-col">
        <p className="text-xl md:text-2xl font-bold">Orders Today</p>
        <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
          <button
            onClick={() => handleViewChange("total")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Total Orders Today {bookingDoc.length}
            </span>
          </button>
          <button
            onClick={() => handleViewChange("pending")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Pending Orders {pendingBookings.length}
            </span>
          </button>
          <button
            onClick={() => handleViewChange("completed")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Orders and Payment Done {completedBookings.length}
            </span>
          </button>
          <button
            onClick={() => handleViewChange("completedBookingPaymentCOD")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Payment remaining {completedBookingPaymentCOD.length}
            </span>
          </button>
        </div>
        {renderBookings()}
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

      {/* Delivered Modal */}
      {showDeliveredModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirm Delivery
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure this order is delivered?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCloseDeliveredModal}>
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
                  onClick={handleDelivered}>
                  Delivered
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Update Payment
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-lg text-black font-medium">
                  Input the Transaction(UTR) number if paid online or
                  <br />
                  "COD" IF PAID IN CASH
                </p>
                <input
                  className="text-lg text-black font-medium"
                  type="text"
                  placeholder="Enter UTR Number or COD"
                  required
                  // value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleClosePaymentModal}>
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
                  onClick={handleUpdatePayment}>
                  Update Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border shadow-lg p-4 rounded-md">
            <p>{successMessage}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
              onClick={() => setSuccessMessage("")}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
