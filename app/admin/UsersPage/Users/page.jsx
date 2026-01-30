import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import Users_Table from "../../components_admin/users/Users_Table";
import Image from "next/image";
export default function UsersPage() {

  return (
    <div className="h-full bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu users={"bg-red-100 text-red-500"} />
        <div className="w-full bg-[#F9FAFB]  h-full">
          <Header page_title={"Users Management"} />
          <div className="flex w-full flex-col justify-center  items-center  relative">
            <div className="w-[90%] mt-3 ">
              <Users_Table />
            </div>
          </div>
        </div>
      </main>
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
    // )}
}
