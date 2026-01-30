import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import FormProduct from "../../components_admin/products/ProductForm";
import ProductsTable from "../../components_admin/products/ProductsTable";
import Image from "next/image";

export default function Products() {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if(role === "ADMIN"){
  return (
    <div className="h-screen bg-[#F9FAFB]">
      <main className=" flex border  ">
        <SideMenu products={"bg-red-100 text-red-500"} />
        <div className="w-full bg-[#F9FAFB]">
          <Header page_title={"Products Management"} />

          <div className="mx-5  mt-6 relative ">
            <FormProduct />
            <ProductsTable />
          </div>
        </div>
      </main>
    </div>
  )
  // ;}
//    else{
//     return(
//       <div className="w-full h-screen flex justify-center items-center text-center">
//         <div className=" ">
//           <div className="flex justify-center items-center mb-10">
// <Image src='/Images/logo.png' width={200} height={200} alt='logo ' className="flex justify-center items-center"/>

//           </div>
//       <h1 className="text-2xl font-semibold ">You are not authorized to view this page</h1>
//         </div>
        
//         </div>
//     )}
}
