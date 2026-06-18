"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles, Shield, Truck, RotateCcw, ChevronRight, Check, Mail, TrendingUp, Award, Users } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  badge?: "sale" | "new" | "featured" | "bestseller";
  description: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "1",
    name: "Silk Blend Trench Coat",
    price: 289,
    originalPrice: 420,
    rating: 4.8,
    reviewCount: 312,
    category: "Fashion",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/7913f788-873c-485b-af97-06b34df3fe90/77b16debfba64b9cbc2ead4337c54f6f.png",
    badge: "sale",
    description: "Timeless silhouette in a luxurious silk-wool blend. Effortlessly elegant for any season.",
  },
  {
    id: "2",
    name: "Noise-Cancelling Headphones",
    price: 349,
    rating: 4.9,
    reviewCount: 1024,
    category: "Electronics",
    image: "https://cdn.thewirecutter.com/wp-content/media/2025/05/BEST-NOISE-CANCELLING-HEADPHONES-8246-3x2-1.jpg?auto=webp&quality=75&crop=1:1,smart&width=1024",
    badge: "bestseller",
    description: "Studio-grade audio with 40-hour battery life and adaptive noise cancellation.",
  },
  {
    id: "3",
    name: "Minimalist Leather Watch",
    price: 195,
    originalPrice: 240,
    rating: 4.7,
    reviewCount: 589,
    category: "Fashion",
    image: "https://i.etsystatic.com/31117849/r/il/07887c/3590162831/il_570xN.3590162831_mr5g.jpg",
    badge: "sale",
    description: "Swiss-inspired movement in a slim Italian leather strap. Understated luxury.",
  },
  {
    id: "4",
    name: "Ceramic Diffuser Set",
    price: 78,
    rating: 4.6,
    reviewCount: 203,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/61vKZCbL43L.jpg",
    badge: "new",
    description: "Hand-thrown ceramic diffuser with three signature essential oil blends.",
  },
  {
    id: "5",
    name: "Vitamin C Glow Serum",
    price: 64,
    rating: 4.8,
    reviewCount: 741,
    category: "Beauty",
    image: "https://content.farmasius.com/Product/1002167_400.webp",
    badge: "featured",
    description: "15% stabilised Vitamin C with hyaluronic acid for radiant, even-toned skin.",
  },
  {
    id: "6",
    name: "Merino Wool Joggers",
    price: 128,
    rating: 4.5,
    reviewCount: 167,
    category: "Sports",
    image: "https://content.woolovers.com/img/747x856/345121_a360l_charcoalgrey_w_20.jpg",
    badge: "new",
    description: "Temperature-regulating merino wool for performance and everyday comfort.",
  },
  {
    id: "7",
    name: "Linen Throw Blanket",
    price: 95,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 298,
    category: "Home",
    image: "https://i.etsystatic.com/17725177/r/il/a96f8f/2359898473/il_fullxfull.2359898473_j791.jpg",
    badge: "sale",
    description: "Stone-washed European linen in a palette of muted, earthy tones.",
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    price: 59,
    rating: 4.4,
    reviewCount: 432,
    category: "Electronics",
    image: "https://picsum.photos/seed/40c6babcb662/800/600",
    description: "15W fast-charge compatible with all Qi devices. Slim, matte-finish design.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sophia Laurent",
    role: "Interior Designer",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sophia_Loren_-_1959.jpg/250px-Sophia_Loren_-_1959.jpg",
    rating: 5,
    text: "Lumière has completely transformed how I shop. Every product feels considered and the quality is genuinely exceptional. My ceramic diffuser set is a daily joy.",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "Creative Director",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "The noise-cancelling headphones are the best I've ever owned. Delivery was faster than expected and the packaging was beautifully minimal. Will be back.",
  },
  {
    id: "t3",
    name: "Amara Osei",
    role: "Wellness Coach",
    avatar: "https://www.stay4skill.com/_next/image?url=https%3A%2F%2Fwugqzhebdtnnuxlxtwlt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2Famara-osei.jpg&w=3840&q=75",
    rating: 5,
    text: "I've been searching for a brand that aligns quality with sustainability. Lumière nails it. The Vitamin C serum has genuinely changed my skin.",
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Complimentary delivery on all orders over $75. Express options available at checkout.",
  },
  {
    icon: Shield,
    title: "2-Year Quality Guarantee",
    description: "Every product is backed by our promise. If it's not perfect, we'll make it right.",
  },
  {
    icon: RotateCcw,
    title: "60-Day Free Returns",
    description: "Changed your mind? No problem. Returns are always free, no questions asked.",
  },
  {
    icon: Award,
    title: "Ethically Sourced",
    description: "We partner only with certified suppliers who share our commitment to people and planet.",
  },
];

const STATS = [
  { value: "180K+", label: "Happy Customers", icon: Users },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "2,400+", label: "Curated Products", icon: Sparkles },
  { value: "98%", label: "Would Recommend", icon: TrendingUp },
];

const SALE_PRODUCTS = PRODUCTS.filter((p) => p.badge === "sale");

