"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdLock, MdPhoneEnabled } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";
import Select from "react-select";
import { useLanguage } from "../../../context/LanguageContext";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { getRequest, putRequest } from "../../../utils/requestsUtils";
export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useRouter();
  const { t } = useLanguage();
  const [governorates, setGovernorates] = useState([]);
  const [value, setValue] = useState(null);

  const getGovernorate = async () => {
    const res = await getRequest("/api/public/governorates");
    const formatted = res.map((item) => ({
      value: item.governorateId,
      label: localStorage.getItem("lang") === "ar" ? item.nameAr : item.nameEn,
    }));
    setGovernorates(formatted);
  };
  useEffect(() => {
    getGovernorate();
    const firstName =
      typeof window !== "undefined" ? localStorage.getItem("firstName") : "";
    setFirstName(firstName);
    const lastName =
      typeof window !== "undefined" ? localStorage.getItem("lastName") : "";
    setLastName(lastName);
    const username =
      typeof window !== "undefined" ? localStorage.getItem("username") : "";
    setUsername(username);
    const address =
      typeof window !== "undefined" ? localStorage.getItem("address") : "";
    setAddress(address);
    const phone =
      typeof window !== "undefined" ? localStorage.getItem("phone") : "";
    setPhone(phone);
    const emailAdress =
      typeof window !== "undefined" ? localStorage.getItem("email") : "";
    setEmail(emailAdress);
  }, []);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const updateProfileInfo = async (e) => {
    e.preventDefault();
    const res = await putRequest(
      `/api/users/${userId}`,
      {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        governorateId: value ? value.value : null,
      },
      t("message_EditText")
    );
    console.log(res);
  };

  return (
    <div className="p-10">
      <div className="flex h-full gap-10 justify-between">
        <div className="bg-white w-[30%] h-[400px] md:flex xs:hidden flex-col gap-3   p-10 rounded-md shadow-md">
          <div className="flex items-center bg-blue-600 p-2 rounded-md text-white gap-3 cursor-pointer">
            <span className="text-xl">
              <FaUser />
            </span>
            <span>{t("personalAccount")} </span>
          </div>
          <Link href="/user/ordershistory">
            <div className="flex items-center hover:bg-blue-600 p-2 rounded-md hover:text-white text-gray-600 gap-3 cursor-pointer">
              <span className="text-2xl">
                <RiShoppingBag4Fill />
              </span>
              <span> {t("orderHistory")} </span>
            </div>
          </Link>
          <Link href="/user/wishlist">
            <div className="flex items-center hover:bg-blue-600 p-2 rounded-md hover:text-white text-gray-600 gap-3 cursor-pointer">
              <span className="text-xl">
                <FaHeart />
              </span>
              <span> {t("wishlist")} </span>
            </div>
          </Link>
          <hr className="my-10"></hr>
          <div className="flex justify-start cursor-pointer hover:scale-105 duration-200 items-center gap-1  text-red-600">
            <span>
              <PiSignOutBold />
            </span>
            <span
              onClick={() => {
                typeof window !== "undefined"
                  ? localStorage.setItem("id", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("accessToken", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("address", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("email", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("firstName", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("lastName", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("phone", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("role", "")
                  : "";
                typeof window !== "undefined"
                  ? localStorage.setItem("username", "")
                  : "";
                navigate.push("/signin");
              }}
            >
              {t("logout")}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full  bg-white rounded-md shadow-sm border p-5">
            <div className="flex w-full flex-col gap-7">
              <div className="flex justify-between w-full">
                <span className="text-xl font-semibold">
                  {firstName + " " + lastName}
                </span>
                <span className="bg-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 rounded-md">
                  {t("unverifiedAccount")}
                </span>
              </div>

              <div className="flex md:flex-row xs:flex-col gap-5 text-gray-600">
                <span className="flex items-center gap-1">
                  <MdEmail />
                  {email}
                </span>
                <span className="flex items-center gap-1">
                  <MdPhoneEnabled />
                  {phone}
                </span>
                <span className="flex items-center gap-1">
                  <IoLocationSharp />
                  {address}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full  bg-white rounded-md shadow-sm border">
            <div className="p-7  font-semibold">
              <span className=""> {t("editPersonalInfo")} </span>
            </div>
            <hr></hr>
            <form className="p-7" onSubmit={updateProfileInfo}>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {t("firstName")}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="bg-slate-50 outline-none  p-2 rounded-lg border "
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {t("lastName")}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="bg-slate-50 outline-none  p-2 rounded-lg border "
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {/* <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="text"
                    value={email}
                    className="bg-slate-50 p- outline-none p-2 rounded-lg border "
                  />
                </div> */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {t("phoneNumber")}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    className="bg-slate-50 p- outline-none p-2 rounded-lg border "
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {t("address")}
                  </label>
                  <input
                    type="text"
                    value={address}
                    className="bg-slate-50  outline-none p-2 rounded-lg border "
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {t("governorate")}
                  </label>
                  <Select
                    options={governorates}
                    value={value}
                    onChange={setValue}
                    placeholder={t("selectGovernorate")}
                    classNames={{
                      control: () =>
                        "bg-slate-50 border  rounded-lg h-10  hover:border-indigo-500",
                      menu: () =>
                        "bg-slate-900 border border-slate-700 rounded-xl mt-2",
                      option: ({ isFocused, isSelected }) =>
                        `px-3 py-2 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : isFocused
                            ? "bg-indigo-500 text-white"
                            : "text-gray-300"
                        }`,
                      placeholder: () => "text-slate-400",
                      singleValue: () => "text-white",
                    }}
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 duration-150 rounded-md text-sm font-semibold"
                >
                  {t("saveChanges")}
                </button>
                <button className="text-gray-600 font-semibold text-sm"></button>
              </div>
            </form>
          </div>
          <div className="w-full h-[100px] bg-white rounded-md shadow-sm border mb-10">
            <div className="p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="p-3 text-xl rounded-full text-gray-600 bg-gray-100">
                  <MdLock />
                </span>
                <span>{t("password")} </span>
              </div>
              <button
                className="text-blue-500 text-sm font-semibold"
                onClick={() => {
                  const resetpasswordform =
                    document.querySelector("#resetpasswordform");
                  resetpasswordform.classList.remove("hidden");
                  resetpasswordform.classList.add("flex");
                }}
              >
                {t("updatePassword")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
