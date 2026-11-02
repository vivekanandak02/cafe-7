"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Flame,
  ExternalLink,
  X,
  Plus,
  Minus,
  CheckCircle2,
  Eye,
  UtensilsCrossed,
  Sparkles,
  Phone,
  MapPin,
} from "lucide-react";
import { menuCategories, MenuItem } from "@/data/menu";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

function MenuContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuCardOpen, setIsMenuCardOpen] = useState<boolean>(false);
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
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
    setTimeout(() => setToastMessage(null), 2200);
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
      { id: "all", label: "View All", count: totalItemCount },
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
        label: "🍗 Tenders",
        count: menuCategories.find((c) => c.id === "chicken-tenders")?.items.length || 0,
      },
      { id: "fries", label: "🍟 Fries", count: friesCount },
      {
        id: "coffee",
        label: "☕ Coffee",
        count: menuCategories.find((c) => c.id === "hot-cold-coffee")?.items.length || 0,
      },
      {
        id: "iced-tea",
        label: "🧊 Iced Tea",
        count: menuCategories.find((c) => c.id === "iced-tea")?.items.length || 0,
      },
      {
        id: "milk-shakes",
        label: "🥤 Shakes",
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
        label: "🥤 Drinks",
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
    let text = `*New Order from Cafe 7 Digital Menu*${tableParam ? ` [Table: ${tableParam}]` : ""}\n\n`;
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
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#A97A55] text-white font-medium px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 animate-bounce text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Direct Menu Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FBF8F4]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2.5">
            <Link
              href="/"
              className="text-lg sm:text-xl font-semibold tracking-[0.2em] text-[#2F2622] font-serif"
            >
              CAFE 7
            </Link>
            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF3EA] border border-[#E8D8C6] text-[10px] sm:text-xs font-semibold text-[#A97A55]">
              <UtensilsCrossed className="w-3 h-3" />
              <span>{tableParam ? `Table ${tableParam}` : "Digital Menu"}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMenuCardOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#E8D8C6] bg-white text-xs font-semibold text-[#2F2622] hover:bg-[#F4EEE7] transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#A97A55]" />
              <span>Menu Card</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="rounded-full bg-[#A97A55] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#8e643f] flex items-center space-x-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Bag</span>
              {cartItemCount > 0 && (
                <span className="bg-white text-[#2F2622] text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ml-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Menu Body */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Compact Greeting & Quick Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F2622]">
                Our Menu
              </h1>
              <p className="text-xs text-[#3B312C]/80 mt-0.5">
                Freshly crafted gourmet food & drinks • 89 items
              </p>
            </div>
            <a
              href="tel:+919677419178"
              className="hidden sm:inline-flex items-center space-x-1 text-xs text-[#A97A55] hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>+91 9677419178</span>
            </a>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#F4EEE7] border border-[#E8D8C6]">
            {/* Diet Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setDietFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  dietFilter === "all"
                    ? "bg-[#2F2622] text-white shadow-xs"
                    : "bg-white text-[#3B312C] hover:bg-[#E8D8C6]"
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietFilter("veg")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  dietFilter === "veg"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-emerald-800 hover:bg-[#E8D8C6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Veg Only 🌱</span>
              </button>
              <button
                onClick={() => setDietFilter("non-veg")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  dietFilter === "non-veg"
                    ? "bg-rose-700 text-white shadow-xs"
                    : "bg-white text-rose-800 hover:bg-[#E8D8C6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Non-Veg 🍗</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food or drinks..."
                className="w-full bg-white border border-[#E8D8C6] rounded-full pl-8 pr-7 py-1.5 text-xs text-[#2F2622] placeholder-stone-400 focus:outline-none focus:border-[#A97A55]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#2F2622]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Pills */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryPills.map((pill) => {
              const isSelected = selectedCategory === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
                    isSelected
                      ? "bg-[#2F2622] text-white shadow-xs"
                      : "bg-white text-[#3B312C] border border-[#E8D8C6] hover:bg-[#F4EEE7]"
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] px-1 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-black/10 text-[#3B312C]"
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8D8C6]">
              <p className="text-sm text-[#3B312C]">No items match your search or filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setDietFilter("all");
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#A97A55] text-white text-xs font-semibold cursor-pointer"
              >
                Reset Menu
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8D8C6] pb-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-[#2F2622] font-serif">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-[11px] text-stone-500 mt-0.5">{category.description}</p>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[#A97A55] bg-[#F4EEE7] px-2.5 py-0.5 rounded-full border border-[#E8D8C6]">
                    {category.items.length} items
                  </span>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <article
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-[#E8D8C6] bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Box */}
                        <div
                          onClick={() => setSelectedItemModal(item)}
                          className="relative h-56 sm:h-64 w-full overflow-hidden bg-white border-b border-[#E8D8C6]/50 flex items-center justify-center p-3 cursor-zoom-in"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                          />

                          {/* Veg / Non-Veg Indicator */}
                          <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 p-1 rounded border border-stone-200">
                            {item.isVeg ? (
                              <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              </div>
                            ) : (
                              <div className="w-3.5 h-3.5 border-2 border-rose-600 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                              </div>
                            )}
                          </div>

                          {/* Badges */}
                          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
                            {item.badge && (
                              <span className="rounded-full bg-[#A97A55] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white shadow-xs">
                                {item.badge}
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs flex items-center space-x-1">
                                <Flame className="w-2.5 h-2.5" />
                                <span>Spicy</span>
                              </span>
                            )}
                            {item.pieces && (
                              <span className="rounded-full bg-white/95 text-[#2F2622] px-2 py-0.5 text-[9px] font-bold shadow-xs border border-stone-200">
                                {item.pieces}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-[#2F2622] leading-snug">
                              {item.name}
                            </h3>
                            <span className="text-base font-bold text-[#A97A55] font-serif whitespace-nowrap">
                              ₹{item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mt-1 text-xs leading-relaxed text-[#3B312C]/80 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="p-4 pt-0">
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-2 rounded-full bg-[#F4EEE7] hover:bg-[#A97A55] text-[#2F2622] hover:text-white border border-[#E8D8C6] text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
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
      </main>

      {/* Floating Bottom Cart Bar (Mobile Sticky) */}
      {cartItemCount > 0 && (
        <aside aria-label="Order summary bar" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8D8C6] p-3 shadow-2xl flex items-center justify-between max-w-lg mx-auto sm:rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF3EA] border border-[#E8D8C6] flex items-center justify-center font-bold text-xs text-[#A97A55]">
              {cartItemCount}
            </div>
            <div>
              <div className="text-xs font-bold text-[#2F2622]">₹{cartTotal}</div>
              <div className="text-[10px] text-stone-500">Subtotal (taxes extra)</div>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-2 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
          >
            <span>View Order Bag</span>
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            <div className="p-4 border-b border-[#E8D8C6] flex items-center justify-between bg-[#F4EEE7]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-[#A97A55]" />
                <h3 className="font-serif font-bold text-base text-[#2F2622]">Your Order Bag</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#A97A55]" />
                  <p className="text-xs">Your order bag is empty.</p>
                </div>
              ) : (
                cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBF8F4] border border-[#E8D8C6]"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#E8D8C6] shrink-0">
                        <Image
                          src={ci.item.image}
                          alt={ci.item.name}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2F2622]">{ci.item.name}</h4>
                        <span className="text-xs text-[#A97A55] font-semibold">
                          ₹{ci.item.price * ci.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => updateQuantity(ci.item.id, -1)}
                        className="w-6 h-6 rounded-full bg-white border border-[#E8D8C6] flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3 text-[#2F2622]" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, 1)}
                        className="w-6 h-6 rounded-full bg-white border border-[#E8D8C6] flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3 text-[#2F2622]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-[#E8D8C6] bg-[#F4EEE7] space-y-3">
                <div className="space-y-1 text-xs text-[#3B312C]">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-semibold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#2F2622] pt-1.5 border-t border-[#E8D8C6]">
                    <span>Total Estimate</span>
                    <span className="text-[#A97A55] font-serif text-lg">₹{cartTotal}</span>
                  </div>
                </div>

                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                >
                  <span>Send Order to WhatsApp (+91 9677419178)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setCart([])}
                  className="w-full text-center text-[11px] text-stone-400 hover:text-stone-600"
                >
                  Clear order bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Item Detail Zoom Modal */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8D8C6] max-w-lg w-full rounded-3xl p-5 shadow-2xl relative my-6">
            <button
              onClick={() => setSelectedItemModal(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-100 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start justify-between mb-3 pr-8">
              <div>
                <h3 className="text-lg font-semibold font-serif text-[#2F2622]">
                  {selectedItemModal.name}
                </h3>
                {selectedItemModal.description && (
                  <p className="text-xs text-[#3B312C]/80 mt-0.5">
                    {selectedItemModal.description}
                  </p>
                )}
              </div>
              <span className="text-lg font-bold text-[#A97A55] font-serif whitespace-nowrap">
                ₹{selectedItemModal.price}
              </span>
            </div>
            <div className="relative w-full h-[40vh] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8D8C6]/50 p-2 flex items-center justify-center">
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
                className="px-5 py-2 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white font-semibold text-xs transition"
              >
                Add to Order • ₹{selectedItemModal.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Card Modal */}
      {isMenuCardOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E8D8C6] max-w-4xl w-full rounded-3xl p-5 shadow-2xl relative my-6">
            <button
              onClick={() => setIsMenuCardOpen(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-100 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold font-serif text-[#2F2622] mb-3">
              Café 7 Print Menu Card
            </h3>
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
              <Image
                src="/images/menu-card-new.png"
                alt="Café 7 Print Card Scan"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#E8D8C6] bg-[#F4EEE7] mt-12 py-6 text-center text-xs text-[#3B312C]">
        <p className="font-semibold text-[#2F2622]">Café 7 • Valasaravakkam, Chennai</p>
        <p className="text-[11px] text-stone-500 mt-1">Orders & Inquiries: +91 9677419178</p>
      </footer>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-stone-400">Loading Café 7 Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
