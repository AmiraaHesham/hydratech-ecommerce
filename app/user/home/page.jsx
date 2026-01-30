"use client";
import dynamic from "next/dynamic";
const ImageSlider = dynamic(() => import("../components/home/ImageSlider"), {
  ssr: false,
});
const CategoriesSection = dynamic(
  () => import("../components/home/CategoriesSection"),
  {
    ssr: false,
  },
);
const FeatuerProducts = dynamic(
  () => import("../components/home/FeatuerProducts"),
  {
    ssr: false,
  },
);
import { useEffect, useState } from "react";
import {
  getCategories,
  getFeatuerProducts,
  getSliderImage,
} from "../../../utils/functions";
import AOS from "aos";
import "aos/dist/aos.css";

import { useLanguage } from "../../../context/LanguageContext";
import { AiFillStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";

export default function Homepage() {
  const [ImagesSliders, setImagesSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuerProducts, setFeatuerProducts] = useState([]);

  const { t } = useLanguage();
  const getImages = async () => {
    try {
      const res = await getSliderImage();
      setImagesSliders(res);
    } catch (error) {
      console.error("Failed to fetch slider images:", error);
    }
  };
  const showCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFeatuersProducts = async () => {
    const response = await getFeatuerProducts();

    setFeatuerProducts(response.data);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    getImages();
    showCategories();
    getFeatuersProducts();
  }, []);

  return (
    <div className="bg-[#F9FAFB]">
      <div className="w-full h-10  flex justify-between text-center md:text-base xs:text-sm shadow-md shadow-gray-300 mb-5 text-gray-600">
        <a
          href="#CategoriesSection"
          className="flex justify-center items-center border-l border-b-2  gap-2 w-full  font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-700 text-white rounded-full text-lg p-1">
            <BiCategory />
          </span>
          {t("categories")}
        </a>
        <a
          href="#FeatuerProducts"
          className="flex justify-center items-center gap-2  w-full  border-b-2  font-bold hover:bg-white  hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-700 text-white rounded-full text-sm p-1">
            <AiFillStar className="" />
          </span>
          {t("featured_products")}
        </a>
        <a href="#footer" className="flex justify-center items-center  border-b-2 border-r gap-2 w-full  font-bold hover:bg-white  hover:border-b-2 hover:border-b-red-600 cursor-pointer">
         <span className="bg-red-700 text-white rounded-full text-lg p-1">
          <MdContactSupport />

          </span>
          {t("contact_us")}
        </a>
      </div>
      <section id="ImageSlider" data-aos="fade-up">
        <ImageSlider sliderImages={ImagesSliders} />
      </section>
      <section id="CategoriesSection" className="h-[300px]" data-aos="fade-up">
        <CategoriesSection categories={categories} />
      </section>
      <section id="FeatuerProducts" className="h-[500px]" data-aos="fade-up">
        <FeatuerProducts FeatuerProducts={featuerProducts} />
      </section>
    </div>
  );
}
