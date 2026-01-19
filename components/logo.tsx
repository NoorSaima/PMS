'use client'
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { useMediaQuery } from "@/hooks/use-media-query";



interface LogoProps {
    color?: 'black' | 'white';
}

const Logo = ({ color = 'white' }: LogoProps) => {
    const [config] = useConfig()
    const [hoverConfig] = useMenuHoverConfig();
    const { hovered } = hoverConfig
    const isDesktop = useMediaQuery('(min-width: 1280px)');

    const textColor = color === 'white' ? 'text-white' : 'text-black';

    if (config.sidebar === 'compact') {
        return <Link href="/" className="flex gap-2 items-center   justify-center    ">
            <div className="relative h-8 w-8">
                <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
            </div>
        </Link>
    }
    if ((config.sidebar === 'draggable' || config.sidebar === 'classic') && config.collapsed) {
        return <Link href="/" className="flex gap-2 items-center justify-center    ">
            <div className="relative h-8 w-8">
                <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
            </div>
        </Link>
    }
    if (config.sidebar === 'draggable' && !config.collapsed) {
        return <Link href="/" className="flex gap-1 items-center    ">
            <div className="relative flex justify-center items-center h-11 w-[70px] mt-1">
                <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
            </div>
            <h1 className={`text-xl font-semibold ${textColor}`}>
                MAX-PMS
            </h1>
        </Link>
    }
    if (config.sidebar === 'two-column' || !isDesktop) return null

    return (
        <Link href="/" className="flex gap-1 items-center    ">
            <div className="relative flex justify-center items-center h-11 w-[70px] mt-1">
                <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
            </div>
            <h1 className={`text-xl font-semibold ${textColor}`}>
                MAX-PMS
            </h1>
        </Link>

    );
};

export default Logo;
