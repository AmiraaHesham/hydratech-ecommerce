import SideMenu from "../../../../components_admin/SideMenu";
import Header from "../../../../components_admin/Header";
import OrderDetailsHeader from "../../../../components_admin/order_details/Header";
import Order_Iitems from "../../../../components_admin/order_details/Order_Items";
import User_Info from "../../../../components_admin/order_details/User_Info";
import UpdateStatus from "../../../../components_admin/order_details/UpdateStatus"
export default function OrderDetailsPage({params}) {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
    const { id } = params; 

  return (
    <div className="h-full p-5 bg-[#F9FAFB]">
        
          <div className=" relative">
            <OrderDetailsHeader orderId={id} />
            <UpdateStatus orderId={id}/>
            <div className="flex md:flex-row xs:flex-col gap-5 md:justify-between items-start mt-7">
              <Order_Iitems orderId={id}  />
              <User_Info orderId={id} />
            </div>
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
