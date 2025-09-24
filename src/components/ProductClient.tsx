"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Type definition for a product
type Product = {
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
};

// Main ProductClient component
// Renders product images with scroll animations and description section
export default function ProductClient({ product }: { product: Product }) {
  const { setRef, visible } = useScrollAnimations(product.images.length);
  const desc = useReveal();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="max-w-6xl w-[500px] mt-50 px-4 space-y-32">
        {/* Product images with fade-in animations */}
        {product.images.map((src, index) => {
          const animation = visible[index]
            ? index % 2 === 0
              ? "animate-fadeInLeft"
              : "animate-fadeInRight"
            : "";
          return (
            <div
              key={src}
              ref={setRef(index)}
              className={`relative w-full h-[60vh] opacity-0 ${animation}`}
            >
              <Image src={src} alt={`${product.title} ${index + 1}`} fill className="object-contain" />
            </div>
          );
        })}

        {/* Product description section */}
        <div ref={desc.ref} className={`text-center mt-20 opacity-0 ${desc.isVisible ? "animate-fadeInUp" : ""}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.title}</h1>
          {product.subtitle && <h2 className="text-xl md:text-2xl mb-6 text-gray-300">{product.subtitle}</h2>}
          <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto">{product.description}</p>

          {/* Action buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Buy
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------
   Hooks for animations
---------------------------- */

// Hook for scroll-based image animations
function useScrollAnimations(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));

  // Ensure refs array matches image count
  useEffect(() => {
    setVisible((prev) => {
      if (prev.length === count) return prev;
      const next = Array(count).fill(false);
      for (let i = 0; i < Math.min(prev.length, count); i++) next[i] = prev[i];
      return next;
    });
    if (refs.current.length < count) refs.current.length = count;
  }, [count]);

  // Observe each image element for intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1 && entry.isIntersecting) {
            setVisible((prev) => {
              const copy = [...prev];
              copy[index] = true;
              return copy;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Return setter for ref and visible states
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, visible };
}

// Hook for revealing description section
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
