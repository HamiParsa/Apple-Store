"use client";
import Link from "next/link";
import { FaApple, FaLaptop, FaTabletAlt, FaMobileAlt, FaHeadphones, FaTv } from "react-icons/fa";
import { IoWatch, IoBagHandleOutline } from "react-icons/io5";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const navItems = [
    { name: "Mac", icon: <FaLaptop size={32} />, link: "/mac" },
    { name: "iPad", icon: <FaTabletAlt size={32} />, link: "/ipad" },
    { name: "iPhone", icon: <FaMobileAlt size={32} />, link: "/iphone" },
    { name: "Watch", icon: <IoWatch size={32} />, link: "/watch" },
    { name: "AirPods", icon: <FaHeadphones size={32} />, link: "/airpods" },
    { name: "TV", icon: <FaTv size={32} />, link: "/tv" },
    { name: "Support", icon: <FiX size={32} />, link: "/support" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // برای کیبورد
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const filteredResults = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Focus on input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredResults[activeIndex] || filteredResults[0];
      if (selected) {
        router.push(selected.link);
        setSearchOpen(false);
        setSearchText("");
        setActiveIndex(-1);
      }
    }
  };

  // Highlight matching text
  const highlightText = (text: string) => {
    const regex = new RegExp(`(${searchText})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 text-black rounded px-1">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md z-50">
      <nav className="flex justify-center items-center gap-6 py-3 text-white relative">
        {/* Logo */}
        <Link href="/" className="text-xl">
          <FaApple />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="hover:text-gray-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Icons & Hamburger */}
        <div className="flex items-center gap-4 absolute right-4 md:static">
          <button
            className="hover:text-gray-400 transition relative z-50"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch />
          </button>

          <Link href="#" className="hover:text-gray-400 transition">
            <IoBagHandleOutline />
          </Link>

          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 text-white flex flex-col py-4 space-y-4 w-full absolute top-full left-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="hover:text-gray-400 ml-5 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Fullscreen Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 mt-100 bg-amber-300 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setSearchOpen(false)}
              >
                <FiX size={28} />
              </button>

              {/* Search Input */}
              <input
                type="text"
                ref={searchInputRef}
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setActiveIndex(-1); }}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="w-full mt-10 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />

              {/* Search Results */}
              {searchText && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 max-h-96 overflow-y-auto space-y-3"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, index) => (
                      <motion.li
                        key={item.name}
                        className={`rounded-xl transition ${
                          index === activeIndex ? "bg-blue-100" : ""
                        }`}
                      >
                        <Link
                          href={item.link}
                          className="flex items-center gap-4 px-6 py-3 rounded-xl hover:bg-gray-100"
                          onClick={() => { setSearchOpen(false); setSearchText(""); setActiveIndex(-1); }}
                        >
                          <div className="text-3xl">{item.icon}</div>
                          <span className="font-semibold text-lg">{highlightText(item.name)}</span>
                        </Link>
                      </motion.li>
                    ))
                  ) : (
                    <li className="px-6 py-3 text-gray-500">No results found</li>
                  )}
                </motion.ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
