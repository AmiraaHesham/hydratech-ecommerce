"use client";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { FaCheckCircle } from "react-icons/fa";

export default function ConfirmedEmailPage() {
  const { t } = useLanguage();
  return (
    <div className="">
      <header className="h-14 w-full bg-blue-800">
        <div className="flex  items-center  ">
          <span className="h-11 w-16  mt-2">
            <Image
              src="/Images/logo.png"
              alt="logo"
              width={300}
              height={300}
              priority
              className="w-full h-full"
            />
          </span>
          <div className="cursor-default">
            <h1 className="lg:text-xl  xs:text-lg w-[120px] text-white font-bold font-sans">
              {t("HydraTech")}
            </h1>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-10 justify-center items-center mt-24">
        <div className="w-72 h-72 rounded-full bg-green-700 text-center flex items-center justify-center">
          <FaCheckCircle className="w-[200px] h-[200px] text-white" />
        </div>
        <h1 className="text-6xl font-bold ">تم تفعيل حسابك بنجاح !</h1>
        <h2></h2>
      </div>
    </div>
  );
}
