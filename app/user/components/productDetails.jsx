"use client";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { getProductDetails } from "../../../utils/functions";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { postRequest } from "../../../utils/requestsUtils";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/context/LanguageContext";
export default function ProductDetails({itemId}) {
  const [count, setCount] = useState(1);
  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();
  const {t}= useLanguage()
  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: 0,
    descriptionAr: "",
    descriptionEn: "",
    category: {
      id: 0,
      nameAr: "",
      nameEn: "",
    },
    code: "",
    mainImage: "",
    mainImagefile: "",
    img2: "",
    img2file: "",
    img3: "",
    img3file: "",
  });
  const productDetails = async () => {
    const res = await getProductDetails(itemId);
    setProduct((prev) => ({
      ...prev,
      nameEn: res.nameEn,
      nameAr: res.nameAr,
      code: res.code,
      price: res.price,
      descriptionAr: res.descriptionAr,
      descriptionEn: res.descriptionEn,
      mainImage: process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + res.mainImageURL,
      img2: res.img2 || "",
      img3: res.img3 || "",
      category: {
        ...prev.category,
        id: res.itemCategory.itemCategoryId,
        nameAr: res.itemCategory.nameAr,
        nameEn: res.itemCategory.nameEn,
      },
    }));
  };
    const userId = localStorage.id;

  const addToCart = async () => {
   const res =  await postRequest(
      `/api/shopCarts/${userId}/addLine`,
      {
        itemId: itemId,
        quantity: count,
      },
      "",
    );
  };
  //  const changeQuantity = async () => {
  //   await postRequest(
  //     `/api/shopCarts/${userId}/changeQuantity`,
  //     {
  //       itemLineId: itemLineId,
  //       quantity: count,
  //     },
  //     "",
  //   );
  // };
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    productDetails();
  }, []);
  return (
    <div data-aos="fade-up" className=" h-full mb-28">
      <div className="flex h-[500px] gap-10 py-10 mx-10 ">
        <div className="w-full h-full">
          <div className="w-full h-full flex justify-center items-center  rounded-md ">
            <Image
              src={product.mainImage}
              alt="mainImage"
              width={500}
              height={500}
              priority
              className="w-full border rounded-md h-full shadow-md"
            />
          </div>
          <div className="flex  items-center gap-4 mt-5 ">
            <Image
              src={product.mainImage}
              alt="mainImage"
              width={100}
              height={100}
              priority
              className="w-[100px] border rounded-md h-[100px] shadow-md"
            />
            <Image
              src={product.mainImage}
              alt="mainImage"
              width={100}
              height={100}
              priority
              className="w-[100px] border rounded-md h-[100px] shadow-md"
            />
            <Image
              src={product.mainImage}
              alt="mainImage"
              width={100}
              height={100}
              priority
              className="w-[100px] border rounded-md h-[100px] shadow-md"
            />
          </div>
        </div>

        <div className="flex py-5 flex-col w-full justify-between bg-white  px-5 border rounded-md shadow-md">
          <div>
            <div className="flex justify-between items-start">
              <span>
                <h1 className="text-4xl font-Cairo font-bold">
                  {localStorage.lang === "ar" ? product.nameAr : product.nameEn}
                </h1>
                <h1 className=" text-gray-500 mt-2  text-sm">
                  {t('code')}: {product.code}
                </h1>
              </span>
              <span
                className="text-red-600 cursor-pointer hover:shadow-sm hover:shadow-red-700 px-4 rounded-md  "
                onClick={() => {
                  setSelectedCategoryId(product.category.id);
                  navigate.push("/user/pages/search");
                }}
              >
                {localStorage.lang === "ar" ?product.category.nameAr:product.category.nameEn}
              </span>
            </div>

            <hr className="w-full  my-5"></hr>
          </div>
          <span className="text-gray-500">
            {localStorage.lang === "ar"
              ? product.descriptionAr
              : product.descriptionEn}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xl line-through">
              {product.price +' ' +t("currency")}
            </span>

            <span className="text-3xl text-red-600 font-semibold">
              {product.price +' ' + t("currency")}
            </span>
          </div>
          <div className="flex  items-center gap-4 h-10 ">
            <button
              className=" w-[70%] h-full rounded-md text-white text-lg flex  justify-center items-center gap-3 bg-red-600"
              onClick={addToCart}
            >
             {t('addToCart')}<MdOutlineAddShoppingCart />
            </button>
            <div className="flex items-center gap-3 rounded-lg px-4 h-full border text-gray-600 bg-white">
              {/* زر النقصان */}
              <button
                onClick={() => {
                  setCount(count+1)
                }}
                className="text-xl font-bold text-gray-600  hover:text-blue-600"
              >
                +
              </button>

              {/* الرقم */}
              <span className="font-medium text-lg w-16 text-center">
                {count}
              </span>

              {/* زر الزيادة */}
              <button
                onClick={() => {
                  setCount(count - 1)
                }}
                className="text-xl font-bold text-gray-600 hover:text-blue-600"
              >
                −
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
