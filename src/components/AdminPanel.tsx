"use client";

import { useState } from "react";

interface AdminPanelProps {
  currentStep: number;
  onUnlock: (step: number) => void;
}

export default function AdminPanel({ currentStep, onUnlock }: AdminPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-lg text-[#6b665c] transition-colors hover:bg-[#3d3b37] hover:text-[#E8734A]"
        aria-label="Admin panel"
      >
        ⚙
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-[#3d3b37] bg-[#353330] p-4 shadow-lg shadow-black/20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8a8578]">
              Unlock Steps
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                <button
                  key={step}
                  onClick={() => {
                    onUnlock(step);
                    setOpen(false);
                  }}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    step <= currentStep
                      ? "bg-[#E8734A] text-white"
                      : "border border-[#3d3b37] text-[#c4bfb6] hover:border-[#E8734A] hover:text-[#E8734A]"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                onUnlock(-1);
                setOpen(false);
              }}
              className="mt-3 w-full rounded-md border border-[#3d3b37] px-3 py-2.5 text-sm font-medium text-[#c4bfb6] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
            >
              Lock All
            </button>
          </div>
        </>
      )}
    </div>
  );
}
