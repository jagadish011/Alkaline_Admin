import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsWindowSidebar } from "react-icons/bs";
import { LuGripHorizontal } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Outlet } from "react-router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setShowVerification(location.pathname === "/driver");
  }, [location]);

  return (
    <>
      <div>
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <span className="sr-only">Open sidebar</span>
          <LuGripHorizontal className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#101223] transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 ">
            <button
              onClick={toggleSidebar}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 focus:outline-none lg:hidden"
            >
              <RxCross2 />
            </button>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/home"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/home" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <BsWindowSidebar />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/allCustomer"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/allCustomer" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <FaPeopleGroup />
                  <span className="ms-3">All Customers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/addCustomer"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/addCustomer" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <IoPersonAddOutline />
                  <span className="ms-3">Add Customer</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/allBookings"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/allBookings" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <IoMdBook />
                  <span className="ms-3">All Bookings</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/bookings"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/bookings" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <CiCalendarDate />
                  <span className="ms-3">Bookings Date</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/profile" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <CgProfile />
                  <span className="ms-3">Profile</span>
                </Link>
              </li>

              <li className="mt-16">
                <Link
                  to="/login"
                  className={`flex items-center p-2 text-white rounded-xl hover:bg-[#0D58A6] group px-10 text-lg ${
                    location.pathname === "/login" ? "bg-[#0D58A6]" : ""
                  }`}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="px-4 md:px-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
