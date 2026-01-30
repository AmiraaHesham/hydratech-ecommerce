"use client";

import { useSearshInputContext } from "../../../context/searshInputContext";
import { useCallback, useEffect, useState } from "react";
import CategoriesSideManu from "../components/CategoriseSideMenu";
import { postRequest } from "../../../utils/requestsUtils";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../context/idContext";
import ProductCard from "../components/ProductCard"
export default function Searchpage() {
  const navigate = useRouter();

  const [products, setProducts] = useState([]);
  const { selectedSearchInput } = useSearshInputContext();
    const { selectedCategoryId } = useIdContext();
  const getAllProducts = useCallback(async () => {
    if (selectedSearchInput != "" ||selectedCategoryId != null ) {
      try {
        const response = await postRequest(
          "/api/public/items/search",
          {
            page: 0,
            size: 10,
            searchText: selectedSearchInput,
            categoryId:selectedCategoryId
          },
          ""
        );
        setProducts(response.data);
        console.log(response.data);
        console.log(selectedSearchInput);
        // pagination()
        //       console.log("Categories after set:", resProducts);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate.push("/");
    }
  }, [selectedSearchInput,selectedCategoryId,navigate]);
  const userId = localStorage.id;

  const addToCart = async (productId) => {
    await postRequest(
      `/api/shopCarts/${userId}/addLine`,
      {
        itemId: productId,
        quantity: 1,
      },
      "",
    );
  };
  useEffect(() => {
    getAllProducts();
  }, [selectedSearchInput,getAllProducts]);
  return (
    <div className="bg-slate-50 h-[1000px]">
      <div className="flex gap-10  h-full">
        <CategoriesSideManu/>
      
      <div className="w-[80%]  h-screen ">
        <div className="bg-white flex  gap-4 items-center w-[330px] border rounded-md  px-3 h-10  my-5">
          <h1 className="text-sm text-gray-500">ترتيب حسب:</h1>
  <select className=" h-full w-[70%] text- font-semibold  ">
    <option>الكل</option>
  <option>من الأقل سعر </option>
  <option>من الأعلى سعر </option>
</select>
        </div>
        {
          products.length!=0? <div className="grid grid-cols-5 gap-5">
          {products.map((product ,index) => (
            <div key={index}  className="bg-white py-2 rounded-md border h-[310px]">
            <ProductCard productInfo={product}/>
              </div>
          ))
            }
        </div>:
  <div  className="h-10 w-full bg-white flex justify-center py-2  ">
          لا توجد منتجات        
              </div>
        }
        
      </div>
        
    </div>
    </div>
  );
}
