"use client"
import { useEffect } from "react";
import { getRequest } from "../../utils/requestsUtils";

 
 export default function AdminLayout({ children }) {
   const isAdmin =async()=>{
   const res=  await getRequest('/api/auth/is-admin')
console.log(res                            )  
}
   useEffect(()=>{
    isAdmin()
   },[])
   return (
     <div >
         <main  className="">
           {children}
         </main>
         
     </div>
   );}