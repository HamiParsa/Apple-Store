"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
  FaHeadphones,
  FaTv,
} from "react-icons/fa";
import { IoWatch } from "react-icons/io5";

// Type definition for FAQ items
type FAQItem = { question: string; answer: string };

// List of frequently asked questions
const faqs: FAQItem[] = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Password and follow the instructions to reset your password.",
  },
  {
    question: "How do I contact Apple Support?",
    answer: "You can contact Apple Support via chat, call, or visit your nearest Apple Store.",
  },
  {
    question: "How to update my software?",
    answer: "Go to Settings > General > Software Update and check for the latest updates.",
  },
  {
    question: "How do I manage my subscriptions?",
    answer: "Open the App Store > Click your profile > Subscriptions to manage them.",
  },
];

// List of product categories with icons and links
const categories = [
  { name: "Mac", icon: <FaLaptop />, link: "/mac" },
  { name: "iPad", icon: <FaTabletAlt />, link: "/ipad" },
  { name: "iPhone", icon: <FaMobileAlt />, link: "/iphone" },
  { name: "Watch", icon: <IoWatch />, link: "/watch" },
  { name: "AirPods", icon: <FaHeadphones />, link: "/airpods" },
  { name: "TV", icon: <FaTv />, link: "/tv" },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<boolean[]>(
    Array(categories.length).fill(false)
  );

  // Refs for category card <a> elements to observe visibility
  const categoryRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Use IntersectionObserver to animate categories when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = categoryRefs.current.indexOf(entry.target as HTMLAnchorElement);
          if (index !== -1 && entry.isIntersecting) {
            setVisibleCategories((prev) => {
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

    categoryRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Set ref for each category card
  const setRef = (index: number) => (el: HTMLAnchorElement | null) => {
    categoryRefs.current[index] = el;
  };

  return (
    <div className="bg-black text-white px-4 md:px-20 py-20 space-y-20">
      {/* Hero section */}
      <section className="text-center mt-10 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold">Apple Support</h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Get help with your Apple products and services. Find answers, contact support, and explore resources.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
          Contact Support
        </button>
      </section>

      {/* Search Bar */}
      <section className="flex justify-center">
        <input
          type="text"
          placeholder="Search for topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 rounded-full text-black focus:outline-none shadow-lg"
        />
      </section>

      {/* Product Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => {
          const animation = visibleCategories[index]
            ? index % 2 === 0
              ? "animate-fadeInLeft"
              : "animate-fadeInRight"
            : "opacity-0";
          return (
            <Link
              key={cat.name}
              href={cat.link}
              ref={setRef(index)}
              className={`bg-gray-900 p-6 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-gray-800 transition transform hover:-translate-y-2 hover:shadow-2xl text-center ${animation}`}
            >
              <div className="text-5xl">{cat.icon}</div>
              <h3 className="font-semibold text-lg">{cat.name}</h3>
            </Link>
          );
        })}
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="relative group">
            {/* Question button */}
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full px-6 py-5 bg-gray-900 rounded-3xl text-left font-semibold text-lg shadow-lg flex justify-between items-center transition transform hover:scale-[1.02] hover:bg-gray-800"
            >
              {faq.question}
              <span className="text-2xl font-bold">{openFAQ === index ? "−" : "+"}</span>
            </button>

            {/* Answer box */}
            <div
              className="overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-in-out"
              style={{
                maxHeight: openFAQ === index ? "200px" : "0px",
                opacity: openFAQ === index ? 1 : 0,
                marginTop: openFAQ === index ? "1rem" : "0",
              }}
            >
              <div className="bg-gray-800 rounded-2xl px-6 py-4 text-gray-300 shadow-xl">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
