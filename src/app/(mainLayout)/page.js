import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

        <Banner></Banner>
        <MedicalSpecializations></MedicalSpecializations>
        <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
