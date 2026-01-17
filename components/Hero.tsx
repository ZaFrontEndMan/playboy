"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Hero() {
    const fullText = "PLAY BOY";
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    // Mouse position for 3D parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring values for 3D feel
    const springConfig = { damping: 25, stiffness: 120 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), springConfig);
    const scale = useSpring(useTransform(mouseY, [0, 1], [1, 1.04]), springConfig);

    // 3D depth layers offsets
    const leftLayerZ = useSpring(useTransform(mouseY, [0, 1], [20, -20]), springConfig);
    const rightLayerZ = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

    useEffect(() => {
        let i = 0;
        setDisplayedText("");

        const typeWriter = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 80); // slightly faster typing for modern feel

        return () => clearInterval(typeWriter);
    }, []);

    // Track mouse position relative to viewport
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            className="
        relative w-full min-h-[80vh] md:min-h-[85vh] lg:min-h-[100vh]
        flex items-center justify-center
        px-4 sm:px-6 lg:px-12
        overflow-hidden
        bg-transparent
        perspective-[1500px]  select-none
      "
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                mouseX.set(x);
                mouseY.set(y);
            }}
        >
            {/* Two-column layout with 3D container */}
            <motion.div
                data-theme="light"
                className="
          relative z-10 grid grid-cols-1 lg:grid-cols-2 
          gap-8 lg:gap-12 xl:gap-16 
          items-center w-full 
        "
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: "preserve-3d",
                    perspective: "1500px",
                }}
            >
                {/* LEFT → 3D Model Container (deeper layer) */}
                <motion.div
                    className="
            relative w-full h-[50vh] lg:h-[70vh] xl:h-[85vh]
            min-h-[380px] overflow-hidden
            
          "
                    style={{
                        transformStyle: "preserve-3d",
                        z: leftLayerZ,
                        translateZ: leftLayerZ,
                    }}
                >
                    <iframe
                        src="https://my.spline.design/mrheadsetconcept-W72mZ5AglZQAmOgt9Qygv4Sp/?transparent=true"
                        className="
              absolute w-full h-full
              border-none scale-125 lg:scale-110
              transition-transform duration-1000
              hover:scale-[1.45] lg:hover:scale-[1.25]
            "
                        style={{
                            background: "transparent !important",
                            backgroundColor: "transparent !important",
                            transformStyle: "preserve-3d",
                        }}
                        allow="autoplay; fullscreen"
                        allowTransparency={true}
                        loading="lazy"
                        title="Future Wear 3D Concept"
                    />
                </motion.div>

                {/* RIGHT → Text content (foreground layer) */}
                <motion.div
                    className="text-center lg:text-left relative z-20"
                    style={{
                        transformStyle: "preserve-3d",
                        translateZ: rightLayerZ,
                        z: rightLayerZ,
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 60, rotateX: -15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1.2, type: "spring", stiffness: 80, damping: 14 }}
                        className="
              font-heading font-extrabold uppercase tracking-[-0.05em]
              text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl
              text-brand-green
              drop-shadow-[0_8px_40px_rgba(5,120,58,0.6)]
              [text-shadow:0_0_40px_rgba(5,120,58,0.4)]
            "
                    >
                        {displayedText}
                        {showCursor && (
                            <motion.span
                                animate={{ opacity: [1, 0.15, 1] }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                  inline-block w-4 lg:w-5 h-[1.1em] ml-2
                  bg-brand-green/90 rounded-sm
                  align-middle translate-y-[-3px]
                  shadow-[0_0_15px_rgba(5,120,58,0.7)]
                "
                                aria-hidden
                            />
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1.3, delay: 1.1, type: "spring", stiffness: 70 }}
                        className="
              mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl
               max-w-xl mx-auto lg:mx-0
              drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]
              [text-shadow:0_0_20px_rgba(0,0,0,0.1)]
            "
                    >
                        Crafted for the future — bold silhouettes, clean lines, and immersive visuals.
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}