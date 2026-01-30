"use client"
import { FaEyeSlash, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function ResetPasswordForm() {
  const {t}=useLanguage()
  return (
    <div className=" w-[500px] h-[400px]  border  border-red-600 rounded-lg py-5 px-10 shadow-lg shadow-gray-200 bg-[#F9FAFB] ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg w-full font-semibold text-red-600">
{t('updatePassword')} 
        </h1>
        <button
         onClick={()=>{
                const resetpasswordform = document.querySelector('#resetpasswordform')
                resetpasswordform.classList.add('hidden')
                resetpasswordform.classList.remove('flex')
              }}
          className="text-xl text-gray-600 hover:text-red-600"
        >
          <FaTimesCircle />
        </button>
      </div>
      <form className="w-full flex flex-col justify-center items-center gap-3 my-5">
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">{t('oldPassword')} </label>
          <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">{t('newPassword')}  </label>
          <div className=" flex w-full px-2 rounded-md mt-2  bg-white border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">{t('confirmPassword')}  </label>
          <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <button className="w-full bg-red-600 p-2 rounded-md mt-5 text-white">
         {t('save')} 
        </button>
      </form>
    </div>
  );
}
