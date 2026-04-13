"use client";

import { useState } from "react";
import { submitCoffeeMatch } from "../lib/firebase";

export default function CoffeeMatch() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    await submitCoffeeMatch(trimmed);
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-lg border border-[#9ECE6A]/30 bg-[#9ECE6A]/10 px-6 py-5">
        <p className="text-lg font-semibold text-[#9ECE6A]">
          You&apos;re in! We&apos;ll match you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="flex-1 rounded-lg border border-[#3d3b37] bg-[#353330] px-5 py-3 text-base text-[#ece8e1] placeholder-[#6b665c] outline-none transition-colors focus:border-[#E8734A]"
      />
      <button
        type="submit"
        disabled={!name.trim() || submitting}
        className="rounded-lg bg-[#E8734A] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#d4623e] disabled:opacity-40 disabled:hover:bg-[#E8734A]"
      >
        {submitting ? "..." : "I'm in"}
      </button>
    </form>
  );
}
