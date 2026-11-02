"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Flame,
  ExternalLink,
  Clock3,
  MapPin,
  X,
  Plus,
  Minus,
  CheckCircle2,
  BadgeCheck,
  Phone,
  Eye,
  Lock,
  QrCode,
  Sparkles,
} from "lucide-react";
import { menuCategories, MenuItem } from "@/data/menu";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuCardOpen, setIsMenuCardOpen] = useState<boolean>(false);
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>("");
  const [adminMsg, setAdminMsg] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setToastMessage(`Added ${item.name} to order`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartTotal = useMemo(
    () => cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0),
    [cart]
  );

  const cartItemCount = useMemo(
    () => cart.reduce((acc, ci) => acc + ci.quantity, 0),
    [cart]
  );

  const totalItemCount = useMemo(
    () => menuCategories.reduce((acc, cat) => acc + cat.items.length, 0),
    []
  );

  const burgerCount = useMemo(
    () =>
      menuCategories
        .filter(
          (c) =>
            c.id === "chicken-crunch-burgers" ||
            c.id === "grilled-chicken-burgers" ||
            c.id === "veg-burgers"
        )
        .reduce((acc, c) => acc + c.items.length, 0),
    []
  );

  const friesCount = useMemo(
    () =>
      menuCategories
        .filter((c) => c.id === "fries" || c.id === "loaded-fries")
        .reduce((acc, c) => acc + c.items.length, 0),
    []
  );

  const categoryPills = useMemo(
    () => [
      { id: "all", label: "View All Menu", count: totalItemCount },
      { id: "burgers", label: "🍔 Burgers", count: burgerCount },
      {
        id: "wraps",
        label: "🌯 Wraps",
        count: menuCategories.find((c) => c.id === "wraps")?.items.length || 0,
      },
      {
        id: "appetizers",
        label: "🥟 Appetizers",
        count: menuCategories.find((c) => c.id === "appetizers")?.items.length || 0,
      },
      {
        id: "chicken-wings",
        label: "🍗 Wings",
        count: menuCategories.find((c) => c.id === "chicken-wings")?.items.length || 0,
      },
      {
        id: "chicken-tenders",
        label: "🍗 Crispy Tenders",
        count: menuCategories.find((c) => c.id === "chicken-tenders")?.items.length || 0,
      },
      { id: "fries", label: "🍟 Fries & Loaded", count: friesCount },
      {
        id: "coffee",
        label: "☕ Hot & Cold Coffee",
        count: menuCategories.find((c) => c.id === "hot-cold-coffee")?.items.length || 0,
      },
      {
        id: "iced-tea",
        label: "🧊 Iced Tea",
        count: menuCategories.find((c) => c.id === "iced-tea")?.items.length || 0,
      },
      {
        id: "milk-shakes",
        label: "🥤 Milk Shakes",
        count: menuCategories.find((c) => c.id === "signature-milk-shakes")?.items.length || 0,
      },
      {
        id: "lemonades",
        label: "🍋 Lemonade",
        count: menuCategories.find((c) => c.id === "lemonades")?.items.length || 0,
      },
      {
        id: "mojitos",
        label: "🍹 Mojitos",
        count: menuCategories.find((c) => c.id === "mojitos")?.items.length || 0,
      },
      {
        id: "refreshers",
        label: "🍸 Refreshers",
        count: menuCategories.find((c) => c.id === "refreshers")?.items.length || 0,
      },
      {
        id: "beverages",
        label: "🥤 Beverages",
        count: menuCategories.find((c) => c.id === "beverages")?.items.length || 0,
      },
      {
        id: "combos",
        label: "🍱 Combos",
        count: menuCategories.find((c) => c.id === "combos")?.items.length || 0,
      },
    ],
    [totalItemCount, burgerCount, friesCount]
  );

  const filteredCategories = useMemo(() => {
    return menuCategories
      .filter((cat) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "burgers") {
          return (
            cat.id === "chicken-crunch-burgers" ||
            cat.id === "grilled-chicken-burgers" ||
            cat.id === "veg-burgers"
          );
        }
        if (selectedCategory === "fries") {
          return cat.id === "fries" || cat.id === "loaded-fries";
        }
        if (selectedCategory === "wraps") return cat.id === "wraps";
        if (selectedCategory === "appetizers") return cat.id === "appetizers";
        if (selectedCategory === "chicken-wings") return cat.id === "chicken-wings";
        if (selectedCategory === "chicken-tenders") return cat.id === "chicken-tenders";
        if (selectedCategory === "coffee") return cat.id === "hot-cold-coffee";
        if (selectedCategory === "iced-tea") return cat.id === "iced-tea";
        if (selectedCategory === "milk-shakes") return cat.id === "signature-milk-shakes";
        if (selectedCategory === "lemonades") return cat.id === "lemonades";
        if (selectedCategory === "refreshers") return cat.id === "refreshers";
        if (selectedCategory === "mojitos") return cat.id === "mojitos";
        if (selectedCategory === "beverages") return cat.id === "beverages";
        if (selectedCategory === "combos") return cat.id === "combos";
        return cat.id === selectedCategory;
      })
      .map((cat) => {
        const items = cat.items.filter((item) => {
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(query);
            const matchDesc = item.description?.toLowerCase().includes(query);
            if (!matchName && !matchDesc) return false;
          }
          if (dietFilter === "veg" && !item.isVeg) return false;
          if (dietFilter === "non-veg" && item.isVeg) return false;
          return true;
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [selectedCategory, searchQuery, dietFilter]);

  const generateWhatsAppOrderUrl = () => {
    if (cart.length === 0) return "#";
    let text = `*New Order from Cafe 7 Digital Menu*\n\n`;
    cart.forEach((ci, idx) => {
      text += `${idx + 1}. ${ci.item.name} x${ci.quantity} - ₹${ci.item.price * ci.quantity}\n`;
    });
    text += `\n*Subtotal: ₹${cartTotal}* (taxes extra)\nPlease confirm my order and share preparation time. Thank you!`;
    return `https://wa.me/919677419178?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-full bg-[#FBF8F4] text-[#3B312C] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#A97A55] text-white font-medium px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FBF8F4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.2em] text-[#2F2622] font-serif flex items-center gap-2"
          >
            <span>CAFE 7</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#3B312C] md:flex">
            <Link href="/" className="text-[#A97A55] transition">
              Home
            </Link>
            <a href="#menu-section" className="transition hover:text-[#A97A55]">
              Menu ({totalItemCount})
            </a>
            <Link
              href="/offers"
              className="transition hover:text-[#A97A55] flex items-center space-x-1"
            >
              <span>Offers</span>
              <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase animate-pulse">
                Hot
              </span>
            </Link>
            <Link
              href="/qr"
              className="transition hover:text-[#A97A55] flex items-center space-x-1 font-semibold text-[#A97A55]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR & NFC Standee</span>
            </Link>
            <a href="#about-section" className="transition hover:text-[#A97A55]">
              About
            </a>
            <a href="#contact-section" className="transition hover:text-[#A97A55]">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setIsMenuCardOpen(true)}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#E8D8C6] bg-white text-xs font-semibold text-[#2F2622] hover:bg-[#F4EEE7] transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#A97A55]" />
              <span>Menu Card</span>
            </button>

            <Link
              href="/qr"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#A97A55]/30 bg-[#FAF3EA] text-xs font-semibold text-[#A97A55] hover:bg-[#A97A55] hover:text-white transition cursor-pointer"
              title="Table QR Generator"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Get QR</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="rounded-full bg-[#A97A55] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#8e643f] flex items-center space-x-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Bag</span>
              {cartItemCount > 0 && (
                <span className="bg-white text-[#2F2622] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-[#2F2622]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero_burger.webp"
              alt="A premium café burger presentation"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#D2B08A]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D2B08A]">
                  PREMIUM CAFÉ • FRESHLY CRAFTED
                </span>
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl font-serif">
                Freshly Crafted. <br />
                Served with Care.
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
                Fresh gourmet burgers, crunchy wings, loaded fries, artisanal wraps & signature
                coffees. Made fresh every day in Valasaravakkam, Chennai.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#menu-section"
                  className="rounded-full bg-[#A97A55] px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#8e643f] cursor-pointer shadow-lg"
                >
                  Explore Menu ({totalItemCount} Items)
                </a>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#D2B08A] hover:text-[#D2B08A] cursor-pointer bg-black/20 backdrop-blur-xs"
                >
                  Order Online
                </button>
                <Link
                  href="/qr"
                  className="rounded-full border border-white/20 bg-white/10 backdrop-blur-xs px-5 py-3 text-center text-sm font-semibold text-[#D2B08A] hover:bg-white hover:text-[#2F2622] transition flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Table QR & Standee</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#A97A55]">
              Official 2026 Menu
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#2F2622] sm:text-4xl font-serif">
              Signature Plates & Pours
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#3B312C]/90 leading-relaxed">
              Every dish below is freshly prepared with verified prices and high-resolution photography
              straight from our kitchen and barista bar.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F4EEE7] border border-[#E8D8C6]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#2F2622] uppercase tracking-wider mr-1">
                Filter:
              </span>
              <button
                onClick={() => setDietFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  dietFilter === "all"
                    ? "bg-[#2F2622] text-white shadow-sm"
                    : "bg-white text-[#3B312C] hover:bg-[#E8D8C6]"
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietFilter("veg")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                  dietFilter === "veg"
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-white text-emerald-800 hover:bg-[#E8D8C6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Veg Only 🌱</span>
              </button>
              <button
                onClick={() => setDietFilter("non-veg")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 ${
                  dietFilter === "non-veg"
                    ? "bg-rose-700 text-white shadow-sm"
                    : "bg-white text-rose-800 hover:bg-[#E8D8C6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Non-Veg 🍗</span>
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burger, latte, tenders..."
                className="w-full bg-white border border-[#E8D8C6] rounded-full pl-9 pr-8 py-2 text-xs text-[#2F2622] placeholder-stone-400 focus:outline-none focus:border-[#A97A55]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#2F2622]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {categoryPills.map((pill) => {
              const isSelected = selectedCategory === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition cursor-pointer flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-[#2F2622] text-white shadow-md scale-105"
                      : "bg-white text-[#3B312C] border border-[#E8D8C6] hover:bg-[#F4EEE7]"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-black/10 text-[#3B312C]"
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Deal Highlights */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FAF3EA] border border-[#E8D8C6] rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#2F2622] uppercase tracking-wider text-[11px] block">
                  🍱 Value Combo Deals
                </span>
                <span className="text-[#3B312C] text-[11px] mt-0.5 block">
                  Fries + Soft Drink ₹159 • Fries + Refresher ₹199 • Fries + Lemonade ₹209
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory("combos")}
                className="ml-3 shrink-0 px-3 py-1.5 rounded-full bg-[#A97A55] text-white font-semibold text-[11px] hover:bg-[#8e643f] transition cursor-pointer"
              >
                View Combos
              </button>
            </div>

            <div className="bg-[#FAF3EA] border border-[#E8D8C6] rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#2F2622] uppercase tracking-wider text-[11px] block">
                  🧀 Delicious Extras
                </span>
                <span className="text-[#3B312C] text-[11px] mt-0.5 block">
                  Extra Cheese (+₹30) • Extra Dipping Sauce (+₹30)
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                Available with any item
              </span>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="mt-8 space-y-12">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8D8C6]">
                <p className="text-base text-[#3B312C]">No items match your search or filter.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setDietFilter("all");
                  }}
                  className="mt-3 px-4 py-2 rounded-full bg-[#A97A55] text-white text-xs font-semibold cursor-pointer"
                >
                  Reset Menu
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8D8C6] pb-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#2F2622] font-serif">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-stone-500 mt-0.5">{category.description}</p>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#A97A55] bg-[#F4EEE7] px-3 py-1 rounded-full border border-[#E8D8C6]">
                      {category.items.length} items
                    </span>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item) => (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-[1.75rem] border border-[#E8D8C6] bg-white shadow-[0_4px_20px_rgba(47,38,34,0.04)] hover:shadow-xl transition duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Image Box */}
                          <div
                            onClick={() => setSelectedItemModal(item)}
                            className="relative h-64 sm:h-72 w-full overflow-hidden bg-white border-b border-[#E8D8C6]/50 flex items-center justify-center p-3 cursor-zoom-in"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                            />

                            {/* Veg / Non-Veg Indicator */}
                            <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-xs border border-stone-200">
                              {item.isVeg ? (
                                <div className="w-4 h-4 rounded-xs border-2 border-emerald-600 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded-xs border-2 border-rose-600 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-rose-600" />
                                </div>
                              )}
                            </div>

                            {/* Badges */}
                            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
                              {item.badge && (
                                <span className="rounded-full bg-[#A97A55] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-xs">
                                  {item.badge}
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-xs flex items-center space-x-1">
                                  <Flame className="w-2.5 h-2.5" />
                                  <span>Spicy</span>
                                </span>
                              )}
                              {item.pieces && (
                                <span className="rounded-full bg-white/95 text-[#2F2622] px-2.5 py-1 text-[10px] font-bold shadow-xs border border-stone-200">
                                  {item.pieces}
                                </span>
                              )}
                            </div>

                            {/* Hover zoom pill */}
                            <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full flex items-center space-x-1 backdrop-blur-xs">
                              <Eye className="w-3 h-3" />
                              <span>View Full</span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-base font-semibold text-[#2F2622] leading-snug">
                                {item.name}
                              </h4>
                              <span className="text-lg font-bold text-[#A97A55] font-serif whitespace-nowrap">
                                ₹{item.price}
                              </span>
                            </div>
                            {item.description && (
                              <p className="mt-2 text-xs leading-relaxed text-[#3B312C]/80 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Button */}
                        <div className="p-5 pt-0">
                          <button
                            onClick={() => addToCart(item)}
                            className="w-full py-2.5 rounded-full bg-[#F4EEE7] hover:bg-[#A97A55] text-[#2F2622] hover:text-white border border-[#E8D8C6] text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order • ₹{item.price}</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Standee & QR Code Banner */}
        <section className="bg-gradient-to-r from-[#2F2622] to-[#3B312C] text-white py-12 border-y border-[#E8D8C6]/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                <QrCode className="w-8 h-8 text-[#D2B08A]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Café 7 Digital Menu Standee & NFC Tags
                </h3>
                <p className="text-xs text-white/80 mt-1 max-w-xl">
                  Allow your guests to scan or tap with their mobile cameras directly from their table.
                  Print A6 standees or download high-resolution PNG & vector SVG QR codes instantly.
                </p>
              </div>
            </div>
            <Link
              href="/qr"
              className="shrink-0 px-6 py-3 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
            >
              <span>Open QR & NFC Standee Generator</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="bg-[#F4EEE7] py-20 border-t border-[#E8D8C6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="overflow-hidden rounded-[2rem] border border-[#E8D8C6] bg-white p-3">
                <div className="relative h-[420px] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/items/spanish-latte.webp"
                    alt="Cafe 7 handcrafted specialty brew"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#A97A55]">
                  About Cafe 7
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2F2622] sm:text-4xl font-serif">
                  Welcome to Cafe 7
                </h2>
                <p className="mt-4 text-base leading-7 text-[#3B312C]">
                  At Cafe 7, we believe great food and coffee bring people together. Built on a
                  passion for freshness, quality, and exceptional hospitality, Cafe 7 is a place where
                  every visit feels welcoming and memorable.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E8D8C6] bg-white px-4 py-2.5 text-xs font-semibold text-[#3B312C]">
                    ✓ Freshly Prepared Food
                  </div>
                  <div className="rounded-xl border border-[#E8D8C6] bg-white px-4 py-2.5 text-xs font-semibold text-[#3B312C]">
                    ✓ Hygienic Food Handling
                  </div>
                  <div className="rounded-xl border border-[#E8D8C6] bg-white px-4 py-2.5 text-xs font-semibold text-[#3B312C]">
                    ✓ 100% Quality Ingredients
                  </div>
                  <div className="rounded-xl border border-[#E8D8C6] bg-white px-4 py-2.5 text-xs font-semibold text-[#3B312C]">
                    ✓ Artisanal Signature Coffee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section id="contact-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-[#E8D8C6] bg-[#F4EEE7] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#A97A55]">
                Visit Cafe 7
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#2F2622] font-serif">
                Your neighborhood café in Chennai
              </h2>

              <div className="mt-6 space-y-5 text-[#3B312C] text-sm">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#A97A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2F2622]">Address</p>
                    <p className="mt-1 leading-relaxed">
                      74, Radha Ave Main Rd, Velan Nagar, Valasaravakkam, Chennai, Tamil Nadu 600087
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#A97A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2F2622]">Phone</p>
                    <a href="tel:+919677419178" className="mt-1 block text-[#A97A55] font-semibold">
                      +91 9677419178
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock3 className="w-5 h-5 text-[#A97A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2F2622]">Opening Hours</p>
                    <div className="mt-1 space-y-1 text-xs">
                      <p>Monday – Friday: 8:00 AM – 10:00 PM</p>
                      <p>Saturday: 8:00 AM – 11:00 PM</p>
                      <p>Sunday: 9:00 AM – 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://maps.app.goo.gl/2rdQ6sEXDj48jW5s9"
                  className="rounded-full bg-[#A97A55] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8e643f]"
                >
                  Open in Google Maps
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wa.me/919677419178"
                  className="rounded-full border border-[#A97A55] px-6 py-2.5 text-xs font-semibold text-[#A97A55] hover:bg-white transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#E8D8C6] bg-white p-2 shadow-sm">
              <iframe
                src="https://www.google.com/maps?q=74,%20Radha%20Ave%20Main%20Rd,%20Velan%20Nagar,%20Valasaravakkam,%20Chennai,%20Tamil%20Nadu%20600087&output=embed"
                title="Cafe 7 location"
                className="h-[380px] w-full rounded-[1.5rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Menu Card Modal */}
      {isMenuCardOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E8D8C6] max-w-4xl w-full rounded-3xl p-6 shadow-2xl relative my-6">
            <button
              onClick={() => setIsMenuCardOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-full hover:bg-stone-100 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-between mb-4 pr-12">
              <div>
                <h3 className="text-xl font-semibold font-serif text-[#2F2622]">
                  Official Café 7 Main Menu Card
                </h3>
                <p className="text-xs text-[#3B312C]">
                  Burgers • Fries • Coffee • Shakes • Mojitos • Refreshers • Wraps • Combos
                </p>
              </div>
            </div>
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
              <Image
                src="/images/menu-card-new.png"
                alt="Café 7 Print Card Scan"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 text-center text-xs text-stone-500">
              Verified print resolution card. Every digital item and price on this site matches this exact menu.
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8D8C6] max-w-2xl w-full rounded-3xl p-6 shadow-2xl relative my-6">
            <button
              onClick={() => setSelectedItemModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-full hover:bg-stone-100 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start justify-between mb-4 pr-12">
              <div>
                <div className="flex items-center space-x-2">
                  {selectedItemModal.isVeg ? (
                    <div className="w-3.5 h-3.5 rounded-xs border-2 border-emerald-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-xs border-2 border-rose-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold font-serif text-[#2F2622]">
                    {selectedItemModal.name}
                  </h3>
                </div>
                {selectedItemModal.description && (
                  <p className="text-xs text-[#3B312C]/80 mt-1 max-w-xl">
                    {selectedItemModal.description}
                  </p>
                )}
              </div>
              <span className="text-xl font-bold text-[#A97A55] font-serif whitespace-nowrap">
                ₹{selectedItemModal.price}
              </span>
            </div>
            <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8D8C6]/50 p-2 flex items-center justify-center">
              <Image
                src={selectedItemModal.image}
                alt={selectedItemModal.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-stone-500">Freshly prepared on order</span>
              <button
                onClick={() => {
                  addToCart(selectedItemModal);
                  setSelectedItemModal(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white font-semibold text-xs transition cursor-pointer"
              >
                Add to Order • ₹{selectedItemModal.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            {/* Header */}
            <div className="p-5 border-b border-[#E8D8C6] flex items-center justify-between bg-[#F4EEE7]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#A97A55]" />
                <h3 className="font-serif font-bold text-lg text-[#2F2622]">Your Order Bag</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#A97A55]" />
                  <p className="text-sm">Your order bag is empty.</p>
                  <p className="text-xs mt-1">Add items from the menu to create your order.</p>
                </div>
              ) : (
                cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FBF8F4] border border-[#E8D8C6]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#E8D8C6] shrink-0">
                        <Image
                          src={ci.item.image}
                          alt={ci.item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2F2622]">{ci.item.name}</h4>
                        <span className="text-xs text-[#A97A55] font-semibold">
                          ₹{ci.item.price * ci.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(ci.item.id, -1)}
                        className="w-7 h-7 rounded-full bg-white border border-[#E8D8C6] flex items-center justify-center text-xs hover:bg-[#F4EEE7]"
                      >
                        <Minus className="w-3 h-3 text-[#2F2622]" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, 1)}
                        className="w-7 h-7 rounded-full bg-white border border-[#E8D8C6] flex items-center justify-center text-xs hover:bg-[#F4EEE7]"
                      >
                        <Plus className="w-3 h-3 text-[#2F2622]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E8D8C6] bg-[#F4EEE7] space-y-4">
                <div className="space-y-1.5 text-xs text-[#3B312C]">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-semibold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Applicable Taxes</span>
                    <span>Exclusive</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#2F2622] pt-2 border-t border-[#E8D8C6]">
                    <span>Total Estimate</span>
                    <span className="text-[#A97A55] font-serif text-lg">₹{cartTotal}</span>
                  </div>
                </div>

                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-sm transition cursor-pointer"
                >
                  <span>Send Order to WhatsApp (+91 9677419178)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setCart([])}
                  className="w-full text-center text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  Clear order bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8D8C6] max-w-sm w-full rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsAdminOpen(false);
                setAdminMsg("");
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF3EA] border border-[#E8D8C6] flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5 text-[#A97A55]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2F2622]">Staff Admin Access</h3>
              <p className="text-xs text-stone-500 mt-1">
                Enter your staff passkey to manage digital menu & standee settings.
              </p>
              <input
                type="password"
                placeholder="Enter PIN"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="mt-4 w-full text-center tracking-widest text-lg py-2 border border-[#E8D8C6] rounded-xl focus:outline-none focus:border-[#A97A55]"
              />
              {adminMsg && <p className="text-xs text-rose-500 mt-2">{adminMsg}</p>}
              <button
                onClick={() => {
                  if (adminPin === "7777" || adminPin === "1234") {
                    setAdminMsg("Authenticated. Redirecting to Table QR Generator...");
                    setTimeout(() => {
                      window.location.href = "/qr";
                    }, 500);
                  } else {
                    setAdminMsg("Invalid staff passkey.");
                  }
                }}
                className="mt-4 w-full py-2.5 rounded-full bg-[#A97A55] text-white text-xs font-semibold hover:bg-[#8e643f]"
              >
                Access Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E8D8C6] bg-[#F4EEE7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xl font-semibold tracking-[0.25em] text-[#2F2622] font-serif">
              CAFE 7
            </p>
            <p className="mt-4 max-w-md text-base leading-8 text-[#3B312C]">
              Cafe 7 – Freshly Crafted. Served with Care.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2F2622]">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#3B312C]">
              <Link className="hover:text-[#A97A55]" href="/">
                Home
              </Link>
              <a className="hover:text-[#A97A55]" href="#menu-section">
                Menu ({totalItemCount})
              </a>
              <Link
                className="hover:text-[#A97A55] font-semibold text-[#A97A55]"
                href="/offers"
              >
                Offers & Specials
              </Link>
              <Link
                className="hover:text-[#A97A55] font-semibold text-[#A97A55] flex items-center space-x-1"
                href="/qr"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR & NFC Standee Generator</span>
              </Link>
              <a className="hover:text-[#A97A55]" href="#about-section">
                About
              </a>
              <a className="hover:text-[#A97A55]" href="#contact-section">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2F2622]">Connect</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#3B312C]">
              <a
                href="https://www.instagram.com/thecafe7.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A97A55]"
              >
                <BadgeCheck className="w-4 h-4 text-[#A97A55]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1GuB7BGgk1/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A97A55]"
              >
                <BadgeCheck className="w-4 h-4 text-[#A97A55]" />
                <span>Facebook</span>
              </a>
              <a href="tel:+919677419178" className="inline-flex items-center gap-2 hover:text-[#A97A55]">
                <Phone className="w-4 h-4 text-[#A97A55]" />
                <span>+91 9677419178</span>
              </a>
              <a
                href="https://maps.app.goo.gl/2rdQ6sEXDj48jW5s9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A97A55]"
              >
                <MapPin className="w-4 h-4 text-[#A97A55]" />
                <span>74, Radha Ave Main Rd, Valasaravakkam</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8D8C6] px-4 py-5 text-center text-xs text-[#3B312C] sm:px-6 lg:px-8 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Cafe 7. All rights reserved.</span>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-1.5 rounded-lg text-stone-300 hover:text-stone-600 hover:bg-stone-100 transition cursor-pointer flex items-center space-x-1"
            title="Staff Admin Access"
            aria-label="Staff Admin Login"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline opacity-30 hover:opacity-100">Admin</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
