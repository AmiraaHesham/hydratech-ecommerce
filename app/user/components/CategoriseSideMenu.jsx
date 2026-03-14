"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { BsList } from "react-icons/bs";

export default function CategoriesSideMenu() {
  const { t } = useLanguage();
  const { selectedCategoryId, setSelectedCategoryId } = useIdContext();
  const { locale } = useLanguage();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState([]);
  const categories = async () => {
    try {
      const res = await getCategories();
      setCategoriesList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    categories();
  }, []);

  return (
    <div className="w-[300px] xs:hidden md:block h-screen bg-[#ffffff]">
      <div className="  w-full h-full   ">
        <div className="flex items-center m-3 gap-2 text-xl">
          <BsList />
          <h1 className=" font-semibold">{t("categories")} </h1>
        </div>
        <hr className="h-3  mt-2 text-red-400 w-full"></hr>
        {loading ? (
          <div className=" flex flex-col gap-2  px-3 ">
            {[...Array(7)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-12 bg-gray-100 rounded-lg animate-pulse w-full "
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-gray-500">
            {categoriesList.map((category) => {
              return (
                <div
                  key={category.itemCategoryId}
                  className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                    selectedCategoryId === category.itemCategoryId
                      ? "bg-red-100 text-red-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(category.itemCategoryId);
                  }}
                >
                  <h1 className=" font-semibold xs:hidden md:block ">
                    {locale === "ar" ? category.nameAr : category.nameEn}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
