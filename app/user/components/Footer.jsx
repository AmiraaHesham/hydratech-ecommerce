import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
} from "react-icons/fa";
import { FaSquarePhone, FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Header() {
  return (
    <div  className="flex justify-center gap-10 items-center w-full">
      <Link href="/">
        <div className="flex  items-center xs:justify-center md:justify-start ">
          <span className="  ">
            <Image
              src="/Images/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </span>
        </div>
      </Link>
      <hr className="w-[2px]  h-32 bg-red-600 "></hr>

      <div className="flex flex-col  gap-5  justify-center items-start  ">
        <div className="flex  justify-between gap-5">
          <span className=" w-8 h-8 text-blue-700">
            <FaFacebookSquare className="w-full h-full" />
          </span>
          <span className=" w-8 h-8 text-green-600">
            <FaSquareWhatsapp className="w-full h-full" />
          </span>
          <span className=" w-8 h-8  text-blue-600">
            <FaTelegram className="w-full h-full" />
          </span>

          <span className=" w-8 h-8 text-pink-600">
            <FaInstagramSquare className="w-full h-full" />
          </span>
          <span className=" w-8 h-8 text-black">
            <FaXTwitter className="w-full h-full" />
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-700">
              <MdEmail />
            </span>
            <span className="text-lg">amira@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-700">
              <FaSquarePhone />
            </span>
            <span className="text-lg">010202303</span>
          </div>
        </div>
      </div>
    </div>
  );
}
