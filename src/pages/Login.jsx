import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../Hooks/useAuth.js";
import { Bounce, toast } from "react-toastify";
import "./Login.css"; 

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const reqBody = { phone, password };
    try {
      const res = await axios.post(`${BASE_URL}user/login`, reqBody);
      if (res.data.userDoc.role === "ADMIN") {
        setAuth(res?.data?.data);
        setRole(res?.data?.userDoc?.role);
        sessionStorage.setItem("auth", res?.data?.userDoc?._id);
        sessionStorage.setItem("role", res.data.userDoc.role);
        navigate("/home");
        toast.success("Yay ! , You are in", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        navigate("/unauthorized");
        toast.warn("❌, You are Unauthorized", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("😔, Sorry you could not login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Phone</label>
            <input
              type="tel"
              maxLength={10}
              min={0}
              className="input-field"
              placeholder="98XXXXXX89"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
