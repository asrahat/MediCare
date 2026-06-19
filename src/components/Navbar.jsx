"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { LayoutCellsLarge, Person, ArrowRightFromSquare } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        toast('log out Successfull!!')
        router.push("/");
        window.location.reload()
    };

    const isActive = (path) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    const linkClass = (path) => `
        relative text-sm font-medium transition
        ${isActive(path) ? "text-white" : "text-white/60 hover:text-white"}
    `;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-10">

             
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            M
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">
                            MediCare
                        </span>
                    </Link>

 
                    <div className="hidden md:flex items-center gap-7">

                        <Link href="/" className={linkClass("/")}>
                            Home
                            {isActive("/") && <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-cyan-400 rounded-full" />}
                        </Link>

                        <Link href="/doctors" className={linkClass("/doctors")}>
                            Find Doctors
                            {isActive("/doctors") && <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-cyan-400 rounded-full" />}
                        </Link>

                        <Link href="/about" className={linkClass("/about")}>
                            About Us
                            {isActive("/about") && <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-cyan-400 rounded-full" />}
                        </Link>

                        <Link href="/contact" className={linkClass("/contact")}>
                            Contact Us
                            {isActive("/contact") && <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-cyan-400 rounded-full" />}
                        </Link>

                        {session?.user && (
                            <Link href={`/dashboard/${session.user.role}`} className={linkClass("/dashboard")}>
                                Dashboard
                                {isActive("/dashboard") && <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-cyan-400 rounded-full" />}
                            </Link>
                        )}
                    </div>
                </div>

       
                <div className="flex items-center gap-4">

         
                    {!session && (
                        <div className="flex items-center gap-3">

                            <Link
                                href="/login"
                                className="text-sm text-white/60 hover:text-white transition"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="
                                    text-sm font-semibold
                                    px-4 py-2 rounded-xl
                                    bg-gradient-to-r from-sky-500 to-cyan-500
                                    text-white
                                    hover:scale-[1.02]
                                    transition
                                "
                            >
                                Register
                            </Link>
                        </div>
                    )}

            
                    {session?.user && (
                        <div className="relative" ref={dropdownRef}>

                            {/* avatar */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center"
                            >
                                <div className="p-[2px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-500">
                                    <Image
                                        src={session.user.image || "/fallback-avatar.png"}
                                        alt="avatar"
                                        width={36}
                                        height={36}
                                        className="w-9 h-9 rounded-full object-cover border border-slate-900"
                                    />
                                </div>
                            </button>

             
                            {dropdownOpen && (
                                <div className="
                                    absolute right-0 mt-3 w-56
                                    rounded-2xl
                                    border border-white/10
                                    bg-slate-950/90
                                    backdrop-blur-xl
                                    shadow-xl
                                    py-2
                                ">

                               
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-white text-sm font-semibold truncate">
                                            {session.user.name}
                                        </p>
                                        <p className="text-white/50 text-xs truncate">
                                            {session.user.email}
                                        </p>

                                        <span className="
                                            inline-block mt-2
                                            text-[10px]
                                            px-2 py-1
                                            rounded-full
                                            bg-cyan-500/10
                                            text-cyan-300
                                            border border-cyan-500/20
                                            uppercase
                                        ">
                                            {session.user.role}
                                        </span>
                                    </div>

                           
                                    <Link
                                        href={`/dashboard/${session.user.role}`}
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
                                    >
                                        <LayoutCellsLarge />
                                        Dashboard
                                    </Link>

                                    <Link
                                        href={`/dashboard/${session.user.role}/settings`}
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
                                    >
                                        <Person />
                                        Profile
                                    </Link>

                                    <div className="border-t border-white/10 my-1" />

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 w-full"
                                    >
                                        <ArrowRightFromSquare />
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}