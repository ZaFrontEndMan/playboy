"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDrops } from "@/hooks/useDrops";

type Slide = {
  id: number | string;
  label: string;
  title: string;
  copy: string;
  image: string;
};

const fallbackSlides: Slide[] = [
  {
    id: "top",
    label: "Top / 01",
    title: "Aerodynamic Shells",
    copy: "Lightweight protection that keeps movement sharp while sealing out the city. Technical fabrics cut to skim the frame and stay silent.",
    image: "/studio (1).png",
  },
  {
    id: "mid",
    label: "Mid / 02",
    title: "Layered Geometry",
    copy: "Precision layering that snaps into place. Balanced warmth, breathable panels, and clean lines that flex between work and street.",
    image: "/studio (2).png",
  },
  {
    id: "bottom",
    label: "Bottom / 03",
    title: "Grounded Motion",
    copy: "Structured bottoms that anchor the silhouette. Reinforced seams, sculpted taper, and traction-ready finishes built to move.",
    image: "/studio (3).png",
  },
];

export default function SlidesSection() {
  const { data } = useDrops();
  const slideData = useMemo(() => data?.drops ?? [], [data]);

  const slides: Slide[] = useMemo(() => {
    if (slideData.length === 0) return fallbackSlides;
    return slideData.slice(0, 3).map((drop, index) => ({
      id: drop.id,
      label: index === 0 ? "Top / 01" : index === 1 ? "Mid / 02" : "Bottom / 03",
      title: drop.name,
      copy: drop.description,
      image: drop.image,
    }));
  }, [slideData]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const slideCount = slides.length;
  const slideProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, slideCount - 1]
  );

  // Continuous scroll-driven translateX
  const translateX = useTransform(
    slideProgress,
    (value) => `-${value * 100}%`
  );

  // First slide scale effect
  const firstScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32, 0.5],
    [1, 1.05, 1.12, 1.08]
  );

  return (
    <section ref={sectionRef} className="relative mt-16">
      <div className="space-y-10">
        <div className="relative h-[1000vh]">
          <div className="sticky top-10 h-[85vh] overflow-hidden">
            <motion.div
              style={{ x: translateX }}
              className="flex h-full w-full"
            >
              {slides.map((slide, idx) => (
                <SlidePanel
                  key={slide.id}
                  slide={slide}
                  index={idx}
                  scrollProgress={scrollYProgress}
                  imageScale={idx === 0 ? firstScale : undefined}
                  totalSlides={slideCount}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

type SlidePanelProps = {
  slide: Slide;
  index: number;
  scrollProgress: MotionValue<number>;
  imageScale?: MotionValue<number>;
  totalSlides: number;
};

function SlidePanel({
  slide,
  index,
  scrollProgress,
  imageScale,
  totalSlides,
}: SlidePanelProps) {
  // Calculate slide-specific progress ranges
  // Map each slide to a portion of scroll progress
  const slideStart = totalSlides > 1 ? index / (totalSlides - 1) : 0;
  const slideEnd = totalSlides > 1 ? (index + 1) / (totalSlides - 1) : 1;
  const slideCenter = (slideStart + slideEnd) / 2;
  
  // For the last slide, ensure it reaches full visibility at the end
  const isLastSlide = index === totalSlides - 1;

  // Opacity morph: fade in/out as slide enters/exits
  // Ensure last slide stays visible at the end
  const opacity = useTransform(
    scrollProgress,
    isLastSlide
      ? [
          Math.max(0, slideStart - 0.2),
          slideStart,
          slideCenter,
          0.85,
          1,
        ]
      : [
          Math.max(0, slideStart - 0.15),
          slideStart,
          slideCenter,
          slideEnd,
          Math.min(1, slideEnd + 0.15),
        ],
    isLastSlide ? [0, 0.3, 1, 1, 1] : [0, 0.3, 1, 0.3, 0]
  );

  // Blur morph: sharp when active, blurred when transitioning
  const blur = useTransform(
    scrollProgress,
    [
      Math.max(0, slideStart - 0.1),
      slideStart,
      slideCenter,
      slideEnd,
      Math.min(1, slideEnd + 0.1),
    ],
    [8, 4, 0, 4, 8]
  );

  // Scale morph: subtle zoom when active
  const panelScale = useTransform(
    scrollProgress,
    [
      Math.max(0, slideStart - 0.1),
      slideStart,
      slideCenter,
      slideEnd,
      Math.min(1, slideEnd + 0.1),
    ],
    [0.95, 0.98, 1, 0.98, 0.95]
  );

  // Parallax effect for image
  const imageY = useTransform(
    scrollProgress,
    [
      Math.max(0, slideStart - 0.2),
      slideStart,
      slideCenter,
      slideEnd,
      Math.min(1, slideEnd + 0.2),
    ],
    [30, 15, 0, -15, -30]
  );

  // Text content fade and slide
  // Ensure last slide text is visible at the end
  const textOpacity = useTransform(
    scrollProgress,
    isLastSlide
      ? [
          Math.max(0, slideStart - 0.15),
          slideStart + 0.1,
          slideCenter - 0.15,
          slideCenter + 0.1,
          0.85,
          1,
        ]
      : [
          Math.max(0, slideStart - 0.05),
          slideStart + 0.05,
          slideCenter - 0.1,
          slideCenter + 0.1,
          slideEnd - 0.05,
          Math.min(1, slideEnd + 0.05),
        ],
    isLastSlide ? [0, 0.3, 1, 1, 1, 1] : [0, 0, 1, 1, 0, 0]
  );

  const textY = useTransform(
    scrollProgress,
    isLastSlide
      ? [
          Math.max(0, slideStart - 0.15),
          slideStart + 0.1,
          slideCenter,
          0.85,
          1,
        ]
      : [
          Math.max(0, slideStart - 0.05),
          slideStart + 0.05,
          slideCenter,
          slideEnd - 0.05,
          Math.min(1, slideEnd + 0.05),
        ],
    isLastSlide ? [20, 10, 0, 0, 0] : [20, 10, 0, -10, -20]
  );

  const filterBlur = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.article
      className="w-full shrink-0 grid h-full grid-cols-1 md:grid-cols-3"
      style={{
        opacity,
        scale: panelScale,
        filter: filterBlur,
      }}
    >
      <motion.div
        className="relative h-full col-span-2 overflow-hidden"
        style={{
          scale: imageScale || 1,
          y: imageY,
        }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority={index === 0}
          className="object-contain w-full h-auto"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </motion.div>
      <motion.div
        className="flex flex-col justify-center gap-6 p-8 sm:p-12 col-span-1"
        style={{
          opacity: textOpacity,
          y: textY,
        }}
      >
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] ">{slide.label}</p>
          <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
            {slide.title}
          </h3>
        </div>
        <p className="text-sm sm:text-base max-w-xl">{slide.copy}</p>
        <div className="flex items-center gap-3">
          <span className="h-px w-16 bg-white/40" />
          <p className="text-xs uppercase tracking-[0.25em] ">
            Scroll to continue
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}
