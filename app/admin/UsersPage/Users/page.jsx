import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Failter from "../../../components/Failter";
import Users_Table from "../../components_admin/users/Users_Table";
import Image from "next/image";
export default function UsersPage() {

  return (
    <div className=" bg-[#F9FAFB]">
      
            <div className="w-full relative p-5 ">
              <Users_Table />
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
    // )}
}
