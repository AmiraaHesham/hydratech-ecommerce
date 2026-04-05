"use client";
import { FaEyeSlash, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import { postRequest, putRequest } from "../../../utils/requestsUtils";
import { useState } from "react";

export default function ResetPasswordForm() {
  const { t } = useLanguage();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();

    await putRequest(
      "/api/users/reset-password",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        repeatPassword: repeatPassword,
      },
      ""
    );
    const resetpasswordform = document.querySelector("#resetpasswordform");
    resetpasswordform.classList.add("hidden");
    resetpasswordform.classList.remove("flex");
    setNewPassword("");
    setOldPassword("");
    setRepeatPassword("");
  };
  return (
    <div className=" w-[500px] h-[400px]  border  border-blue-600 rounded-lg py-5 px-10 shadow-lg shadow-gray-200 bg-[#F9FAFB] ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg w-full font-semibold text-blue-600">
          {t("updatePassword")}
        </h1>
        <button
          onClick={() => {
            const resetpasswordform =
              document.querySelector("#resetpasswordform");
            resetpasswordform.classList.add("hidden");
            resetpasswordform.classList.remove("flex");
            setNewPassword("");
            setOldPassword("");
            setRepeatPassword("");
          }}
          className="text-xl text-gray-600 hover:text-blue-600"
        >
          <FaTimesCircle />
        </button>
      </div>
      <form className="w-full flex flex-col justify-center items-center gap-3 my-5">
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">{t("oldPassword")} </label>
          <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
              // value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">{t("newPassword")} </label>
          <div className=" flex w-full px-2 rounded-md mt-2  bg-white border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
              //  value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-xs font-semibold">
            {t("confirmPassword")}{" "}
          </label>
          <div className=" flex w-full px-2 rounded-md mt-2 bg-white  border h-10 items-center gap-3">
            <input
              type="password"
              className="w-full h-full bg-none outline-none  p-2"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <span className="text-base text-gray-600">
              <FaEyeSlash />
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded-md mt-5 text-white"
          onClick={resetPassword}
        >
          {t("save")}
        </button>
      </form>
    </div>
  );
}
