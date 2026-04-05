"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import { deleteRequest } from "../../../../utils/requestsUtils";
import { useIdContext } from "../../../../context/idContext";
import { useNamePageInAdminContext } from "../../../../context/namePageInAdmin";

const Table = ({ typeCategory, categories, loading }) => {
  const navigate = useRouter();
  const { setSelectedCategoryId } = useIdContext();
  const { setSelectedNamePage } = useNamePageInAdminContext();

  const { triggerRefresh } = useRefresh();
  const { t } = useLanguage();
  const itemCategoryId = (category) => {
    setSelectedCategoryId(category.itemCategoryId);
    let form = document.querySelector("#add-category-form");
    let nameFormCatogery = document.querySelector("#nameFormCategory");
    let btn_saveCategory = document.querySelector("#btn-saveCategory");
    let btn_editCategory = document.querySelector("#btn-editCategory");
    btn_editCategory.classList.remove("hidden");
    btn_saveCategory.classList.add("hidden");
    nameFormCatogery.innerHTML = t("edit_category");
    form.classList.toggle("hidden");
    form.classList.add("flex");
  };

  const deleteCategory = async (categoryId) => {
    try {
      await deleteRequest(
        `/api/admin/itemCategory/${categoryId}`,
        t("message_DeleteText")
      );
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" rounded-xl w-full h-[600px] border  mt-3 overflow-hidden overflow-y-scroll ">
      <table className=" w-full  rounded-lg  ">
        <thead className="bg-[#F9FAFB]  text-justify">
          <tr className=" text-gray-500 h-12 md:text-xs  xs:text-[10px]">
            <th className="w-[30%] px-5">{t("image")}</th>
            <th className="w-[25%]">{t("category_name_capetal")}</th>
            <th className="w-[25%] px-5">{t("products_count")}</th>
            <th className="w-[25%] "></th>
          </tr>
        </thead>
        <tbody className="bg-white text-md w-full  ">
          {loading
            ? // Skeleton rows
              [...Array(7)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-b">
                  <td className="px-4 py-2">
                    <div className="h-14 bg-gray-200 rounded-lg animate-pulse w-14"></div>
                  </td>

                  {/* <td className="px-4 py-2 flex items-center gap-2">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-16"></div>
                    <div className="flex flex-col gap-2">
                    <div  className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                    <div  className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                    </div>
                  </td> */}
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </td>
                  <td className="py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                </tr>
              ))
            : categories.map((category, index) => (
                <tr
                  key={index}
                  className={` text-blue-950 border hover:bg-gray-100 ${
                    typeCategory === "sub" ? "cursor-default" : "cursor-pointer"
                  } `}
                >
                  <td
                    className="px-4"
                    onClick={() => {
                      if (typeCategory === "main") {
                        navigate.push(
                          "/admin/pages/Categories/" + category.itemCategoryId
                        );
                        setSelectedNamePage("Categories Management");
                      }
                    }}
                  >
                    <span className="w-[100px]">
                      <Image
                        alt=""
                        src={`${
                          process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL
                        }${getThumbnailUrl(category.imageURL)}`}
                        width={40}
                        height={40}
                        className="rounded-xl xs:w-10 xs:h-10 md:w-14 md:h-12  border my-1 p-1"
                      />
                    </span>
                  </td>

                  <td
                    onClick={() => {
                      if (typeCategory === "main") {
                        navigate.push(
                          "/admin/pages/Categories/" + category.itemCategoryId
                        );
                        setSelectedNamePage("Categories Management");
                      }
                    }}
                  >
                    <div>
                      <h1 className="md:text-sm xs:text-xs font-semibold">
                        {localStorage.lang === "ar"
                          ? category.nameAr
                          : category.nameEn}
                      </h1>
                      <h1 className="md:text-xs xs:text-[10px]">
                        {t("main_category")}
                      </h1>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      if (typeCategory === "main") {
                        navigate.push(
                          "/admin/pages/Categories/" + category.itemCategoryId
                        );
                        setSelectedNamePage("Categories Management");
                      }
                    }}
                  >
                    <div className="bg-blue-100 md:w-[80px]  xs:w-[60px] text-center rounded-full text-blue-600  px-2 font-semibold md:text-xs xs:text-[10px]">
                      <h1>{category.itemsCount}</h1>
                      <h2>{t("products_category")}</h2>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className={`text-blue-800 text-sm flex items-center gap-1 bg-blue-300 px-2 py-1 font-semibold rounded-md hover:bg-blue-400 
                        // typeCategory === "main" ? "" : "hidden"
                      `}
                        onClick={() => itemCategoryId(category)}
                      >
                        <MdEdit />
                        <h1 className="md:block xs:hidden">{t("edit")}</h1>
                      </button>
                      <button
                        className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                        onClick={() => deleteCategory(category.itemCategoryId)}
                      >
                        <MdDelete />
                        <h1 className="md:block xs:hidden">{t("delete")}</h1>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          {/* <tr
              className="bg-white"
              onClick={() => {
                navigate.push("/admin/pages/Categories/5");
                setSelectedNamePage("Categories Management");
              }}
            >
              <td colSpan="4" className="h-10"></td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
