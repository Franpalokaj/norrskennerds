"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import StepSection from "../components/StepSection";
import { steps } from "../data/steps";
import { onStepChange } from "../lib/firebase";

function Workshop() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [prevStep, setPrevStep] = useState(-1);
  const initialized = useRef(false);

  // Subscribe to Firebase — all participants receive updates instantly
  useEffect(() => {
    const unsubscribe = onStepChange((step) => {
      setCurrentStep((prev) => {
        if (!initialized.current) {
          initialized.current = true;
          return step;
        }
        setPrevStep(prev);
        return step;
      });
    });

    return unsubscribe;
  }, []);

  // The highest newly unlocked step is the one we scroll to
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
            Claude is the host today. This page is your guide. Each section
            unlocks as we go — copy the prompts, follow along, and by the end
            you&apos;ll have a personal AI coaching system built around who you
            actually are.
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

export default function Home() {
  return (
    <Suspense>
      <Workshop />
    </Suspense>
  );
}
