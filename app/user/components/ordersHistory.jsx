"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { VscCircleFilled } from "react-icons/vsc";
import { postRequest } from "../../../utils/requestsUtils";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "../../../context/LanguageContext";
import { useRouter } from "next/navigation";
export default function OrdersHistory() {
  const {t} = useLanguage()
  const [orders, setOrders] = useState([]);
  const [inputSearch, setInputSearch] = useState(null);
  const [state, setState] = useState(null);
  const [length, setLength] = useState();
    const navigate = useRouter();

  const getOrders = async () => {
    const res = await postRequest(
      "/api/orders/search",
      {
        page: 0,
        size: 100,
        searchText: inputSearch,
        orderState:state
      },
      "",
    );
    console.log(res.data);
    setOrders(res.data);
    // setLength(res.data.length)

  };

  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: false,
    });
    getOrders();
  }, []);
  return (
    <div data-aos="fade-up" >
      <div className="flex justify-between items-center  mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">{t('orderHistory')} </span>
          <span className=" text-gray-500 opacity-90">
            {t('trackAndManage')}
          </span>
        </div>
        <div className="flex justify-start items-center bg-white border rounded-md">
          <span className="text-gray-500 h-full  rounded-s-md text-2xl p-2 ">
            <IoMdSearch />
          </span>
          <input
            type="text"
            placeholder= {t("searchByOrderNumber")}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getOrders();
              }
            }}
            className="w-[300px] bg-none p-2 outline-none rounded-lg"
          />
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-10 text-lg items-center  text-gray-500">
          <span
            className="text-red-600 border-b hover:text-red-600 hover:border-red-600 border-red-600 py-4 cursor-pointer "
            onClick={() => {
              setState(null);
              getOrders();
            }}
          >
           {t('allOrders')}
          </span>
          <span
            className=" border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer"
            onClick={() => {
              setState("PENDING");
              getOrders();
            }}
          >
           {t('pending')}
          </span>
          <span
            className=" border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer"
            onClick={() => {
              setState("PROCESSING");
              getOrders();
            }}
          >
         {t('processing')}
                   </span>
          <span
            className="border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer"
            onClick={() => {
              setState("SHIPPED");
              getOrders();
            }}
          >
           {t('shipped')}
          </span>
          <span
            className=" border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer "
            onClick={() => {
              setState("");
              getOrders();
            }}
          >
           {t('delivered')}
          </span>
        </div>
        <hr className=""></hr>
      </div>
      <div className="py-5 flex flex-col gap-5">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="w-full bg-white   rounded-md shadow-sm p-5"
              onClick={()=>{
 navigate.push(`/user/orderdetails/${order.orderId}`);              }}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <span className="p-1 text-sm text-gray-700 rounded-md font-semibold bg-gray-100">
                    {order.code}
                  </span>
                  <span className="p-1 text-sm text-gray-700 rounded-md font-semibold flex  items-center gap-2">
                    <FaRegCalendar /> 12-1-2023
                  </span>
                  <span className={`flex items-center ${order.state === "PROCESSING" ? 'text-blue-600':' text-red-600 '} `}>
                    <VscCircleFilled />
                    {t(order.state)}
                  </span>
                </div>
                <div className="flex items-center gap-1 mx-5">
                  <span className=" text-gray-600">الإجمالي: </span>
                  <span className="text-xl font-semibold">
                    {order.total} {t("currency")}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-5 w-[80%]">
                  {order.orderItemLines.map((itemLine, index) => {
                    return (
                      <div
                        className="bg-gray-50 p-2 rounded-md flex items-center gap-5"
                        key={index}
                      >
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                            itemLine.item.mainImageURL
                          }
                          alt=""
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="">{localStorage.lang == 'ar'?itemLine.item.nameAr:itemLine.item.nameEn}</span>
                          <div className="flex gap-5 mt-2">
                            <span className="text-gray-500 text-sm ">
                             {t('code')} : {itemLine.item.code}
                            </span>
                            <span className="text-gray-500 text-sm ">
                             {t('quantity')} : {itemLine.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <div className="w-[200px] mx-5 mt-10">
                  <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full">
                    تتبع الشحنة
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
