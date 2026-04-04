"use client"

import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const Navbar = () => {
    return(
        <div className="navbar flex items-center justify-between px-6 py-4">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={44}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                {navLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:opacity-70 transition-opacity">
                        {item.label}
                    </Link>
                ))}
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <button style={{backgroundColor: "#000000", color: "#ffffff", borderRadius: "50px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer"}}>Sign In</button>
                    </SignInButton>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </div>
    );
}

export default Navbar