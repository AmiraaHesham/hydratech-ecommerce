import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Dashboard_Details from "../../components_admin/dashboard/Details";
import RecentOrders_Table from "../../components_admin/dashboard/Table";
import QuicksAction from "../../components_admin/dashboard/QuicksAction";
export default function Dashboard() {


  return (
    <div className="bg-[#F9FAFB]">
   
          <div className="flex w-full flex-col justify-center items-center pt-6 relative">
            <div className="w-[90%] ">
              <Dashboard_Details />
              <QuicksAction />
              <RecentOrders_Table />
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
