import Image from "next/image";
import arshavin from "../public/images/404page.png";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})

export default function NotFound() {
   return (
     <div className={`${barlowCondensed.className} h-screen flex items-center justify-center flex-col text-center`}>
      <p className="text-white text-medium absolute">PAGE NOT FOUND</p>
      <Image src={arshavin} width={500} height={500} alt="404 message"/>
     </div>
   );
 }
 