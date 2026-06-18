"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Heart } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#products" },
      { label: "Best Sellers", href: "#products" },
      { label: "Sale", href: "#sale" },
      { label: "Categories", href: "#categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#newsletter" },
      { label: "Careers", href: "#newsletter" },
      { label: "Press", href: "#newsletter" },
      { label: "Blog", href: "#newsletter" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#newsletter" },
      { label: "Returns", href: "#newsletter" },
      { label: "Shipping Info", href: "#newsletter" },
      { label: "Contact Us", href: "#newsletter" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#newsletter" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {APP_TAGLINE} Discover premium products crafted for those who appreciate quality and style.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-indigo-500 fill-indigo-500" /> for great shopping experiences.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}