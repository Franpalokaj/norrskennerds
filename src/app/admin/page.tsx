"use client";

import { useEffect, useState } from "react";
import { setStep, onStepChange } from "../../lib/firebase";
import { steps } from "../../data/steps";

export default function AdminPage() {
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const unsubscribe = onStepChange((step) => {
      setCurrentStep(step);
    });
    return unsubscribe;
  }, []);

  const handleUnlock = (step: number) => {
    setStep(step);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2b2a27] px-6">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-[#8a8578]">
          Workshop Control
        </p>

        <div className="rounded-xl border border-[#3d3b37] bg-[#353330] p-6">
          <p className="mb-4 text-center text-sm text-[#8a8578]">
            Current step:{" "}
            <span className="font-semibold text-[#ece8e1]">
              {currentStep >= 0 ? currentStep : "Locked"}
            </span>
          </p>

          <div className="grid grid-cols-3 gap-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleUnlock(step.id)}
                className={`rounded-lg px-3 py-4 text-sm font-medium transition-colors ${
                  step.id <= currentStep
                    ? "bg-[#E8734A] text-white"
                    : "border border-[#3d3b37] text-[#c4bfb6] hover:border-[#E8734A] hover:text-[#E8734A]"
                }`}
              >
                <span className="text-lg">{step.id}</span>
                <p className="mt-1 truncate text-[10px] opacity-70">
                  {step.title}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleUnlock(-1)}
            className="mt-4 w-full rounded-lg border border-[#3d3b37] px-3 py-3 text-sm font-medium text-[#c4bfb6] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
          >
            Lock All
          </button>
        </div>
      </div>
    </div>
  );
}
