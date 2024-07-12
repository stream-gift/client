'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Home", icon: "home" },
        { href: "/dashboard/tips", label: "Tips/Crowdfunding", icon: "create" },
        { href: "/dashboard/clips", label: "Clips/VODs", icon: "box" },
        { href: "/dashboard/analytics", label: "Analytics", icon: "analysis" },
    ]

    return (
        <nav className="flex flex-col w-[300px] min-h-[calc(100dvh-160px)] p-4 border-r-[1px] border-r-[#D9D9D950] bg-[rgba(30,30,30,0.60)]">
            <div className="flex-1 flex flex-col gap-3">
                {links.map((l, i) => {
                    const isActive = pathname === l.href;
                    return (
                        <Link
                            key={i}
                            href={l.href}
                            className={`flex items-center gap-4 p-3 rounded-md ${isActive ? 'bg-[rgba(38,205,213,0.20)]' : ''}`}
                        >
                            <Image src={`/icons/${isActive ? 'teal' : 'gray'}-${l.icon}.svg`} alt={l.icon} height={20} width={20} />
                            <span className={`text-[16px] font-medium ${isActive ? 'text-tealtext' : 'text-white'}`}>{l.label}</span>
                        </Link>
                    )
                })}
            </div>
            <div className="flex flex-col">
                
            </div>
        </nav>
    )
}