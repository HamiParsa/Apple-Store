"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const sections = [
    {
      title: "MacBook Pro",
      description: "Supercharged by M3 Pro and M3 Max chips.",
      image: "https://ipowerresale.com/cdn/shop/files/media_b1e34f36-0321-477b-ab40-682ec91ebc23.png?v=1737419920",
      bg: "bg-white",
      textColor: "text-black",
      effect: "rotate" as const,
    },
    {
      title: "Apple Vision Pro",
      description: "The future of spatial computing.",
      image: "https://vr-compare.com/img/headsets/applevisionpro.png",
      bg: "bg-gray-100",
      textColor: "text-black",
      effect: "parallax" as const,
    },
    {
      title: "iPad Pro",
      description: "Supercharged by the M3 chip.",
      image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-pro-11-inch-13-inch.png",
      bg: "bg-white",
      textColor: "text-black",
      effect: "scaleRotate" as const,
    },
    {
      title: "Apple Watch",
      description: "A revolution on your wrist.",
      image: "https://parspng.com/wp-content/uploads/2023/06/watchpng.parspng.com-9.png",
      bg: "bg-gray-100",
      textColor: "text-black",
      effect: "parallaxZoom" as const,
    },
    {
      title: "AirPods",
      description: "Magical sound experience.",
      image: "https://static.vecteezy.com/system/resources/thumbnails/050/817/512/small_2x/white-apple-airpods-in-a-white-case-on-a-transparent-background-png.png",
      bg: "bg-white",
      textColor: "text-black",
      effect: "hoverGlow" as const,
    },
    {
      title: "Apple TV & Home",
      description: "Entertainment reimagined.",
      image: "https://yourimageshare.com/ib/4dGkm5fFd7.png",
      bg: "bg-gray-100",
      textColor: "text-black",
      effect: "rotateSlow" as const,
    },
  ] as const;

  return (
    <main className="bg-black text-white overflow-x-hidden snap-y snap-mandatory">

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 snap-start">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold"
        >
          iPhone 16 Pro
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
          Made for the vision of tomorrow.
        </motion.p>
        <motion.img
          src="https://www.ipavlik.ru/uploadedFiles/images/news/2024/2/iphone-16-pro-6.jpg"
          alt="iPhone"
          className="mt-10 w-[300px] md:w-[500px] drop-shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </section>

      {/* Scroll Sections */}
      {sections.map((section, idx) => (
        <ScrollSection key={idx} {...section} />
      ))}

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-xs md:text-sm py-10 px-6 leading-6 text-center">
        <p className="mb-4">
          More ways to shop:{" "}
          <a href="#" className="text-blue-500">
            Find an Apple Store
          </a>{" "}
          or other retailer near you. Or call 1-800-MY-APPLE.
        </p>
        <p className="mt-6">Copyright © 2025 Apple Clone. All rights reserved.</p>
      </footer>
    </main>
  );
}

function ScrollSection({
  title,
  description,
  image,
  bg,
  textColor,
  effect,
}: {
  title: string;
  description: string;
  image: string;
  bg: string;
  textColor: string;
  effect: "rotate" | "scaleRotate" | "parallax" | "parallaxZoom" | "hoverGlow" | "rotateSlow";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotateDefault = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const rotateSmall = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scaleSmall = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const scaleMedium = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const opacityAnim = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0.5, 1]);
  const yTextAnim = useTransform(scrollYProgress, [0, 0.1, 0.3], [30, 15, 0]);

  let rotateAnim = rotateDefault;
  let scaleAnim = scaleSmall;

  switch (effect) {
    case "rotate":
      rotateAnim = rotateSmall;
      scaleAnim = scaleSmall;
      break;
    case "scaleRotate":
      rotateAnim = rotateSmall;
      scaleAnim = scaleMedium;
      break;
    case "parallax":
      rotateAnim = rotateDefault;
      scaleAnim = scaleSmall;
      break;
    case "parallaxZoom":
      rotateAnim = rotateDefault;
      scaleAnim = scaleMedium;
      break;
    case "hoverGlow":
      rotateAnim = rotateDefault;
      scaleAnim = scaleSmall;
      break;
    case "rotateSlow":
      rotateAnim = rotateSmall;
      scaleAnim = scaleSmall;
      break;
  }

  return (
    <section ref={ref} className={`h-screen flex flex-col items-center justify-center ${bg} ${textColor} text-center px-6 snap-start`}>
      <motion.h2
        style={{ opacity: opacityAnim, y: yTextAnim }}
        className="text-4xl md:text-6xl font-bold mb-6"
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      <motion.p
        style={{ opacity: opacityAnim, y: yTextAnim }}
        className="mt-2 text-lg md:text-2xl max-w-xl mx-auto"
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {description}
      </motion.p>
      <motion.img
        src={image}
        alt={title}
        style={{ rotate: rotateAnim, scale: scaleAnim }}
        className={`mt-10 w-[300px] md:w-[500px] drop-shadow-2xl transition-shadow duration-500 ${
          effect === "hoverGlow" ? "hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.7)]" : ""
        }`}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      />
    </section>
  );
}
