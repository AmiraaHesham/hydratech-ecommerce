"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { BsList } from "react-icons/bs";
import { MdCancel, MdPointOfSale } from "react-icons/md";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { getRequest } from "../../../utils/requestsUtils";
import { VscCircleFilled } from "react-icons/vsc";

export default function CategoriesSideMenu({ mainCategoryID }) {
  const { t, locale } = useLanguage();
  const { selectedCategoryId, setSelectedCategoryId } = useIdContext();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [subCategories, setSubCategories] = useState([]);

  // جلب الكاتيجوريات
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategoriesList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  // جلب subcategories عند اختيار category
  // const fetchSubCategories = async () => {
  //   if (!selectedCategoryId) return;
  //   try {
  //     const res = await getRequest(
  //       `/api/public/itemCategory/${selectedCategoryId}`
  //     );
  //     setSubCategories(res.data.subCategories || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   fetchSubCategories();
  // }, [selectedCategoryId]);

  return (
    <div
      id="catego-sideMenu"
      className="md:w-[300px] xs:w-[200px] xs:hidden md:block xs:absolute md:relative h-screen bg-[#ffffff]"
    >
      <div className="w-full h-full">
        <div className="flex justify-between p-3 items-center">
          <span className="flex items-center gap-2 text-lg">
            <BsList />
            <h1 className="font-semibold">{t("categories")}</h1>
          </span>
          <span
            className="xs:block md:hidden w-5 h-5 cursor-pointer text-blue-600"
            onClick={() => {
              document
                .querySelector("#catego-sideMenu")
                .classList.add("xs:hidden");
            }}
          >
            <MdCancel className="w-full h-full" />
          </span>
        </div>
        <hr className="h-3 mt-2 text-blue-400 w-full" />
        {loading ? (
          <div className="flex flex-col gap-2 px-3">
            {[...Array(7)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-12 bg-gray-100 rounded-lg animate-pulse w-full"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-gray-500">
            {categoriesList.map((category) => (
              <div key={category.itemCategoryId}>
                {/* Category main row */}
                <div
                  className={`flex gap-4 mx-3 xs:justify-center md:justify-start items-center p-3 rounded-md cursor-pointer hover:bg-blue-100 hover:text-blue-500 ${
                    selectedCategoryId === category.itemCategoryId
                      ? "bg-blue-100 text-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(category.itemCategoryId);

                    const subCat = document.querySelector(
                      `#subCat_${category.itemCategoryId}`
                    );
                    category.subCategories.length === 0
                      ? ""
                      : subCat.classList.toggle("hidden");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FaRegArrowAltCircleLeft />
                    <h1 className="font-semibold text-sm">
                      {locale === "ar" ? category.nameAr : category.nameEn}
                    </h1>
                  </div>
                </div>
                {/* Subcategories */}
                {category.subCategories.length === 0 ? (
                  ""
                ) : (
                  <div
                    id={`subCat_${category.itemCategoryId}`}
                    className="hidden ml-6  flex-col gap-1 mx-10 my-2 text-blue-700"
                  >
                    {category.subCategories.map((subCat) => (
                      <div
                        key={subCat.subCategoryId}
                        className="p-2 rounded-md cursor-pointer flex items-center hover:bg-blue-50 hover:text-blue-500"
                        onClick={() =>
                          setSelectedCategoryId(subCat.itemCategoryId)
                        }
                      >
                        <VscCircleFilled />
                        {locale === "ar" ? subCat.nameAr : subCat.nameEn}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
