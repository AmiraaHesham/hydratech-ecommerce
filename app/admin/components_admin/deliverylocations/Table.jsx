"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/requestsUtils";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";

export default function Table() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const { setSelectedLocationId } = useIdContext();
  const { refreshKey } = useRefresh();

  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "ar";
  const getLocations = async () => {
    try {
      const resData = await postRequest(
        "/api/public/pickUpPlaces/search",
        "",
        ""
      );
      setLocations(resData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLocation = async (pickUpPlaceId) => {
    try {
      await deleteRequest(
        `/api/admin/pickUpPlaces/${pickUpPlaceId}`,
        t("message_DeleteText")
      );
      getLocations();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocations();
  }, [refreshKey]);
  return (
    <div className="w-full">
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-end p-5 items-center">
        <button
          className="p-2  text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-location-form");
            let btn_savelocation = document.querySelector("#btn-savelocation");
            let btn_editLocation = document.querySelector("#btn-editlocation");
            btn_editLocation.classList.add("hidden");
            btn_savelocation.classList.remove("hidden");
            let nameFormCategory = document.querySelector("#nameFormCategory");
            nameFormCategory.innerHTML = t("add_location");
            form.classList.remove("hidden");
            form.classList.add("flex");
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_location")}</h1>
        </button>
      </div>
      <div className=" rounded-xl w-full h-[600px]  border  mt-3 overflow-hidden overflow-y-scroll ">
        <table className=" w-full  rounded-lg  ">
          <thead className="bg-[#F9FAFB]      text-justify">
            <tr className=" text-gray-500 h-12 md:text-xs  xs:text-[10px]">
              <th className="w-[15%] px-5">{t("name")}</th>
              <th className="w-[30%]">{t("address")}</th>
              <th className="w-[30%] px-5">{t("location")} GPS</th>
              <th className="w-[10%] "></th>
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
              : locations.map((location, index) => (
                  <tr
                    key={index}
                    className={` text-blue-950 border hover:bg-gray-100 h-14 `}
                  >
                    <td className="px-3">
                      <div>
                        <h1 className="md:text-sm xs:text-xs font-semibold">
                          {lang === "ar" ? location.nameAr : location.nameEn}
                        </h1>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h1 className="md:text-sm xs:text-xs font-semibold">
                          {location.address}
                        </h1>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h1 className="md:text-sm xs:text-xs font-semibold">
                          {location.gpsLocation}
                        </h1>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className={`text-blue-800 text-sm flex items-center gap-1 bg-blue-300 px-2 py-1 font-semibold rounded-md hover:bg-blue-400 
                                // typeCategory === "main" ? "" : "hidden"
                              `}
                          onClick={() => {
                            let form =
                              document.querySelector("#add-location-form");
                            let nameFormCatogery =
                              document.querySelector("#nameFormCategory");
                            let btn_saveCategory =
                              document.querySelector("#btn-savelocation");
                            let btn_editCategory =
                              document.querySelector("#btn-editlocation");
                            btn_editCategory.classList.remove("hidden");
                            btn_saveCategory.classList.add("hidden");
                            nameFormCatogery.innerHTML = t("edit_location");
                            form.classList.toggle("hidden");
                            form.classList.add("flex");
                            setSelectedLocationId(location.pickUpPlaceId);
                          }}
                        >
                          <MdEdit />
                          <h1 className="md:block xs:hidden">{t("edit")}</h1>
                        </button>
                        <button
                          className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                          onClick={() => deleteLocation(location.pickUpPlaceId)}
                        >
                          <MdDelete />
                          <h1 className="md:block xs:hidden">{t("delete")}</h1>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
