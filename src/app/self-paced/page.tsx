"use client";

import { Suspense, useRef, useState } from "react";
import Header from "../../components/Header";
import StepSection from "../../components/StepSection";
import { steps } from "../../data/steps";

function SelfPacedWorkshop() {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(-1);
  const continueRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    setPrevStep(currentStep);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const highestNewStep =
    prevStep !== currentStep && currentStep > prevStep ? currentStep : -1;

  const isLastStep = currentStep >= steps.length - 1;

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-[720px] px-6 pb-12 pt-24">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#ece8e1] sm:text-5xl">
            Let&apos;s Build
            <br />
            Something
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#c4bfb6]">
            Work through the workshop at your own pace. Complete each step, then
            hit <strong className="text-[#ece8e1]">Continue</strong> to unlock
            the next one. By the end you&apos;ll have a personal AI coaching
            system built around who you actually are.
          </p>
        </section>

        {/* Divider */}
        <div className="mx-auto w-full max-w-[720px] px-6">
          <hr className="border-[#3d3b37]" />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <StepSection
            key={step.id}
            step={step}
            unlocked={step.id <= currentStep}
            shouldScrollTo={step.id === highestNewStep}
          />
        ))}

        {/* Continue button */}
        {!isLastStep && (
          <div
            ref={continueRef}
            className="mx-auto w-full max-w-[720px] px-6 pb-8"
          >
            <button
              onClick={handleContinue}
              className="w-full rounded-lg bg-[#E8734A] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#d4663f] active:bg-[#c05a36]"
            >
              Continue to Step {currentStep + 1}
            </button>
          </div>
        )}

        {/* Spacer between last step and footer */}
        <div className="h-20" />
      </main>

      {/* Footer */}
      <footer className="pb-32 pt-10 text-center text-xs text-[#6b665c]">
        Built with Claude — Norrsken Barcelona, April 2026
      </footer>
    </>
  );
}

export default function SelfPaced() {
  return (
    <Suspense>
      <SelfPacedWorkshop />
    </Suspense>
  );
}
