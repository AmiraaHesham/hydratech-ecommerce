"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import { BiCategory } from "react-icons/bi";
import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";

export default function CategorySection({ categories }) {
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "ar";
  const { t } = useLanguage();

  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <div className="w-full flex justify-center items-center text-center px-10 text-2xl font-semibold h-12 shadow-md shadow-gray-300 bg-gray-100">
        <h1 className="flex items-center gap-2 text-gray-600">
          <BiCategory className="text-blue-600" />
          {t("categories")}
        </h1>
      </div>
      <div className="w-full mt-32  ">
        <Swiper
          key={lang}
          modules={[Navigation]}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1172: {
              slidesPerView: 5,
            },
            1487: {
              slidesPerView: 6,
            },
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
          navigation={{
            nextEl: ".next2-btn",
            prevEl: ".prev2-btn",
          }}
          className="w-full h-full  "
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.itemCategoryId}
              className="mt-5   rounded-lg "
            >
              <div
                className="  h-[270px] border-2  border-gray-200 flex justify-center items-center text-center hover:shadow-xl hover:shadow-slate-300   hover:scale-105 duration-200 cursor-pointer rounded-md  hover:border-b-blue-600 hover:border-b-[7px]"
                onClick={() => {
                  setSelectedCategoryId(category.itemCategoryId);
                  navigate.push("/user/search/");
                }}
              >
                <div className="py-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                      category.imageURL || ""
                    }`}
                    alt={category.nameAr || "category"}
                    width={200}
                    height={200}
                    className="rounded-md h-[180px] w-[180px]"
                  />
                  <h1 className="font-semibold  mt-5">
                    {lang === "ar" ? category.nameAr : category.nameEn}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className=" flex flex-col justify-center items-center relative my-20  ">
            <div className=" p-1 rounded-full absolute flex gap-2 justify-center items-center  ">
              <button className="next2-btn p-1 rounded-full hover:bg-blue-600 border-2 border-blue-600  hover:text-white text-blue-600 text-3xl   font-bold cursor-pointer *:">
                {lang === "ar" ? (
                  <IoIosArrowRoundForward className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundBack />
                )}
              </button>
              <button className="prev2-btn p-1 rounded-full hover:bg-blue-600  border-2  border-blue-600   hover:text-white text-blue-600 text-3xl cursor-pointer font-bold">
                {lang === "ar" ? (
                  <IoIosArrowRoundBack className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundForward />
                )}
              </button>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
