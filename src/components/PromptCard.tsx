"use client";

import { useState } from "react";

interface PromptCardProps {
  label?: string;
  text: string;
}

export default function PromptCard({ label, text }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8">
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8a8578]">
          {label}
        </p>
      )}
      <div className="relative rounded-lg border-l-[3px] border-l-[#E8734A] bg-[#353330] pb-6 pl-7 pr-6 pt-6">
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 rounded-md border border-[#3d3b37] bg-[#2b2a27] px-3 py-1.5 text-xs font-medium text-[#c4bfb6] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <div className="whitespace-pre-wrap pr-16 text-sm leading-relaxed text-[#c4bfb6]">
          {text}
        </div>
      </div>
    </div>
  );
}
