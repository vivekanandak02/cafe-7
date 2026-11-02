"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Sparkles, Phone, MapPin, BadgeCheck } from "lucide-react";
import { offersData } from "@/data/offers";

export default function OffersPage() {
  return (
    <div className="min-h-full bg-[#FBF8F4] text-[#3B312C] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FBF8F4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.2em] text-[#2F2622] font-serif"
          >
            CAFE 7
          </Link>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#A97A55] hover:text-[#8e643f] px-3.5 py-1.5 rounded-full border border-[#E8D8C6] bg-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Menu</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#FAF3EA] px-3 py-1 rounded-full border border-[#E8D8C6] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A97A55]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A97A55]">
              Exclusive Deals & Specials
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#2F2622] sm:text-4xl font-serif">
            Café 7 Current Offers
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#3B312C]/90 leading-relaxed">
            Take advantage of our weekend discounts, cooler hours BOGO deals, and student combos.
            Valid on dine-in and takeaways at our Valasaravakkam location.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {offersData.map((offer) => (
            <div
              key={offer.id}
              className="overflow-hidden rounded-[2rem] border border-[#E8D8C6] bg-white shadow-[0_4px_20px_rgba(47,38,34,0.04)] hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#FAF7F2] p-4 flex items-center justify-center border-b border-[#E8D8C6]/50">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-contain p-2"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="rounded-full bg-[#A97A55] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center space-x-1.5">
                      <Tag className="w-3 h-3" />
                      <span>{offer.badge}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-[#2F2622]">{offer.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#3B312C]/80">
                    {offer.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-xs text-[#A97A55] font-semibold bg-[#FAF3EA] px-3 py-1.5 rounded-xl border border-[#E8D8C6] w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{offer.validTill}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/#menu-section"
                  className="w-full py-3 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <span>Order Now from Menu</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8D8C6] bg-[#F4EEE7] mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center text-xs text-[#3B312C]">
          <p>© {new Date().getFullYear()} Cafe 7. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
