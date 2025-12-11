"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const path = usePathname();


    const isActive = path.startsWith(href);


    const className = `
    p-2 rounded-md transition-colors 
    ${isActive
            ? "bg-red-600 text-white font-bold"
            : "text-gray-200 hover:bg-gray-700 hover:text-white"
        }
  `;

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}