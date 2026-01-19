'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useMounted } from '@/hooks/use-mounted';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
    const mounted = useMounted();
    const [show, setShow] = React.useState(true);

    React.useEffect(() => {
        if (mounted) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [mounted]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="relative flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="relative h-20 w-20"
                        >
                            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
                            <Image
                                src="/images/logo/ihc_logo.png"
                                fill
                                alt="Max PMS Logo"
                                className="object-contain drop-shadow-sm"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
                                Max PMS
                            </h1>
                            <div className="flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                <span>Initializing...</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
