"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../utils/requestsUtils";
import { LuLoader } from "react-icons/lu";

import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Select from "react-select";
export default function Cart() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [netTotalOrder, setNetTotalOrder] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [itemNum, setItemNum] = useState(0);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const [isFirstAction, setIsFirstAction] = useState(true);
  const [loading, setLoading] = useState(true);
  const [deliveryMethod, setdeliveryMethod] = useState(null);
  const [places, setPlaces] = useState([]);
  const [address, setAddress] = useState("");
  const [pickupPlace, setPickupPlace] = useState(null);
  const navigate = useRouter();
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const getProductInCart = async () => {
    try {
      const res = await getRequest(`/api/shopCarts/${userId}`);
      setItems(res.itemLines);
      console.log(res);
      console.log(res.itemLines);
      setTotalOrder(res.total);
      setItemNum(res.itemLines.length);
      setTotalDiscount(res.totalDiscount);
      setNetTotalOrder(res.netTotal);
      setTotalShippingCost(res.totalShippingCost);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  const changeQuantity = async (itemId, newQuantity) => {
    setLoading(true);
    try {
      await postRequest(
        `/api/shopCarts/${userId}/changeQuantity`,
        {
          itemLineId: itemId,
          quantity: newQuantity,
        },
        ""
      );
      getProductInCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemFormCart = async (itemLineId) => {
    setLoading(true);
    try {
      await deleteRequest(
        `/api/shopCarts/${userId}/deleteLine/${itemLineId}`,
        t("message_DeleteText")
      );
      getProductInCart();
    } catch (error) {
      console.log(error);
    }
  };

  const pickUpPlaces = async () => {
    try {
      const res = await postRequest("/api/public/pickUpPlaces/search", "", "");

      const formatted = res.data.map((Place) => ({
        value: Place.pickUpPlaceId,
        label:
          localStorage.getItem("lang") === "ar" ? Place.nameAr : Place.nameEn,
        address: Place.address,
      }));
      setPlaces(formatted);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const getAddress = async () => {
  //   try {
  //     // if (pickupPlace !== "") {
  //     const res = await getRequest(`/api/admin/pickUpPlaces/${pickupPlace.}`);
  //     // setAddress(res);
  //     console.log(res);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const placeOrder = async () => {
    setLoading(true);
    try {
      if (items.length != 0) {
        if (isFirstAction) {
          getProductInCart();
        } else {
          const res = await postRequest(
            `/api/orders/${userId}/placeOrder`,
            { pickUpPlaceId: pickupPlace.value },
            ""
          );
          navigate.push("/user/ordershistory");
          console.log(res);
        }
        setIsFirstAction(!isFirstAction);
      } else {
        toast.error(t("noProductsInCart"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deliveryMethodOptions = [
    { value: "shipping", label: t("DELIVERY") },
    { value: "pickup", label: t("PICKUP") },
  ];
  useEffect(() => {
    getProductInCart();
    pickUpPlaces();
  }, [pickupPlace]);
  return (
    <div className="xl:p-10 xs:p-7  ">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="flex justify-between py-5">
        <div className="">
          <h1 className="text-4xl font-bold mb-2"> {t("shoppingCart")} </h1>
          <span className="text-sm text-gray-500 font-semibold">
            {t("inYourCart") + " " + itemNum + " " + t("products")}
          </span>
        </div>
        <Link
          href="/user/home"
          className="md:text-sm xs:text-xs font-semibold text-blue-600 flex items-center gap-2"
        >
          <h1>{t("continueShopping")} </h1>
          <span className="mt-2">
            {lang === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </span>
        </Link>
      </div>
      <div className="flex lg:flex-row xs:flex-col gap-5 ">
        <div className=" rounded-xl w-full  border overflow-hidden overflow-x-auto  overflow-y-auto ">
          <table className="  xs:w-[200%] lg:w-full   ">
            <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
              <tr className=" text-gray-500 h-12">
                <th className="w-[35%] px-5">{t("product")} </th>
                <th className="w-[20%]">{t("price")} </th>
                <th className="w-[10%] ">{t("discount")} </th>
                <th className="w-[15%] px-7 ">{t("quantity")} </th>
                <th className="w-[10%] ">{t("total")} </th>
                {/* <th className="w-[20%] ">{t("shippingCost")} </th> */}
                <th className="w-[15%] px-3">{t("delete")} </th>
              </tr>
            </thead>
            <tbody className="bg-white text-md w-full  ">
              {loading ? (
                // Skeleton rows
                [...Array(5)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-14 bg-gray-200 rounded-full animate-pulse w-14"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                        <div className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                      </div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                  </tr>
                ))
              ) : items.length != 0 ? (
                items.map((product, index) => {
                  return (
                    <tr key={index} className=" text-blue-950 border w-full   ">
                      <td className="px-5">
                        <Link
                          href={`/user/pages/productdetails/${product.item.itemId}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-14 w-14 my-2">
                              <Image
                                alt=""
                                src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${product.item.mainImageURL}`}
                                width={50}
                                height={50}
                                className="rounded-full h-full w-full border my-1 p-1"
                              />
                            </div>
                            <div>
                              <h1 className="font-semibold text-sm">
                                {lang === "ar"
                                  ? product.item.nameAr
                                  : product.item.nameEn}
                              </h1>
                              <h1 className="text-xs  text-gray-500">
                                {product.item.code}
                              </h1>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="font-semibold text-blue-500">
                        <div>
                          <span>
                            {product.unitPrice.toLocaleString("en-US")}{" "}
                            {t("currency")}{" "}
                          </span>

                          {product.oldUnitPrice ? (
                            <span className="text-gray-400 line-through text-sm mx-2 opacity-90">
                              {product.oldUnitPrice.toLocaleString("en-US")}
                              {t("currency")}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="">
                        <div className="flex gap-5">
                          {product.oldUnitPrice ? (
                            <span className="bg-red-600 text-xs p-1 text-white rounded-md">
                              {t("off")}
                              {" " +
                                (
                                  ((product.oldUnitPrice - product.unitPrice) /
                                    product.oldUnitPrice) *
                                  100
                                ).toFixed()}
                              %
                            </span>
                          ) : (
                            "--"
                          )}
                        </div>
                      </td>
                      <td className="text-sm">
                        <div className="flex items-center gap-3 rounded-lg px-1 h-full w-[100px] border text-gray-600 bg-white">
                          {/* زر النقصان */}
                          <button
                            onClick={() => {
                              changeQuantity(
                                product.itemLineId,
                                product.quantity + 1
                              );
                            }}
                            className="text-xl font-bold text-gray-600  hover:text-blue-600"
                          >
                            +
                          </button>

                          {/* الرقم */}
                          <span className="font-medium text-sm w-16 text-center">
                            {product.quantity}
                          </span>

                          {/* زر الزيادة */}
                          <button
                            onClick={() => {
                              if (product.quantity > 1) {
                                changeQuantity(
                                  product.itemLineId,
                                  product.quantity - 1
                                );
                              }
                            }}
                            className="text-xl font-bold text-gray-600 hover:text-blue-600"
                          >
                            −
                          </button>
                        </div>
                      </td>
                      <td className="text-sm font-semibold">
                        {product.totalPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </td>
                      {/* <td>{product.totalShippingCost}</td> */}
                      <td className=" font-semibold text-lg text-gray-600 hover:text-red-600 px-5 cursor-pointer">
                        <button
                          className=""
                          onClick={() => {
                            deleteItemFormCart(product.itemLineId);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    {t("noProductsInCart")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className=" h-screen md:w-[40%]  xs:w-full">
          {loading ? (
            // Skeleton rows
            <div className=" h-[500px] p-7  w-full bg-white rounded-lg border">
              <h1 className="mb-10 text-2xl font-bold">{t("orderSummary")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600"> {t("totalProducts")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("totalDiscount")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("shippingCost")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between items-center text-2xl font-semibold">
                <span>{t("grandTotal")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20"></span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-md mt-10 text-white text-lg  ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {t("proceedToCheckout")}
              </button>
              <div className="flex gap-4 p-2 w-full bg-blue-50 mt-5 rounded-md">
                <span className="text-2xl text-blue-600 mt-1">
                  <AiFillSafetyCertificate />
                </span>
                <div>
                  <h1 className="text-blue-600  font-semibold">
                    {t("secureShopping")}
                  </h1>
                  <h2 className="text-gray-600 text-xs">
                    {t("protectedData")}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <div className="  p-7  w-full bg-white rounded-lg border">
              <h1 className="mb-10 text-2xl font-bold">{t("orderSummary")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">
                  {t("totalProducts") + " " + `[${itemNum}]`}
                </span>
                <span className="font-semibold">
                  {totalOrder.toLocaleString("en-US") + " " + t("currency")}{" "}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("totalDiscount")} </span>
                <span className="font-semibold text-red-700">
                  {totalDiscount.toLocaleString("en-US") +
                    "-" +
                    " " +
                    t("currency")}{" "}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("delivery_method")}</span>

                <Select
                  options={deliveryMethodOptions}
                  value={deliveryMethod}
                  onChange={(option) => {
                    setdeliveryMethod(option);
                    setPickupPlace(null);
                  }}
                  required
                  placeholder={t("choose")}
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
              <div
                className={`flex justify-between items-center mb-5 ${
                  deliveryMethod
                    ? deliveryMethod.value === "pickup"
                      ? "block"
                      : "hidden"
                    : "hidden"
                }`}
              >
                <span className="text-gray-600">{t("locations")}</span>
                <Select
                  options={places}
                  value={pickupPlace}
                  onChange={(option) => setPickupPlace(option)}
                  placeholder={t("choose")}
                  classNames={{
                    control: () =>
                      "bg-slate-50 border  rounded-lg h-10  hover:border-indigo-500",
                    menu: () =>
                      "bg-slate-900 border border-slate-700 rounded-xl mt-2 w-32",
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
              <div
                className={`flex justify-between items-center mb-5 ${
                  pickupPlace || deliveryMethod ? "block" : "hidden"
                }`}
              >
                <span className="text-gray-600">{t("address")} </span>
                <span className="font-semibold">
                  {pickupPlace ? pickupPlace.address : localStorage.address}
                </span>
              </div>
              <div
                className={`flex justify-between items-center ${
                  deliveryMethod
                    ? deliveryMethod.value === "shipping"
                      ? "block"
                      : "hidden"
                    : "hidden"
                }`}
              >
                <span className="text-gray-600">{t("totalShippingCost")} </span>
                <span className="font-semibold">
                  {totalShippingCost + " " + t("currency")}
                </span>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between items-center text-2xl font-semibold">
                <span>{t("grandTotal")} </span>
                <span className="text-blue-800">
                  {totalOrder === 0
                    ? 0
                    : netTotalOrder.toLocaleString("en-US") +
                      " " +
                      t("currency")}
                </span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-md mt-10 text-white text-lg  ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={placeOrder}
              >
                {isFirstAction ? (
                  t("proceedToCheckout")
                ) : loading ? (
                  <LuLoader className="animate-spin" />
                ) : (
                  t("confirmOrder")
                )}
              </button>
              <div className="flex gap-4 p-2 w-full bg-blue-50 mt-5 rounded-md">
                <span className="text-2xl text-blue-600 mt-1">
                  <AiFillSafetyCertificate />
                </span>
                <div>
                  <h1 className="text-blue-600  font-semibold">
                    {t("secureShopping")}
                  </h1>
                  <h2 className="text-gray-600 text-xs">
                    {t("protectedData")}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
