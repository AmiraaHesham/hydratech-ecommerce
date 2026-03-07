"use client";
import { MdDelete, MdOutlineDownloading } from "react-icons/md";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext.js";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { IoReloadCircle } from "react-icons/io5";
export default function Orders_Table() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageNum = useRef(0); // العنصر المراقب في الأسفل

  const getAllOrders = useCallback(async () => {
    try {
      const response = await postRequest(
        "/api/orders/search",
        {
          page: pageNum.current,
          size: 10,
        },
        "",
      );
      const resOrders = response.data || [];

      if (pageNum.current === 0) {
        setOrders(resOrders);
      } else setOrders((prev) => [...prev, ...resOrders]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllOrders(0);
  }, []);
  return (
    <div className=" rounded-xl w-full  h-[500px] mt-5  border  overflow-hidden overflow-x-scroll overflow-y-scroll ">
      <table className="  xs:w-[200%] lg:w-full   ">
        <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
          <tr className=" text-gray-500 h-12">
            {/* <th className="w-[2%] "></th> */}
            <th className="w-[20%] px-5 ">{t("order_id")}</th>
            <th className="w-[15%] ">{t("date")}</th>
            <th className="w-[25%] ">{t("user")}</th>
            <th className="w-[15%] ">{t("items")}</th>
            <th className="w-[15%] ">{t("total")}</th>
            <th className="w-[20%] ">{t("state_order")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-md w-full ">
          {loading
            ? // Skeleton rows
              [...Array(7)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-b h-12">
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                  </td>

                  {/* <td className="px-4 py-2 flex items-center gap-2">
                    <div className="h-12 bg-gray-200 rounded-full animate-pulse w-12"></div>
                    <div className="flex flex-col gap-2">
                    <div  className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                    <div  className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                    </div>
                  </td> */}
                  {/* <td className="px-4 py-2"><div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div></td> */}
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-10 bg-gray-200 rounded-full animate-pulse w-10"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                </tr>
              ))
            : orders.map((order, index) => {
               const date = new Date(order.createdDate);
            const dateOnly = date.toLocaleDateString("en-US");
                return (
                  <tr
                    key={index}
                    className=" text-blue-950 border w-full hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate.push(
                        `/admin/pages/orders_page/OrderDetailsPage/${order.orderId}`,
                      )
                    }
                  >
                    <td className="font-semibold text-red-500 px-5">
                      {order.code}
                    </td>
                    <td className="text-sm">{dateOnly}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="w-[40px] h-[40px] text-gray-600 my-2  bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                          <FaUserLarge />
                        </span>
                        <div>
                          <h1 className="font-semibold text-sm">
                            {order.user.firstName + " " + order.user.lastName}
                          </h1>
                          <h1 className="text-xs  text-gray-500">
                            {order.user.email}
                          </h1>
                        </div>
                      </div>
                    </td>

                    <td className="text-sm ">
                      <span className="py-2 px-5 font-semibold rounded-full   bg-red-100 text-red-600">
                        {order.orderItemLines.length}
                      </span>
                    </td>
                    <td className="text-sm font-bold">
                      {order.total.toLocaleString("en-US")} {t("currency")}
                    </td>
                    <td
                      className={`text-xs font-semibold ${order.state === "PROCESSING" ? "text-blue-500" : "text-red-500"}`}
                    >
                      {t(order.state)}
                    </td>
                  </tr>
                );
              })}
          {orders.length <= 10 ? (
            " "
          ) : (
            <tr className="h-5 text-center">
              <td colSpan="6" >
                <button
                  className=" text-red-600 w-[100px] py-1 text-center  my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllOrders();
                  }}
                >
                  <IoReloadCircle className="text-4xl"  /> 

                </button>
              </td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
}
