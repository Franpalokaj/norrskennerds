"use client";

import { Suspense, useState } from "react";
import Header from "../../components/Header";
import StepSection from "../../components/StepSection";
import { steps } from "../../data/steps";

function SelfPacedWorkshop() {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  const lastStepId = steps[steps.length - 1].id;

  const handleContinue = () => {
    setPrevStep(currentStep);
    setCurrentStep((prev) => Math.min(prev + 1, lastStepId));
  };

  const highestNewStep =
    prevStep !== currentStep && currentStep > prevStep ? currentStep : -1;

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
            hit{" "}
            <strong className="text-[#ece8e1]">Continue</strong>{" "}
            to unlock the next one. By the end you&apos;ll have a personal AI
            coaching system built around who you actually are.
          </p>

          {/* Start button */}
          {currentStep < 1 && (
            <button
              onClick={handleContinue}
              className="mt-8 rounded-full border border-[#3d3b37] px-6 py-2.5 text-sm font-medium tracking-wide text-[#8a8578] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
            >
              Start
            </button>
          )}
        </section>

        {/* Divider */}
        <div className="mx-auto w-full max-w-[720px] px-6">
          <hr className="border-[#3d3b37]" />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isCurrentStep = step.id === currentStep;
          const isLastStep = step.id === lastStepId;

          return (
            <StepSection
              key={step.id}
              step={step}
              unlocked={step.id <= currentStep}
              shouldScrollTo={step.id === highestNewStep}
              onContinue={
                isCurrentStep && !isLastStep ? handleContinue : undefined
              }
            />
          );
        })}

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
