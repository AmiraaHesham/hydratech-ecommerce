"use client";
import { FaPlus } from "react-icons/fa";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getRequest, postRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import Table from "./Table";
export default function CategorysTable() {
  const { t } = useLanguage();
  const { setSelectedCategoryId } = useIdContext();
  const { refreshKey } = useRefresh();
  let [itemCategory, setItemCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllSubCategories = async () => {
    try {
      const resData = await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts"
      );
      setItemCategory(resData);
      console.log(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubCategories();
  }, [refreshKey]);

  return (
    <div>
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-end p-5 items-center">
        <button
          className="p-2  text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-category-form");
            let btn_saveCategory = document.querySelector("#btn-saveCategory");
            let btn_editCategory = document.querySelector("#btn-editCategory");
            btn_editCategory.classList.add("hidden");
            btn_saveCategory.classList.remove("hidden");
            let nameFormCategory = document.querySelector("#nameFormCategory");
            nameFormCategory.innerHTML = t("add_main_category");
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
          <h1>{t("add_maincategory")}</h1>
        </button>
      </div>
      <Table
        typeCategory={"main"}
        categories={itemCategory}
        loading={loading}
      />
    </div>
  );
}
