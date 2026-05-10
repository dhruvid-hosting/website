"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  PenTool,
  Sliders,
  Sparkles,
  LifeBuoy,
  FileText,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import monogramLogo from "../assets/druvid-logo-monogram.webp";

export function Navigation2() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = {
    Product: [
      {
        icon: Calendar,
        title: "Plan",
        description: "Plan your day your way",
        href: "#",
      },
      {
        icon: PenTool,
        title: "Write",
        description: "One Writing Experience, Every Device",
        href: "#",
      },
      {
        icon: Sliders,
        title: "Organize",
        description: "Structure that adapts to Your thinking",
        href: "#",
      },
      {
        icon: Sparkles,
        title: "Customize",
        description: "Make it unmistakably yours",
        href: "#",
      },
    ],
    Community: [
      {
        icon: Sparkles,
        title: "What's New",
        description: "Latest updates and features",
        href: "#",
      },
      {
        icon: LifeBuoy,
        title: "Help and Support",
        description: "Get help when you need it",
        href: "#",
      },
      {
        icon: FileText,
        title: "Blog",
        description: "Stories and insights",
        href: "#",
      },
      {
        icon: MessageCircle,
        title: "Discord",
        description: "Chat and connect",
        href: "#",
      },
    ],
  };

  return (
      <nav className="sticky top-0 w-full px-4 sm:px-6 py-3 sm:py-4 z-50">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Desktop Navigation */}
          <motion.div
            className="relative mx-auto hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* Nav Container - Always rounded rectangle */}
            <div className="mx-auto w-fit rounded-[1.75rem] bg-[rgba(16,16,30,0.72)] backdrop-blur-[14px] border border-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* Main Nav Bar */}
              <div className="flex items-center justify-between gap-15 pl-10.5 pr-6 py-5.5">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white no-underline mr-2">
                  <img src={monogramLogo} alt="Dhruvid monogram" className="h-8 w-8 object-contain" />
                  Dhruvid
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-2.5">
                  <button
                    onMouseEnter={() => setActiveMenu("Product")}
                    className="px-6 py-3 text-sm tracking-tight font-normal text-slate-300 hover:text-white rounded-full"
                  >
                    Product
                  </button>
                  <button
                    onMouseEnter={() => setActiveMenu("Community")}
                    className="px-6 py-3 text-sm tracking-tight font-normal text-slate-300 hover:text-white rounded-full"
                  >
                    Community
                  </button>
                  <a
                    href="#"
                    className="px-6 py-3 text-sm tracking-tight font-normal text-slate-300 hover:text-white rounded-full no-underline"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    Pricing
                  </a>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 ml-12">
                  <a
                    href="#"
                    className="px-6 py-3 tracking-tight text-sm font-normal text-slate-300 hover:text-white no-underline"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="px-9 py-4 rounded-xl bg-white text-black text-sm font-medium tracking-tight hover:bg-slate-100 no-underline"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    Try For Free
                  </a>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeMenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-3">
                      <div className="grid grid-cols-2 gap-4.5 w-[720px]">
                        {menuItems[activeMenu].map(
                          (item, index) => {
                            const Icon = item.icon;
                            return (
                              <motion.a
                                key={item.title}
                                href={item.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.05,
                                  ease: "easeOut",
                                }}
                                className="group flex items-start gap-4.5 rounded-2xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-300 dark:border-neutral-800/50 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-[border-color,box-shadow] duration-200"
                              >
                                <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                  <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-normal text-neutral-900 dark:text-white mb-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.a>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="rounded-3xl bg-white/40 backdrop-blur-2xl border border-neutral-300 shadow-xl dark:bg-neutral-950/20 dark:border-neutral-800/50 overflow-hidden">
              {/* Mobile Nav Bar */}
              <div className="flex items-center justify-between pl-6 pr-4.5 py-4.5">
                {/* Logo */}
                <a
                  href="#"
                  className="text-xl font-medium text-tighter text-neutral-900 dark:text-white"
                >
                  Flowbase
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Mobile Expanded Content */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      {/* Mobile Menu Content */}
                      <div className="space-y-4">
                        {/* Simple Links */}
                        <div className="space-y-1">
                          <a
                            href="#"
                            className="block py-2 px-2 text-sm font-medium text-neutral-900 dark:text-white no-underline"
                          >
                            Pricing
                          </a>
                          <a
                            href="#"
                            className="block py-2 px-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 no-underline"
                          >
                            Log in
                          </a>
                        </div>

                        {/* Mobile CTA */}
                        <div>
                          <a
                            href="#"
                            className="block w-full text-center px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium no-underline"
                          >
                            Try Flowbase Free
                          </a>
                        </div>

                        {/* Product Section */}
                        <div className="pt-2 border-neutral-200 dark:border-neutral-800">
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 px-2">
                            Product
                          </h3>
                          <div className="space-y-2">
                            {menuItems.Product.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-start gap-3 rounded-xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 p-3 no-underline"
                                >
                                  <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                    <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>

                        {/* Community Section */}
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 px-2">
                            Community
                          </h3>
                          <div className="space-y-2">
                            {menuItems.Community.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-start gap-3 rounded-xl bg-white/20 backdrop-blur-2xl dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 p-3 no-underline"
                                >
                                  <div className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2">
                                    <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </nav>
  );
}

export default Navigation2;
