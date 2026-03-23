import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import Orders_Details from "../../../components_admin/orders/Orders_Details";
import Orders_Failter from "../../../../components/Failter";
import Orders_Table from "../../../components_admin/orders/Orders_Table";
import Image from "next/image";

export default function Orders() {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  return (
    <div className="bg-[#F9FAFB]">
      {/* <div className="flex w-full flex-col justify-center items-center mt-6 relative"> */}
      <div className="flex w-full  flex-col justify-center items-center  relative">
        <div className="px-5 w-full mt-3 ">
          <Orders_Details />
          <Orders_Table />
        </div>
      </div>
    </div>
  );
  // }
  //    else{
  //     return(
  //       <div className="w-full h-screen flex justify-center items-center text-center">
  //         <div className=" ">
  //           <div className="flex justify-center items-center mb-20">
  // <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center"/>

  //           </div>
  //       <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
  //         </div>

  //         </div>
  //     )}
}
