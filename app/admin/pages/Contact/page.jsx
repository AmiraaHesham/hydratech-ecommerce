import SideMenu from "../../components_admin/SideMenu";
import Header from "../../components_admin/Header";
import Form_contact from "../../components_admin/contact/contactForm.jsx";
import Image from "next/image";

export default function ContactPage() {
  // const role =
  //   typeof window !== "undefined" ? localStorage.getItem("role") : null;
  // if (role === "ADMIN") {
    return (
      <div className="w-full h-full bg-[#F9FAFB]">
       
            <div className=" px-7 mt-4   ">
              <Form_contact />
            </div>
       
      </div>
    );
  // } else {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center text-center">
  //       <div className=" ">
  //         <div className="flex justify-center items-center mb-20">
  //           <Image
  //             src="/Images/logo.png"
  //             width={200}
  //             height={200}
  //             alt="logo "
  //             className="flex justify-center items-center"
  //           />
  //         </div>
  //         <h1 className="text-2xl font-semibold ">
  //           You are not authorized to view this page
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }
}
