import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import debounce from "lodash/debounce";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

const AdminCustomer = () => {
  const [customerDoc, setCustomerDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchCustomers = useCallback(
    debounce(async () => {
      try {
        const url = `${BASE_URL}customer/getAllCustomers?page=${currentPage}&pageSize=10&sortField=firstName&sortOrder=asc`;
        const res = await axios.get(url);
        console.log("API Response:", res.data);
        setCustomerDoc(res.data.customerDoc);
        setTotalPages(res.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch customer data.");
      }
    }, 300),
    [currentPage]
  );

  useEffect(() => {
    fetchCustomers();
    return () => fetchCustomers.cancel(); 
  }, [fetchCustomers]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const downloadCustomerPDF = (customer) => {
    console.log("Downloading PDF for customer:", customer);
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text('Customer Details', 105, 20, null, null, 'center');

    const lineHeight = 10;
    let currentY = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const boxWidth = pageWidth - 2 * margin;
    const padding = 5;
    const numberOfDetails = 7;
    const outlineHeight = (lineHeight * numberOfDetails) + 2 * padding;

    doc.setDrawColor(0);
    doc.rect(margin - padding, currentY - 6 - padding, boxWidth + 2 * padding, outlineHeight, 'S');

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

    addDetail('First Name:', customer.firstName, true);
    addDetail('Last Name:', customer.lastName, true);
    addDetail('Shop Number:', customer.shopNumber);
    addDetail('Shop Name:', customer.shopName);
    addDetail('Shop Address:', customer.shopAddress);
    addDetail('Pincode:', customer.pincode);
    addDetail('Landmark:', customer.landmark);

    doc.save(`${customer.firstName}_${customer.lastName}.pdf`);
    console.log("PDF saved");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customerDoc);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  return (
    <section className="w-screen md:w-full gap-4 flex flex-col">
      <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
        <p className="text-xl md:text-2xl font-bold">Customer Details</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded md:mt-0"
          onClick={downloadExcel}
        >
          Download All
        </button>
      </div>
      <div className="relative border  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-gray-800 uppercase bg-slate-100 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">First Name</th>
              <th scope="col" className="px-6 py-3">Last Name</th>
              <th scope="col" className="px-6 py-3">Shop Number</th>
              <th scope="col" className="px-6 py-3">Shop Name</th>
              <th scope="col" className="px-6 py-3">Shop Address</th>
              <th scope="col" className="px-6 py-3">Pincode</th>
              <th scope="col" className="px-6 py-3">Landmark</th>
              <th scope="col" className="px-6 py-3">User Details</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerDoc && customerDoc.length > 0 ? (
              customerDoc.map((customer, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-6 py-4">{customer.firstName}</td>
                  <td className="px-6 py-4">{customer.lastName}</td>
                  <td className="px-6 py-4">{customer.shopNumber}</td>
                  <td className="px-6 py-4">{customer.shopName}</td>
                  <td className="px-6 py-4">{customer.shopAddress}</td>
                  <td className="px-6 py-4">{customer.pincode}</td>
                  <td className="px-6 py-4">{customer.landmark}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-indigo-700 hover:bg-indigo-500 text-white text-xs font-normal p-1.5 rounded-md"
                      onClick={() => navigate(`/customerDetails/${customer._id}`)}
                    >
                      View More
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-indigo-700 hover:bg-indigo-500 text-white text-xs font-normal p-1.5 rounded-md"
                      onClick={() => downloadCustomerPDF(customer)}
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">No Data about Customers Available</td>
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

export default AdminCustomer;
