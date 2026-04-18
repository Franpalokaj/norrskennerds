"use client";

import { useEffect, useRef, useState } from "react";
import type { StepData } from "../data/steps";
import PromptCard from "./PromptCard";

interface StepSectionProps {
  step: StepData;
  unlocked: boolean;
  shouldScrollTo: boolean;
  onContinue?: () => void;
  continueLabel?: string;
  children?: React.ReactNode;
}

export default function StepSection({
  step,
  unlocked,
  shouldScrollTo,
  onContinue,
  continueLabel,
  children,
}: StepSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [showCollapsible, setShowCollapsible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (shouldScrollTo) {
      const t = setTimeout(() => {
        setAnimateIn(true);
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(t);
    }
    if (unlocked) {
      setAnimateIn(true);
    }
  }, [shouldScrollTo, unlocked]);

  if (!unlocked) {
    return (
      <section className="mx-auto w-full max-w-[720px] px-6 py-12 opacity-50">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8578]">
            Step {step.id}
          </span>
          <h2 className="text-xl font-bold text-[#ece8e1]">{step.title}</h2>
        </div>
        <p className="mt-2 text-sm italic text-[#8a8578]">{step.teaser}</p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`relative mx-auto w-full max-w-[720px] px-6 py-16 transition-all duration-[400ms] ${
        animateIn
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a8578]">
          Step {step.id}
        </span>
        <h2 className="text-xl font-bold text-[#ece8e1]">{step.title}</h2>
      </div>

      <p className="mt-4 text-base leading-relaxed text-[#c4bfb6]">
        {step.content}
      </p>

      {/* Quote callout (Step 0) */}
      {step.quote && (
        <blockquote className="my-8 border-l-[3px] border-[#E8734A] py-1 pl-6 text-xl font-semibold italic leading-relaxed text-[#ece8e1]">
          {step.quote}
        </blockquote>
      )}

      {/* Instructions list (Step 5) */}
      {step.instructions && (
        <ol className="mt-6 space-y-3 pl-1">
          {step.instructions.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-[#c4bfb6]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3d3b37] text-xs font-semibold text-[#E8734A]">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )}

      {/* Prompt cards */}
      {step.prompts?.map((prompt, i) => (
        <PromptCard
          key={i}
          label={prompt.label}
          text={prompt.text}
          preview={prompt.preview}
          downloadFilename={prompt.downloadFilename}
        />
      ))}

      {step.guidance && (
        <p className="mt-6 text-sm text-[#8a8578]">{step.guidance}</p>
      )}

      {/* Custom children (e.g. Coffee Match form) */}
      {children}

      {/* Collapsible section */}
      {step.collapsible && (
        <div className="mt-8">
          <button
            onClick={() => setShowCollapsible(!showCollapsible)}
            className="flex items-center gap-2 text-sm font-medium text-[#E8734A] transition-colors hover:text-[#f0845e]"
          >
            <span
              className={`inline-block transition-transform duration-200 ${
                showCollapsible ? "rotate-90" : ""
              }`}
            >
              ▸
            </span>
            {step.collapsible.title}
          </button>
          {showCollapsible && (
            <ul className="mt-4 space-y-2 rounded-lg bg-[#353330] px-6 py-5">
              {step.collapsible.items.map((item, i) =>
                item.url ? (
                  <li key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#E8734A] transition-colors hover:text-[#f0845e]"
                    >
                      {item.text}
                      <span className="ml-1 text-xs">↗</span>
                    </a>
                  </li>
                ) : (
                  <li
                    key={i}
                    className="text-sm leading-relaxed text-[#c4bfb6]"
                  >
                    {item.text}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}

      {/* Resource links */}
      {step.links && (
        <div className="mt-8 space-y-4">
          {step.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-[#3d3b37] px-6 py-5 transition-colors hover:border-[#E8734A]"
            >
              <span className="text-sm font-semibold text-[#ece8e1]">
                {link.label}
              </span>
              <span className="ml-2 text-xs text-[#E8734A]">↗</span>
              <p className="mt-1 text-sm text-[#8a8578]">{link.description}</p>
            </a>
          ))}
        </div>
      )}

      {/* Inline continue button (self-paced mode) */}
      {onContinue && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={onContinue}
            className="rounded-full border border-[#3d3b37] px-5 py-2 text-xs font-medium tracking-wide text-[#8a8578] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
          >
            {continueLabel ?? "Done — continue"}
          </button>
        </div>
      )}
    </section>
  );
}
