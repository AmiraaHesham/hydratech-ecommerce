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
export default function Orders_Table() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageNum = useRef(0); // العنصر المراقب في الأسفل

  const getAllOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await postRequest(
        "/api/orders/search",
        {
          page: pageNum.current,
          size: 15,
        },
        "",
      );
      const resProducts = response.data || [];

      if (pageNum.current === 0) {
        setOrders(resProducts);
      } else setOrders((prev) => [...prev, ...resProducts]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllOrders(0);
  }, []);
  return (
    <div className=" rounded-xl w-full  h-screen my-5 border  overflow-hidden overflow-x-scroll overflow-y-scroll ">
      <table className="  xs:w-[200%] lg:w-full   ">
        <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
          <tr className=" text-gray-500 h-12">
            <th className="w-[2%] "></th>
            <th className="w-[20%]">{t("order_id")}</th>
            <th className="w-[15%]">{t("date")}</th>
            <th className="w-[30%] ">{t("user")}</th>
            <th className="w-[10%] ">{t("items")}</th>
            <th className="w-[15%] ">{t("total")}</th>
            <th className="w-[25%] ">{t("state_order")}</th>
          </tr>
        </thead>
        <tbody className="bg-white text-md w-full ">
          {orders.map((order, index) => {
            return (
              <tr
                key={index}
                className=" text-blue-950 border w-full hover:bg-gray-50"
                onClick={() =>
                  navigate.push(
                    `/admin/pages/orders_page/OrderDetailsPage/${order.orderId}`,
                  )
                }
              >
                <td></td>
                <td className="font-semibold text-red-500">{order.code}</td>
                <td className="text-sm">Oct 24, 2023</td>
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
          {orders.length <= 13 ? (
            " "
          ) : (
            <tr className="h-5 text-center">
              <td colSpan="6">
                <button
                  className="bg-red-600 text-white px-5 py-1 flex  my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllProducts();
                  }}
                >
                  <MdOutlineDownloading className="text-3xl" /> المزيد
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
