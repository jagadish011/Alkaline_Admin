import React, {useState, useEffect} from "react";
// import waterdroplet from "../constants/assets/waterdroplet.jpg";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { Bounce, toast } from "react-toastify";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}user/login`, reqBody);
      console.log(res.data);
      setAuth(res.data.data);
      setRole(res.data.userDoc.role);
      sessionStorage.setItem("user_id", res.data.userDoc._id);
      sessionStorage.setItem("role", res.data.userDoc.role);
      if (res.data.userDoc.role === "ADMIN") {
        navigate("/admin");
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
      console.error(error, {
        msg: "Could not login",
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phone, password);
    handleLogin({ phone, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col">
        <div className="w-screen md:w-full bg-background p-5 flex justify-between px-10">
          {/* <img src={waterdroplet} className="h-screen w-full" /> */}
          <div className="relative flex flex-col text-gray-700 bg-transparent shadow-2xl p-5 rounded-xl bg-clip-border">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Admin Login
            </h4>
            <form onSubmit={handleSubmit} className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
              <div className="flex flex-col gap-6 mb-1">
                <div className="relative w-full min-w-[200px]">
                  <input
                    type="tel"
                    maxLength={10}
                    min={0}
                    className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-transparent disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="98XXXXXX89"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Phone
                  </label>
                </div>
                <div className="relative w-full min-w-[200px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-transparent disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <button
                className="mt-6 block w-full select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-2xl font-semibold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-[linear-gradient(125.68deg,#0B5EFF_-33.21%,#1EB6E7_62.14%)]"
                type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;