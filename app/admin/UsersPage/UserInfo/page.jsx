import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import UserInfo from "../../components_admin/users/userInfo";
import Image from "next/image";
export default function UsersPage() {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  return (
       <div className="bg-[#F9FAFB] h-screen ">
         <main className="flex bg-[#F9FAFB] ">
           <SideMenu users={"bg-red-100 text-red-500"} />
           <div className="w-full h-full  bg-[#F9FAFB] ">
             <Header page_title={""} />
             <div className=" mx-5 mt-3  ">
              <UserInfo/>
            </div>
          </div>
        
      </main>
    </div>
  )
//   ;}
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
