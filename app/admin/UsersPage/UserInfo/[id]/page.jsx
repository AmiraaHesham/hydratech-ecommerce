import SideMenu from "../../../components_admin/SideMenu";
import Header from "../../../components_admin/Header";
import UserInfo from "../../../components_admin/users/userInfo";
export default function UsersPage({params}) {
    const { id } = params; 

  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  return (
      <div className=" p-5 bg-[#F9FAFB]">
         
<div className=" w-full bg-[#F9FAFB]">
              <UserInfo userId={id}/>

       </div>
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
