// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import Image from "next/image";
import SignInForm from "../components/SignIn_Form";

export default function SignIn() {
  return (
    <div className="h-screen">
      <div className=" w-full h-screen ">
        <div className=" h-full flex md:flex-row xs:flex-col ">
          <SignInForm />
          <div className="h-full w-full md:order-2 xs:order-1">
            <Image
              src="/Images/imageLogin.png"
              alt="Background Image"
              width={1000}
              height={1000}
              priority
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
