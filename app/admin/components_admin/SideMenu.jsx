"use client";
import { MdDashboard } from "react-icons/md";
import { IoFileTray } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { MdContactSupport } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { MdElectricBolt } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";
import Image from "next/image.js";
export default function SideMenu({
  dashbord,
  homepage,
  categoryies,
  products,
  orders,
  users,
  admins,
  contact,
}) {
  const [username , setUsername] = useState()
  useEffect(() => {
    // جلب اسم المستخدم من localStorage
    const savedUsername =  localStorage.getItem("firstName") + " " + localStorage.getItem("lastName") || '';
    setUsername(savedUsername);
  }, []);
  // const username =
  //  typeof window !== 'undefined'? localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"):null;
  // const adminId = localStorage.getItem("id");

  const { t } = useLanguage();
  // const checkAdmin = useCallback(() => {
  //   const dashboardTab = document.querySelector("#dashboardTabTab");
  //   const adminsTab = document.querySelector("#adminsTab");
  //   if (adminId != "1") {
  //     dashboardTab.classList.add("hidden");
  //     adminsTab.classList.add("hidden");
  //   }
  // },[adminId])
  // useEffect(()=>{
  //   checkAdmin()
  // },[checkAdmin])
  return (
    <div className="  xs:w-[60px] md:w-[300px]  bg-[#ffffff]">
      <div className=" h-screen   ">
        <div className="flex  items-center xs:justify-center md:justify-start md:mx-5 xs:mx-0 gap-1 xs:mt-2 md:mt-5">
 <span className="p-2 rounded-md  ">
            <Image
              src="/Images/logo.png"
              alt="logo"
              width={35}
              height={35}
              priority
            />
          </span>   
          <div className="cursor-default md:block xs:hidden">
            <h1 className="text-md  text-blue-950 font-semibold font-sans">
              <span className="text-sm  font-bold">{username === "" ? "" : username}</span>
            </h1>
            <h1 className="text-xs text-blue-950">{t("super_admin")}</h1>
          </div>
        </div>
{/* <hr></hr> */}
        <div className="mt-9 flex flex-col gap-1 text-gray-600">
          <Link href="/admin/pages/Dashboard">
            <div
              id="dashboardTab"
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${dashbord}`}
            >
              <span className="text-2xl ">
                <MdDashboard />
              </span>
              <h1 className="text-md xs:hidden md:block ">{t("dashboard")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/HomePage">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md  cursor-pointer hover:bg-red-100 hover:text-red-500
        ${homepage}`}
            >
              <span className="text-2xl ">
                <RiPagesFill />
              </span>
              <h1 className="text-md xs:hidden md:block ">{t("homepage")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/Categoryies">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500
         ${categoryies} `}
            >
              <span className="text-2xl ">
                <MdCategory />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("categories")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/Products">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md cursor-pointer  hover:bg-red-100 hover:text-red-500
                 ${products}`}
            >
              <span className="text-2xl ">
                <IoFileTray />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("products")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/orders_page/Orders">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md  cursor-pointer hover:bg-red-100 hover:text-red-500
                ${orders} `}
            >
              <span className="text-2xl ">
                <MdOutlineShoppingCart />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("orders")}</h1>
            </div>
          </Link>

          <Link href="/admin/UsersPage/Users">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500
             ${users}`}
            >
              <span className="text-2xl ">
                <ImUsers />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("users")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/Admins">
            <div id="adminsTab"
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500
             ${admins}`}
            >
              <span className="text-2xl">
                <MdAdminPanelSettings />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("admins")}</h1>
            </div>
          </Link>

          <Link href="/admin/pages/Contact">
            <div
              className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${contact}`}
            >
              <span className="text-2xl">
                <MdContactSupport />
              </span>
              <h1 className="text-md xs:hidden md:block">{t("contact")}</h1>
            </div>
          </Link>
        </div>
        {/* <div className="flex justify-center ">
        <button>Logout</button>
       </div> */}
      </div>
    </div>
  );
}