// ─── Badge component ──────────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  sale: "bg-rose-500 text-white",
  new: "bg-emerald-500 text-white",
  featured: "bg-indigo-600 text-white",
  bestseller: "bg-amber-500 text-white",
};

const badgeLabels: Record<string, string> = {
  sale: "Sale",
  new: "New",
  featured: "Featured",
  bestseller: "Best Seller",
};

function Badge({ type }: { type: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${badgeStyles[type] ?? "bg-gray-200 text-gray-700"}`}
    >
      {badgeLabels[type] ?? type}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {rating.toFixed(1)} ({count.toLocaleString()})
      </span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: ProductItem }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && <Badge type={product.badge} />}
          {discount && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-900 text-white">
              -{discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wished ? "fill-rose-500 text-rose-500" : "text-gray-500"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 pt-20">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-purple-200/25 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                New Season Collection — Now Live
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight"
            >
              Style That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Speak
              </span>{" "}
              for Itself.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              {APP_TAGLINE} Discover handpicked fashion, tech, beauty, and home
              essentials — each chosen for quality, design, and lasting value.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-200 transition-colors"
              >
                Shop the Collection <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-2xl border border-gray-200 shadow-sm transition-colors"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {[
                { label: "Free Shipping $75+" },
                { label: "60-Day Returns" },
                { label: "2-Year Guarantee" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Check className="w-4 h-4 text-emerald-500" />
                  {b.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                className={`rounded-2xl overflow-hidden shadow-lg ${i === 1 ? "mt-8" : ""} ${i === 3 ? "-mt-8" : ""}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-2"
              >
                <stat.icon className="w-6 h-6 text-indigo-200" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-indigo-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                Browse by Category
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Match
              </h2>
              <p className="text-gray-500 leading-relaxed">
                From runway-inspired fashion to cutting-edge tech, we curate the best across every lifestyle category.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {[
                { name: "Fashion", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-rose-100 to-pink-50" },
                { name: "Electronics", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-blue-100 to-indigo-50" },
                { name: "Home", image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90", color: "from-amber-100 to-yellow-50" },
                { name: "Beauty", image: "https://www.redeweb.com/wp-content/uploads/2023/10/aparatos-electronicos.jpg", color: "from-purple-100 to-violet-50" },
                { name: "Sports", image: "https://static.newhomeinc.com/newhomeinc/images/newhomeinc_og.jpg", color: "from-emerald-100 to-green-50" },
                { name: "All", image: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/019b2de5-a026-7756-bcf3-b814be13b01e/compose?aspectRatio=1.78&format=webp&width=1200", color: "from-gray-100 to-slate-50" },
              ].map((cat) => (
                <motion.button
                  key={cat.name}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveCategory(cat.name as Category);
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-b ${cat.color} border border-white hover:shadow-md transition-all`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10"
          >
            {/* Header + filter */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
            >
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                  Our Collection
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>
              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Grid */}
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {(filteredProducts.length > 0 ? filteredProducts : PRODUCTS).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-800 font-semibold rounded-2xl shadow-sm transition-all"
              >
                View All Products <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                Why Lumière
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Shopping, Elevated
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We believe great products deserve great service. Every detail of your experience is designed with care.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {VALUE_PROPS.map((vp) => (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <vp.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{vp.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{vp.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SALE BANNER ──────────────────────────────────────────────────── */}
      <section id="sale" className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={slideInLeft} className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 text-rose-300 rounded-full text-sm font-medium w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Time Offer
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Up to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                  40% Off
                </span>{" "}
                This Season
              </h2>
              <p className="text-indigo-200 leading-relaxed text-lg">
                Our biggest sale of the year is here. Premium fashion, tech, and home essentials at prices that won't last. Shop before they're gone.
              </p>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory("All");
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-900 font-semibold rounded-2xl hover:bg-indigo-50 transition-colors w-fit shadow-xl"
              >
                Shop the Sale <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {SALE_PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-white font-medium text-sm line-clamp-1">{product.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-white font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-indigo-300 text-xs line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                Customer Love
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Trusted by 180,000+ Shoppers
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Don't take our word for it. Here's what our community has to say about the Lumière experience.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col gap-4"
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 sm:p-16 flex flex-col items-center text-center gap-8 border border-indigo-100"
          >
            <motion.div variants={fadeInUp} className="flex flex-col gap-4 max-w-xl">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Get 15% Off Your First Order
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Join the Lumière community. Be first to hear about new arrivals, exclusive drops, and members-only offers — delivered straight to your inbox.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full max-w-md">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl"
                >
                  <Check className="w-5 h-5 text-emerald-600" />
                  <p className="text-emerald-700 font-medium">
                    You're in! Check your inbox for your 15% discount code.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap shadow-lg shadow-indigo-200"
                  >
                    Claim My 15% Off
                  </motion.button>
                </form>
              )}
              <p className="text-xs text-gray-400 mt-3">
                No spam, ever. Unsubscribe at any time. By subscribing you agree to our Privacy Policy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}