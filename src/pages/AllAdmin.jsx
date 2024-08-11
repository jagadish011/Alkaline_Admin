import { debounce } from 'lodash';
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { IoTrashBin } from 'react-icons/io5';

const AllAdmin = () => {

    const [userDoc, setUserDoc] = useState([])
    const navigate = useNavigate();

    const fetchingUsers = useCallback(debounce(async()=>{
        try {
            const res = await axios.get(`${BASE_URL}user/getAllAdmins`);
            console.log(res.data);
            setUserDoc(res?.data?.admins)
        } catch (error) {
            console.error("error", error);
            toast.error("Error getting the data.")
        }
    }, 300))

    useEffect(() => {
        fetchingUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
          const confirmDelete = window.confirm("Are you sure you want to delete this User?");
          if (confirmDelete) {
            await axios.delete(`${BASE_URL}user/deleteUser/${userId}`);
            setCustomerDoc((prevDocs) => prevDocs.filter((user) => user._id !== userId));
            toast.success("Customer deleted successfully.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete User.");
        }
      };
  return (
<>
<section className="w-screen md:w-full gap-4 flex flex-col">
      <div className="w-full bg-background flex flex-col md:flex-row justify-between md:px-10">
        <p className="text-xl md:text-2xl font-bold">All Admins</p>

      </div>
      <div className="relative border  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-gray-800 uppercase bg-slate-100 border-b border-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Admin  Fullname</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {userDoc && userDoc.length > 0 ? (
              userDoc.map((user, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4 flex gap-8 items-center">
                    <IoTrashBin
                      className="text-red-500 text-2xl cursor-pointer"
                      onClick={() => deleteUser(user._id)}
                    />
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
      {/* <div className="mt-10 flex justify-center">
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
      </div> */}
    </section></>
  )
}

export default AllAdmin
