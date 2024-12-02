import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const [userDoc, setUserDoc] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const id = sessionStorage.getItem("user_id");
  const navigate = useNavigate();

  const getUserById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/getUserById/${id}`);
      console.log(res?.data);
      setUserDoc(res?.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <div
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 48 48">
          <path d="M24 4A10 10 0 1024 24 10 10 0 1024 4zM36.021 28H11.979C9.785 28 8 29.785 8 31.979V33.5c0 3.312 1.885 6.176 5.307 8.063C16.154 43.135 19.952 44 24 44c7.706 0 16-3.286 16-10.5v-1.521C40 29.785 38.215 28 36.021 28z"></path>
        </svg>
        Profile
      </div>

      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{userDoc?.username}</div>
            <div className="font-medium truncate">{userDoc?.phone}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Role : <span>{userDoc?.role}</span>
              </a>
            </li>
            <li>
              <a
                href="/revenue"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
