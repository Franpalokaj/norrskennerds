"use client";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Norrsken Workshop" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-[#3d3b37] bg-[#2b2a27]/95 px-6 backdrop-blur-sm">
      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6b665c]">
        {title}
      </span>
    </header>
  );
}
