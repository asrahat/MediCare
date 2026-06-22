import Banner from "@/components/Banner";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

        <Banner></Banner>
        <MedicalSpecializations></MedicalSpecializations>
    </div>
  );
}
