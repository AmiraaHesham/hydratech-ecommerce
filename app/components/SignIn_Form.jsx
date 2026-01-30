"use client";
import { MdEmail, MdLanguage } from "react-icons/md";
import { FaEyeSlash, FaUserLarge } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
// import { loginUser } from '../../utils/auth';

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";

export default function SignIn() {
  const navigate = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          username: username,
          password: password,
        },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("id", response.data.userDetails.userId);
      localStorage.setItem("firstName", response.data.userDetails.firstName);
      localStorage.setItem("lastName", response.data.userDetails.lastName);
      localStorage.setItem("address", response.data.userDetails.address);
      localStorage.setItem("phone", response.data.userDetails.phone);
      localStorage.setItem("email", response.data.userDetails.email);
      localStorage.setItem("username", response.data.userDetails.username);
      localStorage.setItem("role", response.data.userDetails.role);
      if (response.data.userDetails.role === "ADMIN") {
        navigate.push("/admin/pages/Dashboard");
      } else navigate.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen  flex justify-center items-center">
      <div className="bg-white h-full w-[80%] rounded-lg shadow-lg px-10 py-10">
        <div className="h-full bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-3xl my-3 font-semibold font-serif">
                {t("welcomeBack")}
              </h3>
              <h4 className="text-sm text-gray-500 font-serif">
                {t("welcomeMessage")}
              </h4>
            </div>
            <div className="flex items-center gap-1 mx-5  ">
              <span className="text-red-600 text-2xl ">
                <MdLanguage />
              </span>

              <select
                className="w-[80px] rounded text-white bg-red-700  py-1  px-1"
                value={locale} // افترض أن عندك متغير اسمه lang (مثل 'AR' أو 'EN')
                onChange={(e) => {
                  const newLang = e.target.value;
                  setLocale(newLang);
                }}
              >
                <option value="ar" className="bg-white text-red-500">
                  العربية
                </option>
                <option value="en" className="bg-white text-red-500">
                  English
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center  mt-20">
            <div className="flex flex-col gap-7 w-[80%]">
              <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
                  {/* <label className="text-gray-500">Email Address</label>    */}
                  <input
                    className=" w-full px-3 outline-none"
                    placeholder="Enter your email or username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className="text-xl text-gray-700">
                    <FaUserLarge />
                  </span>
                </div>

                <div className="flex w-full px-2 rounded-md h-10 border items-center gap-3">
                  {/* <label className="text-gray-500">Email Address</label>    */}
                  <input
                    className=" w-full px-3 outline-none"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="text-xl text-gray-700">
                    <FaEyeSlash />
                  </span>
                </div>
                <h1 className="text-red-500 text-sm">{t("forgotPassword")} </h1>
                <hr className="h-1"></hr>
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-md h-10 "
                >
                  {loading ? t("loggingIn") : t("login")}
                </button>
                <Link href="/signup">
                  <span className="flex justify-center items-center text-sm text-gray-500 font-serif">
                    {t("createNewAccount")}
                  </span>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <Image
          src="/Images/imageSignUp.png"
          alt="Background Image"
          width={500}
          height={500}
          priority
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
