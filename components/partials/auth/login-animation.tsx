"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

const LoginAnimation = () => {
    const [config] = useConfig();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Base Logic:
    // If config.sidebarColor is 'light', we default to ocean-blue theme.
    // If it's anything else, we apply the specific theme class.
    // We'll use a dynamic class for the container and the blobs.

    const isCustomTheme = config.sidebarColor !== "light";
    const themeColor = isCustomTheme ? config.sidebarColor : "ocean-blue";

    // When sidebarColor is 'light', we use ocean-blue as the default theme.
    // Otherwise, we use the configured theme color from the customizer.

    return (
        <div
            className={cn(
                "lg:flex hidden flex-1 overflow-hidden relative z-10 w-full transition-colors duration-300",
                `dark theme-${themeColor} bg-sidebar`
            )}
        >
            {/* Gradient Mesh Background */}
            <div className="absolute inset-0 w-full h-full bg-transparent">
                {/* Blobs - Using theme colors */}
                <div
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4000ms] bg-primary/20"
                ></div>
                <div
                    className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen bg-secondary/40"
                ></div>
                <div
                    className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full blur-[80px] mix-blend-screen bg-primary/20"
                ></div>
            </div>

            {/* Content Overlay */}
            <div className="relative w-full h-full flex flex-col justify-center items-center p-12 text-center z-20">
                <div className="space-y-2 max-w-lg">

                    <div className="inline-flex p-5 gap-6 justify-center items-center px-10 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm mb-0 shadow-2xl">
                        <div className="brightness-0 invert opacity-90 scale-125">
                            <div className="relative h-16 w-16">
                                <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
                            </div>
                        </div>
                        <h2 className="text-5xl font-black tracking-tight leading-none drop-shadow-2xl transition-colors text-white">
                            MAX AI
                        </h2>
                    </div>

                    <span className="block text-xl font-light mt-4 tracking-[0.25em] uppercase opacity-90 text-indigo-100/90">
                        Patient Management System
                    </span>

                    <p className="text-md leading-relaxed font-light mx-auto max-w-lg text-slate-300/80">
                        Seamlessly integrated artificial intelligence for modern healthcare administration.
                    </p>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-10 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default LoginAnimation;
