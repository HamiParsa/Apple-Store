// Footer component for the website
// Displays legal links, copyright info, and shopping options
export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-xs md:text-sm py-10 px-6 leading-6 text-center">
      {/* Shopping information */}
      <p className="mb-4">
        More ways to shop:{" "}
        <a href="#" className="text-blue-500">
          Find an Apple Store
        </a>{" "}
        or other retailer near you. Or call 1-800-MY-APPLE.
      </p>

      {/* Copyright notice */}
      <p className="mt-6">
        Copyright © 2025 Apple Clone. All rights reserved.
      </p>

      {/* Legal and site links */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map(
          (link) => (
            <a key={link} href="#" className="hover:text-gray-200">
              {link}
            </a>
          )
        )}
      </div>
    </footer>
  );
}
