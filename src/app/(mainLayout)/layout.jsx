import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="grow flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}