"use client";
import { FaBox, FaCheck, FaShoppingBag, FaTruck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils";
import { useOrderDetailsContext } from "../../../../context/orderDetailsContext";
import { useLanguage } from "../../../../context/LanguageContext";
import Image from "next/image";

export default function UpdateStatus({ orderId }) {
  const [activeStep, setActiveStep] = useState();
  const { t } = useLanguage();
  const { selectedOrderState, setSelectedOrderState } =
    useOrderDetailsContext();
  // const [state, setState] = useState('');
  const [orderStepPath, setOrderStepPath] = useState(5);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedOrderState === "PENDING") {
      setActiveStep(1);
      setOrderStepPath(6);
    } else if (selectedOrderState === "PROCESSING") {
      setActiveStep(2);
      setOrderStepPath(19);
    } else if (selectedOrderState === "SHIPPED") {
      setActiveStep(3);
      setOrderStepPath(23);
    } else if (selectedOrderState === "DELIVERED") {
      setActiveStep(4);
      setOrderStepPath(30);
    } else {
      setActiveStep(0);
      setOrderStepPath(1);
    }
  }, [selectedOrderState]);

  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const steps = [
    {
      icon: <FaShoppingBag size={20} />,
      label: t("PENDING"),
      value: "PENDING",
    },
    { icon: <FaBox size={20} />, label: t("PROCESSING"), value: "PROCESSING" },
    { icon: <FaTruck size={20} />, label: t("SHIPPED"), value: "SHIPPED" },
    { icon: <FaCheck size={20} />, label: t("DELIVERED"), value: "DELIVERED" },
  ];
  const changeState = async (state) => {
    setLoading(true);
    try {
      const res = await postRequest(
        `/api/admin/orders/${orderId}/changeState/${state}`,
        "",
        t("message_AddText")
      );
      if (res.success === true) {
        setSelectedOrderState(state);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex items-center h-16 px-4 my-5">
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
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(${
            lang === "en" ? "to right" : "to left"
          }, red ${activeStep * orderStepPath}%, #e0e0e0 ${
            activeStep * orderStepPath
          }%)`,
        }}
      ></div>
      <div className="flex justify-between w-full relative z-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              // console.log(step.l);
              changeState(step.value);
            }}
          >
            {/* الدائرة المحيطة بالأيقونة */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index + 1 <= activeStep
                  ? "bg-blue-100 border-2 border-blue-300"
                  : "bg-gray-100 border-2 border-gray-300"
              }`}
            >
              {/* الأيقونة (ملونة حسب المرحلة النشطة) */}
              <div
                className={
                  index + 1 <= activeStep ? "text-blue-600" : "text-gray-400"
                }
              >
                {step.icon}
              </div>
            </div>
            {/* العنوان تحت الأيقونة */}
            <span
              className={`text-xs mt-1 font-medium transition-opacity ${
                index + 1 <= activeStep
                  ? "text-blue-600 opacity-100"
                  : "text-gray-500 opacity-70"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
