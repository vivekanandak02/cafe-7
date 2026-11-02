"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Download,
  Printer,
  Copy,
  Check,
  Smartphone,
  Radio,
  Sparkles,
  QrCode,
  Settings2,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";

export default function QRCodeGeneratorPage() {
  const [urlOption, setUrlOption] = useState<"menu-root" | "table" | "menu-route">("menu-root");
  const [tableNumber, setTableNumber] = useState<string>("1");
  const [includeLogo, setIncludeLogo] = useState<boolean>(true);
  const [resolution, setResolution] = useState<number>(1600);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [copiedNfc, setCopiedNfc] = useState<boolean>(false);
  const [qrPngUrl, setQrPngUrl] = useState<string>("");
  const [qrSvgString, setQrSvgString] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final effective URL - strictly the standalone digital menu!
  const effectiveUrl = (() => {
    if (urlOption === "menu-root") {
      return "https://cafe--7.vercel.app/";
    }
    if (urlOption === "table") {
      return `https://cafe--7.vercel.app/?table=${encodeURIComponent(tableNumber)}`;
    }
    if (urlOption === "menu-route") {
      return "https://cafe--7.vercel.app/menu";
    }
    return "https://cafe--7.vercel.app/";
  })();

  // Generate QR Code on canvas and as SVG whenever parameters change
  useEffect(() => {
    let isCancelled = false;

    async function generateQR() {
      try {
        const canvas = canvasRef.current || document.createElement("canvas");
        const size = resolution;
        canvas.width = size;
        canvas.height = size;

        await QRCode.toCanvas(canvas, effectiveUrl, {
          width: size,
          margin: 3,
          errorCorrectionLevel: "H",
          color: {
            dark: "#1B1513",
            light: "#FFFFFF",
          },
        });

        if (includeLogo) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const logoSize = size * 0.24;
            const center = size / 2;
            const x = center - logoSize / 2;
            const y = center - logoSize / 2;
            const radius = logoSize * 0.22;

            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            ctx.shadowBlur = size * 0.015;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = size * 0.005;

            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.roundRect(x - 4, y - 4, logoSize + 8, logoSize + 8, radius + 2);
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = "#2F2622";
            ctx.beginPath();
            ctx.roundRect(x, y, logoSize, logoSize, radius);
            ctx.fill();

            ctx.strokeStyle = "#D2B08A";
            ctx.lineWidth = Math.max(3, size * 0.006);
            ctx.stroke();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#FFFFFF";
            ctx.font = `900 ${logoSize * 0.22}px 'Playfair Display', Georgia, serif`;
            ctx.fillText("CAFÉ", center, center - logoSize * 0.12);

            ctx.fillStyle = "#D2B08A";
            ctx.font = `900 ${logoSize * 0.35}px 'Playfair Display', Georgia, serif`;
            ctx.fillText("7", center, center + logoSize * 0.18);

            ctx.restore();
          }
        }

        const pngUrl = canvas.toDataURL("image/png");
        if (!isCancelled) {
          setQrPngUrl(pngUrl);
        }

        const rawSvg = await QRCode.toString(effectiveUrl, {
          type: "svg",
          margin: 3,
          errorCorrectionLevel: "H",
          color: {
            dark: "#1B1513",
            light: "#FFFFFF",
          },
        });

        let finalSvg = rawSvg;
        if (includeLogo) {
          const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
          let vbWidth = 100;
          let vbHeight = 100;
          if (viewBoxMatch) {
            const parts = viewBoxMatch[1].split(/\s+/).map(Number);
            if (parts.length === 4) {
              vbWidth = parts[2];
              vbHeight = parts[3];
            }
          }
          const logoW = vbWidth * 0.24;
          const logoH = vbHeight * 0.24;
          const lx = (vbWidth - logoW) / 2;
          const ly = (vbHeight - logoH) / 2;
          const rx = logoW * 0.2;

          const logoBadgeSvg = `
  <!-- Café 7 Centered Badge -->
  <g id="cafe7-center-logo">
    <rect x="${lx - 1}" y="${ly - 1}" width="${logoW + 2}" height="${logoH + 2}" rx="${rx + 1}" fill="#FFFFFF" />
    <rect x="${lx}" y="${ly}" width="${logoW}" height="${logoH}" rx="${rx}" fill="#2F2622" stroke="#D2B08A" stroke-width="${Math.max(1, vbWidth * 0.008)}" />
    <text x="${vbWidth / 2}" y="${ly + logoH * 0.4}" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="${logoH * 0.26}" fill="#FFFFFF" letter-spacing="1">CAFÉ</text>
    <text x="${vbWidth / 2}" y="${ly + logoH * 0.8}" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="${logoH * 0.4}" fill="#D2B08A">7</text>
  </g>
</svg>`;

          finalSvg = rawSvg.replace("</svg>", logoBadgeSvg);
        }

        if (!isCancelled) {
          setQrSvgString(finalSvg);
        }
      } catch (err) {
        console.error("QR Generation error:", err);
      }
    }

    generateQR();
    return () => {
      isCancelled = true;
    };
  }, [effectiveUrl, includeLogo, resolution]);

  const handleDownloadPng = () => {
    if (!qrPngUrl) return;
    const a = document.createElement("a");
    a.href = qrPngUrl;
    const filename =
      urlOption === "table"
        ? `cafe7-table-${tableNumber}-menu-qr.png`
        : "cafe7-menu-alone-qr.png";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename =
      urlOption === "table"
        ? `cafe7-table-${tableNumber}-menu-qr.svg`
        : "cafe7-menu-alone-qr.svg";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(effectiveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyNfcUrl = () => {
    navigator.clipboard.writeText(effectiveUrl);
    setCopiedNfc(true);
    setTimeout(() => setCopiedNfc(false), 2000);
  };

  const handlePrintStandee = () => {
    window.print();
  };

  return (
    <div className="min-h-full bg-[#FBF8F4] text-[#3B312C] font-sans">
      {/* Top Header - hidden during print */}
      <header className="no-print sticky top-0 z-40 border-b border-black/5 bg-[#FBF8F4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-xl font-semibold tracking-[0.2em] text-[#2F2622] font-serif"
            >
              CAFE 7
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF3EA] text-[#A97A55] border border-[#E8D8C6]">
              Table QR & Standee Portal
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#A97A55] hover:text-[#8e643f] px-3.5 py-1.5 rounded-full border border-[#E8D8C6] bg-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Menu Alone</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Intro Banner */}
        <div className="no-print mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#FAF3EA] px-3 py-1 rounded-full border border-[#E8D8C6] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A97A55]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A97A55]">
              Standalone Digital Menu Standee
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#2F2622] font-serif">
            Café 7 Standalone Menu QR Code Generator
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#3B312C]/85 max-w-2xl leading-relaxed">
            When a customer scans this QR code or taps the NFC tag, they are brought <strong>strictly to the menu alone</strong>.
          </p>
        </div>

        {/* 2-Column Workspace - hidden during print */}
        <div className="no-print grid gap-8 lg:grid-cols-12 mb-12">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8D8C6] rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 pb-3 border-b border-[#E8D8C6]">
                <Settings2 className="w-4 h-4 text-[#A97A55]" />
                <h2 className="font-serif font-bold text-sm text-[#2F2622]">
                  Scan Destination Options
                </h2>
              </div>

              {/* URL Options */}
              <div className="mt-4 space-y-3">
                <label
                  onClick={() => setUrlOption("menu-root")}
                  className={`flex items-start p-3 rounded-2xl border cursor-pointer transition ${
                    urlOption === "menu-root"
                      ? "bg-[#FAF3EA] border-[#A97A55] text-[#2F2622]"
                      : "bg-[#FBF8F4] border-[#E8D8C6] hover:bg-[#F4EEE7]"
                  }`}
                >
                  <input
                    type="radio"
                    name="urlOption"
                    checked={urlOption === "menu-root"}
                    onChange={() => setUrlOption("menu-root")}
                    className="mt-1 mr-3 accent-[#A97A55]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#2F2622] flex items-center gap-1.5">
                      <span>Menu Alone (Root URL)</span>
                      <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      https://cafe--7.vercel.app/
                    </div>
                    <div className="text-[11px] text-[#A97A55] mt-1 font-medium">
                      Opens directly to the menu alone.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setUrlOption("table")}
                  className={`flex items-start p-3 rounded-2xl border cursor-pointer transition ${
                    urlOption === "table"
                      ? "bg-[#FAF3EA] border-[#A97A55] text-[#2F2622]"
                      : "bg-[#FBF8F4] border-[#E8D8C6] hover:bg-[#F4EEE7]"
                  }`}
                >
                  <input
                    type="radio"
                    name="urlOption"
                    checked={urlOption === "table"}
                    onChange={() => setUrlOption("table")}
                    className="mt-1 mr-3 accent-[#A97A55]"
                  />
                  <div className="flex-1">
                    <div className="text-xs font-bold">Table-Specific Standee</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      https://cafe--7.vercel.app/?table={tableNumber}
                    </div>
                    {urlOption === "table" && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs font-semibold text-[#2F2622]">Table No:</span>
                        <input
                          type="text"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-16 px-2.5 py-1 text-xs border border-[#E8D8C6] rounded-lg bg-white font-bold text-center text-[#A97A55]"
                          placeholder="e.g. 5"
                        />
                      </div>
                    )}
                  </div>
                </label>

                <label
                  onClick={() => setUrlOption("menu-route")}
                  className={`flex items-start p-3 rounded-2xl border cursor-pointer transition ${
                    urlOption === "menu-route"
                      ? "bg-[#FAF3EA] border-[#A97A55] text-[#2F2622]"
                      : "bg-[#FBF8F4] border-[#E8D8C6] hover:bg-[#F4EEE7]"
                  }`}
                >
                  <input
                    type="radio"
                    name="urlOption"
                    checked={urlOption === "menu-route"}
                    onChange={() => setUrlOption("menu-route")}
                    className="mt-1 mr-3 accent-[#A97A55]"
                  />
                  <div>
                    <div className="text-xs font-bold">Route: /menu</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      https://cafe--7.vercel.app/menu
                    </div>
                  </div>
                </label>
              </div>

              {/* Active URL Card */}
              <div className="mt-4 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C6]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#2F2622]">Scan Target URL:</span>
                  <button
                    onClick={handleCopyUrl}
                    className="inline-flex items-center space-x-1 text-[#A97A55] hover:text-[#8e643f] font-semibold cursor-pointer"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs text-[#2F2622] break-all bg-white p-2 rounded-xl border border-stone-200">
                  {effectiveUrl}
                </div>
                <div className="mt-2 flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Opens strictly to the menu alone • No login required</span>
                </div>
              </div>
            </div>

            {/* Visual Options */}
            <div className="bg-white border border-[#E8D8C6] rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-sm text-[#2F2622] pb-2 border-b border-[#E8D8C6]">
                QR Code Customization & Downloads
              </h2>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-[#2F2622]">Café 7 Centered Logo</div>
                  <div className="text-[11px] text-stone-500">
                    High-contrast center badge with gold border.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeLogo}
                  onChange={(e) => setIncludeLogo(e.target.checked)}
                  className="w-4 h-4 accent-[#A97A55] rounded"
                />
              </label>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#2F2622] mb-1">
                  <span>PNG Resolution</span>
                  <span className="text-[#A97A55]">{resolution} × {resolution} px</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="2400"
                  step="200"
                  value={resolution}
                  onChange={(e) => setResolution(Number(e.target.value))}
                  className="w-full accent-[#A97A55]"
                />
              </div>

              {/* Downloads */}
              <div className="pt-2 border-t border-[#E8D8C6] space-y-2">
                <div className="text-xs font-bold text-[#2F2622]">Download QR Codes</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadPng}
                    className="py-2.5 px-3 rounded-xl bg-[#A97A55] hover:bg-[#8e643f] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    onClick={handleDownloadSvg}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F4EEE7] text-[#2F2622] border border-[#E8D8C6] text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A97A55]" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E8D8C6] rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D8C6]">
                <div>
                  <h2 className="font-serif font-bold text-sm text-[#2F2622]">Live Scan Preview</h2>
                  <p className="text-[11px] text-stone-500">
                    Test by scanning with your smartphone camera right now
                  </p>
                </div>
                <button
                  onClick={handlePrintStandee}
                  className="px-3.5 py-1.5 rounded-full bg-[#2F2622] hover:bg-[#1B1513] text-white text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D2B08A]" />
                  <span>Print A6 Standee</span>
                </button>
              </div>

              <div className="mt-5 flex flex-col items-center justify-center">
                <div className="relative p-5 bg-white rounded-3xl border border-[#E8D8C6] shadow-md inline-block">
                  {qrPngUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrPngUrl}
                      alt="Café 7 Digital Menu QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center text-stone-400">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-[#2F2622]">
                    Points directly to: <span className="font-mono text-[#A97A55]">{effectiveUrl}</span>
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Shows only the menu alone!
                  </p>
                </div>
              </div>
            </div>

            {/* NFC Programming Guide Box */}
            <div className="bg-[#FAF3EA] border border-[#E8D8C6] rounded-3xl p-5">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#E8D8C6]">
                <Radio className="w-4 h-4 text-[#A97A55]" />
                <h2 className="font-serif font-bold text-sm text-[#2F2622]">
                  NFC Tag Programming Payload
                </h2>
              </div>

              <div className="mt-3 space-y-2.5 text-xs text-[#3B312C] leading-relaxed">
                <div className="bg-white p-3 rounded-xl border border-[#E8D8C6] space-y-1">
                  <div className="font-bold text-[#2F2622] flex items-center justify-between">
                    <span>NFC Tag Web URL:</span>
                    <button
                      onClick={handleCopyNfcUrl}
                      className="text-[11px] text-[#A97A55] font-semibold flex items-center space-x-1"
                    >
                      {copiedNfc ? (
                        <span className="text-emerald-600">Copied!</span>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-xs bg-[#FAF8F4] p-1.5 rounded-lg border border-stone-200 text-[#2F2622] break-all select-all">
                    {effectiveUrl}
                  </div>
                </div>

                <p className="text-[11px] text-stone-600">
                  Write this exact URL to your physical table NFC tags using the <strong>NFC Tools</strong> app. When customers tap, their phone immediately opens the Café 7 menu alone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRINT-READY A6 TABLE STANDEE SECTION */}
        <section className="mt-8 pt-6 border-t border-[#E8D8C6]">
          <div className="no-print flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#2F2622] font-serif">
                A6 Table Standee Card
              </h2>
              <p className="text-xs text-stone-500">
                105 mm × 148 mm standard format. Ready to print directly from your browser.
              </p>
            </div>
            <button
              onClick={handlePrintStandee}
              className="px-4 py-2 rounded-full bg-[#A97A55] hover:bg-[#8e643f] text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Standee</span>
            </button>
          </div>

          <div className="flex justify-center p-2">
            <div
              id="standee-print-card"
              className="w-[340px] sm:w-[360px] min-h-[490px] bg-white border-2 border-[#2F2622] rounded-3xl p-5 shadow-xl relative flex flex-col justify-between text-center overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 100%)",
              }}
            >
              <div className="absolute top-2 left-2 right-2 bottom-2 rounded-2xl border border-[#D2B08A]/40 pointer-events-none" />

              <div className="pt-1 relative z-10">
                <div className="inline-block px-3 py-0.5 rounded-full bg-[#2F2622] text-[#D2B08A] text-[9px] font-bold uppercase tracking-[0.25em] mb-1.5">
                  {urlOption === "table" ? `Table ${tableNumber} • Digital Menu` : "Digital Table Menu"}
                </div>
                <h3 className="text-2xl font-serif font-black tracking-[0.2em] text-[#2F2622]">
                  CAFÉ 7
                </h3>
                <p className="text-[10px] font-medium text-[#A97A55] uppercase tracking-[0.2em]">
                  Freshly Crafted • Served with Care
                </p>
              </div>

              <div className="my-2 flex flex-col items-center justify-center relative z-10">
                <div className="p-2.5 bg-white rounded-2xl border-2 border-[#E8D8C6] shadow-md inline-block">
                  {qrPngUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrPngUrl}
                      alt="Scan for Cafe 7 Menu"
                      className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center text-stone-400">
                      Loading QR...
                    </div>
                  )}
                </div>
              </div>

              <div className="relative z-10 space-y-1.5">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-1.5 rounded-xl bg-white/90 border border-[#E8D8C6] flex flex-col items-center">
                    <Smartphone className="w-3.5 h-3.5 text-[#A97A55] mb-0.5" />
                    <span className="text-[9px] font-bold text-[#2F2622]">SCAN CAMERA</span>
                    <span className="text-[8px] text-stone-500">Opens Menu directly</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/90 border border-[#E8D8C6] flex flex-col items-center">
                    <Radio className="w-3.5 h-3.5 text-[#A97A55] mb-0.5" />
                    <span className="text-[9px] font-bold text-[#2F2622]">TAP NFC TAG</span>
                    <span className="text-[8px] text-stone-500">Hold phone to base</span>
                  </div>
                </div>

                <div className="text-[10px] font-bold text-[#2F2622]">
                  Instant Digital Menu • No App Required
                </div>
                <p className="text-[9px] text-stone-500">
                  Browse burgers, coffee, wings, shakes & order on WhatsApp!
                </p>
              </div>

              <div className="pt-1.5 border-t border-[#E8D8C6]/80 text-[8px] text-[#3B312C] relative z-10 space-y-0.5">
                <p className="font-semibold text-[#2F2622]">
                  74, Radha Ave Main Rd, Valasaravakkam, Chennai
                </p>
                <p className="text-[#A97A55] font-bold">
                  Order Inquiries: +91 9677419178
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
