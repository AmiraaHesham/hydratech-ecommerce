"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { deleteRequest, getRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "./Table";
import { useNamePageInAdminContext } from "../../../../context/namePageInAdmin";

export default function SubcategoriesTable({ CategoryId }) {
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const { setSelectedCategoryId } = useIdContext();
  const { refreshKey } = useRefresh();
  let [itemCategory, setItemCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategory, setMainCategory] = useState("");
  const navigate = useRouter();
  const { setSelectedNamePage } = useNamePageInAdminContext();
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "";
  const getAllCategories = async () => {
    try {
      const resData = await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts"
      );
      setItemCategory(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesById = async () => {
    const respose = await getRequest(`/api/admin/itemCategory/${CategoryId}`);
    setMainCategory(respose);
  };

  useEffect(() => {
    getAllCategories();
    getCategoriesById();
    setSelectedNamePage("Categories Management");
  }, [refreshKey]);

  return (
    <div>
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-between p-5 items-center">
        <span className="font-bold bg-blue-500 text-xl  text-white  py-1 px-6 flex justify-center items-center rounded-lg ">
          {lang === "ar" ? mainCategory.nameAr : mainCategory.nameEn}
        </span>
        <button
          className="p-2  text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center  flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-category-form");
            let btn_saveCategory = document.querySelector("#btn-saveCategory");
            let btn_editCategory = document.querySelector("#btn-editCategory");
            btn_editCategory.classList.add("hidden");
            btn_saveCategory.classList.remove("hidden");
            let nameFormCategory = document.querySelector("#nameFormCategory");
            nameFormCategory.innerHTML = t("add_category");
            form.classList.remove("hidden");
            form.classList.add("flex");
            let upload = document.querySelector("#label-uplod");
            let img = document.querySelector("#lable-img");
            img.classList.add("hidden");
            upload.classList.remove("hidden");
            setSelectedCategoryId(null);
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_category")}</h1>
        </button>
      </div>
      <Table typeCategory={"sub"} categories={itemCategory} />
    </div>
  );
}
