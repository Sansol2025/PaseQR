import React from "react";

export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // For scanners, we remove all extra paddings, navbars and decorators to keep battery life high
    // and contrast maxed. The background is pure pitch black.
    <div className="min-h-screen bg-black text-white selection:bg-[#00E5FF] selection:text-black font-sans">
      <main className="h-screen w-full flex flex-col">
        {children}
      </main>
    </div>
  );
}
