"use client";
import { useContext, useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../../utils/requestsUtils";
import ProductCard from "./ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRefresh } from "../../../context/refreshContext";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "../../../context/LanguageContext";
export default function WishList() {
  const [products, setProducts] = useState([]);
  // const [selectedProductId] = useContext()
    // const { refreshKey } = useRefresh();
const {t}=useLanguage()
  const userId = localStorage.id;
  const getWishList = async () => {
    const response = await getRequest(`/api/users/${userId}/favoriteItems`);
    console.log(response);
    setProducts(response);
  };

  useEffect(() => {
     AOS.init({
      duration: 1000,
      once: false,
    });
    getWishList();
   
  }, []);
  return (
    <div data-aos="fade-up" className="p-5 h-full  ">
       <div className="flex justify-between py-5">
              <div className="">
                <h1 className="text-4xl font-bold mb-2">{t('wishlist')} </h1>
                <span className="text-sm text-gray-500 font-semibold">
                { t('inYourList') + " "+ products.length + " "+ t('products')}
                </span>
              </div>
              <Link href='/user/home' className="text-sm font-semibold text-red-600 flex items-center gap-2">
                <h1>{t('continueShopping')} </h1>
                <span className="mt-2">
           {localStorage.lang === 'ar'? <FaArrowLeft /> : <FaArrowRight />} 
                </span>
              </Link>
            </div>
       <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5 ">
      {products.map((product, index) => {
        return (
            <ProductCard key={index} productInfo={product.item} favorite={true} />
        );
      })}
    </div>
    </div>
   
  );
}
