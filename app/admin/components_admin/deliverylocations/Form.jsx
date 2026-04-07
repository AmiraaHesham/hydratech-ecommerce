"use client";

import { MdCancel } from "react-icons/md";
import { useLanguage } from "../../../../context/LanguageContext";
import { useEffect, useState } from "react";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../utils/requestsUtils";
import { useIdContext } from "../../../../context/idContext";
import Image from "next/image";
import { useRefresh } from "../../../../context/refreshContext";

export default function Form() {
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();

  const { selectedLocationId, setSelectedLocationId } = useIdContext();
  const [locationInfo, setLocationInfo] = useState({
    nameEn: "",
    nameAr: "",
    address: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const addLocation = async () => {
    let form = document.querySelector("#add-location-form");
    form.classList.add("hidden");

    try {
      await postRequest(
        "/api/admin/pickUpPlaces",
        locationInfo,
        t("message_AddText")
      );
      triggerRefresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const locationData = async () => {
    if (selectedLocationId != null) {
      setLoading(true);

      try {
        const resData = await getRequest(
          `/api/admin/pickUpPlaces/${selectedLocationId}`
        );
        setLocationInfo((prev) => ({
          ...prev,
          nameEn: resData.nameEn,
          nameAr: resData.nameAr,
          address: resData.address,
          location: resData.gpsLocation,
        }));

        console.log(resData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
    }
  };

  const updateLocation = async () => {
    let form = document.querySelector("#add-location-form");
    form.classList.add("hidden");
    setLoading(true);
    try {
      await putRequest(
        `/api/admin/pickUpPlaces/${selectedLocationId}`,
        locationInfo,
        t("message_EditText")
      );
      triggerRefresh();
      setSelectedLocationId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    locationData();
  }, [selectedLocationId]);
  return (
    <div
      id="add-location-form"
      className=" hidden fixed inset-0 bg-black/40  items-center justify-center z-50  w-full  "
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="bg-white shadow-md shadow-slate-400 h-[530px] xs:w-full lg:w-[600px] flex flex-col border rounded-md">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameFormCategory" className="text-lg font-semibold"></h1>
          <span
            className="text-3xl text-blue-950  hover:text-blue-800"
            onClick={() => {
              let form = document.querySelector("#add-location-form");
              form.classList.add("hidden");
            }}
          >
            <MdCancel />
          </span>
        </div>
        <hr className="h-1 mb-3"></hr>
        <div className="flex   justify-center items-center ">
          <form
            className=" md:w-[60%] xs:w-[80%] "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-4">
              <div className="flex flex-col gap-2 ">
                <label className="text-md text-gray-500">
                  {t("location_name")} * [en]
                </label>
                <input
                  type="text"
                  value={locationInfo.nameEn}
                  onChange={(e) =>
                    setLocationInfo({ ...locationInfo, nameEn: e.target.value })
                  }
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
                <label className="text-md text-gray-500">
                  {t("location_name")} * [ar]
                </label>
                <input
                  type="text"
                  value={locationInfo.nameAr}
                  onChange={(e) =>
                    setLocationInfo({ ...locationInfo, nameAr: e.target.value })
                  }
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
                <label className="text-md text-gray-500">
                  {t("address")} *
                </label>
                <input
                  type="text"
                  value={locationInfo.address}
                  onChange={(e) =>
                    setLocationInfo({
                      ...locationInfo,
                      address: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
                <label className="text-md text-gray-500">
                  {t("location")} GPS
                </label>
                <input
                  type="text"
                  value={locationInfo.location}
                  onChange={(e) =>
                    setLocationInfo({
                      ...locationInfo,
                      location: e.target.value,
                    })
                  }
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                id="btn-savelocation"
                className="bg-blue-600 py-2 px-3 text-white mt-7  hover:bg-blue-800 rounded-lg  "
                onClick={() => {
                  addLocation();
                }}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editlocation"
                className="hidden bg-blue-600 py-2 px-3 text-white mt-7  hover:bg-blue-800 rounded-lg"
                onClick={() => {
                  updateLocation();
                }}
              >
                {t("save-changes")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
