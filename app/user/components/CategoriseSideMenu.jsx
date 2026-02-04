"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { BsList } from "react-icons/bs";

export default function CategoriesSideMenu() {
  const { t } = useLanguage();
  const {selectedCategoryId, setSelectedCategoryId } = useIdContext();

  const [categoriesList, setCategoriesList] = useState([]);
  const categories = async () => {
    const res = await getCategories();
    setCategoriesList(res.data);
  };

  useEffect(() => {
    categories();
  }, []);

  return (
    <div className="xs:w-[60px] md:w-[300px]  flex ">
      <div className="  w-full mt-5  bg-[#ffffff] ">
        <div className="flex items-center m-3 gap-2 text-xl">
          <BsList />
          <h1 className=" font-semibold">الفئات</h1>
        </div>
        <hr className="h-3  mt-2 text-red-400 w-full"></hr>

        <div className="flex flex-col gap-1 text-gray-500">
          {categoriesList.map((category) => {
            return (
              <div
                key={category.itemCategoryId}
                className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${selectedCategoryId === category.itemCategoryId ? 'bg-red-100 text-red-500':''}`}
                onClick={() => {
                  setSelectedCategoryId(category.itemCategoryId);
                }}
              >
                <h1 className=" font-semibold xs:hidden md:block ">
                  {category.nameAr}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
