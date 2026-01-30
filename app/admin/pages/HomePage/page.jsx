import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Sliders from '../../components_admin/homepage/Sliders'
import FeatuersProducts  from '../../components_admin/homepage/FeatuersProducts'
import Image from "next/image";
// import ProductForm  from '../components_admin/products/ProductForm'

export default function HomePage() {
    const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  return (
    <div className='bg-[#F9FAFB] '>
      <main className="flex  ">
        <SideMenu homepage={"bg-red-100 text-red-500"} />
        <div className="w-full  ">
          <Header page_title={"Homepage Management"} />
          <div className=" mt-3 mx-5 relative   bg-[#F9FAFB]">

          <Sliders/>
          <hr className="h-1  my-10"></hr>
          
          <FeatuersProducts/>
          </div>
        </div>
      </main>
    </div>
  ) 
// }
//   else{
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