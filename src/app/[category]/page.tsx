import ProductClient from "@/components/ProductClient";

// Define the structure of a Product
export type Product = {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
};

// List of products with details
export const products: Record<string, Product> = {
  mac: {
    title: "Mac",
    subtitle: "Power. Performance. Perfection.",
    description:
      "Experience the ultimate combination of power, speed, and sleek design with the new Mac. Perfect for creatives, professionals, and anyone who demands performance. Whether you're editing videos, designing graphics, or running multiple apps, Mac handles it effortlessly while maintaining a stunning aesthetic.",
    images: [
      "https://yourimageshare.com/ib/Pb3B7QOa5E.png",
      "https://yourimageshare.com/ib/F81Azk4o8k.png",
      "https://yourimageshare.com/ib/hq34e2a4JW.png",
      "https://yourimageshare.com/ib/AytDyPRcvT.png",
    ],
  },
  ipad: {
    title: "iPad",
    subtitle: "Delightfully capable.",
    description:
      "The iPad is your perfect companion for work, play, and creativity. With its powerful chip, stunning display, and Apple Pencil support, you can sketch, edit documents, stream videos, and multitask with ease. Lightweight and versatile, it adapts to everything you need it to be.",
    images: [
      "https://yourimageshare.com/ib/Ja8LCFE4b4.png",
      "https://yourimageshare.com/ib/MYNNYiFGkI.png",
      "https://yourimageshare.com/ib/8ddlQfkbBh.png",
      "https://yourimageshare.com/ib/VTQF1VPPbg.png",
    ],
  },
  iphone: {
    title: "iPhone",
    subtitle: "Ultimate iPhone experience.",
    description:
      "iPhone delivers incredible performance, design, and camera quality. Capture stunning photos, enjoy smooth gaming, and experience the latest iOS features. Its powerful chip and long battery life keep you connected and productive all day, while Face ID and privacy features ensure your data stays safe.",
    images: [
      "https://yourimageshare.com/ib/NCMcupXjs2.png",
      "https://yourimageshare.com/ib/E3IU17hK9d.png",
      "https://yourimageshare.com/ib/KbkVs75DuJ.png",
      "https://yourimageshare.com/ib/iSF7yDBWVN.png",
    ],
  },
  watch: {
    title: "Watch",
    subtitle: "A healthier, more connected life.",
    description:
      "Apple Watch keeps you healthy, active, and connected. Track workouts, monitor your heart rate, sleep, and mindfulness. Receive calls, messages, and notifications directly on your wrist. With a variety of bands and watch faces, it’s customizable to fit your lifestyle and fashion.",
    images: [
      "https://yourimageshare.com/ib/L2dZ03FhSy.png",
      "https://yourimageshare.com/ib/PEQyhQFF3V.png",
      "https://yourimageshare.com/ib/4eGlC1GNTM.png",
      "https://yourimageshare.com/ib/mOhR9bvfqb.png",
    ],
  },
  airpods: {
    title: "AirPods",
    subtitle: "Effortless listening.",
    description:
      "AirPods offer wireless freedom and superior sound quality. With instant pairing, long battery life, and active noise cancellation, immerse yourself in music, calls, or podcasts. Lightweight and portable, they’re perfect for travel, work, or workouts.",
    images: [
      "https://yourimageshare.com/ib/iCyGgtqtrw.png",
      "https://yourimageshare.com/ib/aYfJItJMt6.png",
      "https://yourimageshare.com/ib/owlcl9yPeO.png",
      "https://yourimageshare.com/ib/71LfEXLF89.png",
    ],
  },
  tv: {
    title: "Apple TV",
    subtitle: "The ultimate home entertainment experience.",
    description:
      "Apple TV brings movies, shows, and apps together on one platform. Stream 4K content, enjoy Apple Arcade games, or access your favorite streaming services. With Siri remote, multi-room audio, and HomeKit integration, it becomes the heart of your connected living room.",
    images: [
      "https://yourimageshare.com/ib/z7b0LDXWRj.png",
      "https://yourimageshare.com/ib/4i7y1wb3qE.png",
      "https://yourimageshare.com/ib/o5DBzGIcmS.png",
      "https://yourimageshare.com/ib/RKQRwL7aip.png",
    ],
  },
};

// Type for product keys
type ProductKey = keyof typeof products;

// Generate static paths for Next.js dynamic routing
export function generateStaticParams() {
  return (Object.keys(products) as ProductKey[]).map((category) => ({ category }));
}

// Render the product page based on the category parameter
export default function ProductPage({ params }: { params: { category: ProductKey } }) {
  const product = products[params.category];
  if (!product) return <p className="text-center mt-20 text-white">Product not found</p>;

  return <ProductClient product={product} />;
}
