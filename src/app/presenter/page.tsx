"use client";

import { useState, useEffect, useCallback } from "react";

// ────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────

type Card = {
  type: "say" | "prompt" | "do" | "note";
  text: string;
};

type Section = {
  id: string;
  time: string | null;
  duration: number;
  title: string;
  cards: Card[];
};

const sections: Section[] = [
  {
    id: "opening",
    time: "0:00",
    duration: 2,
    title: "The Opening",
    cards: [
      {
        type: "say",
        text: '"Hey everyone. This workshop was actually designed by someone else. I\'m going to let him introduce himself."',
      },
      {
        type: "prompt",
        text: "Hey, they're here. Want to say hi?",
      },
      {
        type: "note",
        text: "Claude introduces himself on the big screen. Let the room react. Don't rush the laugh.",
      },
    ],
  },
  {
    id: "why-here",
    time: "0:02",
    duration: 5,
    title: "Why Are You Here?",
    cards: [
      {
        type: "say",
        text: '"Before we dive in — I\'d love to hear from a few of you. What brought you here today?"',
      },
      {
        type: "do",
        text: "Pick 3 people. Keep it loose — 60-90 seconds each.",
      },
      {
        type: "say",
        text: 'Riff on what you hear: "Okay, so we\'ve got someone building a startup, someone trying to get their mornings under control, and someone who just wants to see what the fuss is about. All of that is on the menu today."',
      },
    ],
  },
  {
    id: "paper",
    time: "0:07",
    duration: 2,
    title: "The Paper Moment",
    cards: [
      {
        type: "prompt",
        text: "What should they do first?",
      },
      {
        type: "note",
        text: 'Claude responds: "Write down one sentence: \'The thing I can\'t figure out is ___.\'  Something real. Fold it. Put it away. We\'ll come back to it at the end."',
      },
      {
        type: "do",
        text: "Hand out post-its and pens. Everyone writes. Folds. Sets aside. This is the only analogue moment of the day.",
      },
    ],
  },
  {
    id: "devices",
    time: "0:09",
    duration: 6,
    title: "Claude Goes Live on Every Device",
    cards: [
      {
        type: "say",
        text: '"Okay, open Claude on your laptops. If you\'re on Max, use Opus. If you\'re on Pro, Sonnet works great."',
      },
      {
        type: "prompt",
        text: "They're ready to start building.",
      },
      {
        type: "note",
        text: 'Claude: "By the way — I prepped a website for all of you. Go to norrskennerds.vercel.app. Everything you need is there. Let\'s build."',
      },
      {
        type: "say",
        text: '"My buddy is now on all your devices. He\'s helping me coach you through this."',
      },
    ],
  },
  {
    id: "story",
    time: "0:15",
    duration: 4,
    title: "One Breakthrough Story",
    cards: [
      {
        type: "say",
        text: "Tell the one-link-lesson inversion story: \"I was building The Faculty — I had this dashboard idea, wanted to test it with teachers. My Creative agent proposed something different. Instead of a full product, it said: give one teacher one link to one lesson and see what happens. That single inversion informed every conversation I've had since. I didn't think of it on my own.\"",
      },
      {
        type: "say",
        text: "\"That's what we're building today. Three agents that think differently from you. Let's go.\"",
      },
      {
        type: "note",
        text: "Keep it tight — one story, one punchline, done. Max 3 minutes.",
      },
    ],
  },
  {
    id: "build-1",
    time: "0:19",
    duration: 13,
    title: "BUILD: The Daily Partner",
    cards: [
      { type: "do", text: "Unlock Step 1 on the website." },
      {
        type: "say",
        text: '"Copy the prompt from the website, paste it into Claude, and follow along. Claude will interview you about your morning routine, what you want tracked, what tone you want. Just answer honestly."',
      },
      {
        type: "do",
        text: "Walk the room. Help stuck people. Keep energy up.",
      },
      {
        type: "note",
        text: '"Who got a response that surprised them? Read us one line." — quick interaction, no screen-sharing needed.',
      },
      {
        type: "say",
        text: "Screen-share your own Daily Partner: \"Here's what mine said to me this morning. It noticed I'd been avoiding a specific task for three days and called me on it.\"",
      },
    ],
  },
  {
    id: "build-2",
    time: "0:32",
    duration: 13,
    title: "BUILD: The Creative",
    cards: [
      { type: "do", text: "Unlock Step 2 on the website." },
      {
        type: "say",
        text: "\"This is the one I use for inversions, 10x thinking, reframes. It's the one that caught the insight I just told you about.\"",
      },
      {
        type: "do",
        text: "Same flow: copy prompt, build the agent. They know the drill now.",
      },
      {
        type: "say",
        text: "Downtime example: [TODO — fill in a real Creative output example]",
      },
    ],
  },
  {
    id: "build-3",
    time: "0:45",
    duration: 10,
    title: "BUILD: The Skeptic",
    cards: [
      { type: "do", text: "Unlock Step 3 on the website." },
      {
        type: "say",
        text: "\"This one's going to annoy you. That's the point.\"",
      },
      {
        type: "do",
        text: "Fastest build — they've done it twice now.",
      },
    ],
  },
  {
    id: "context",
    time: "0:55",
    duration: 8,
    title: "Shared Context MD",
    cards: [
      { type: "do", text: "Unlock Step 4 on the website." },
      {
        type: "say",
        text: "\"Right now your three agents are strangers. They don't know each other. This step changes that.\"",
      },
      {
        type: "do",
        text: 'Screen-share your folder in Typora: "Here\'s what mine looks like." Show context.md as a styled doc.',
      },
      {
        type: "say",
        text: '"Tip: if you want to read these files nicely, download Typora. Double-click any .md file — it looks like a real document."',
      },
      {
        type: "note",
        text: "Pre-open your folder + Typora before the workshop so you can show it without fumbling.",
      },
    ],
  },
  {
    id: "mcp",
    time: "1:03",
    duration: 7,
    title: "One MCP (Calendar)",
    cards: [
      { type: "do", text: "Unlock Step 5 on the website." },
      {
        type: "say",
        text: "\"This is how you connect Claude to your actual tools. We're going to do the simplest one: your calendar.\"",
      },
      { type: "do", text: "Walk through calendar MCP setup." },
      {
        type: "say",
        text: '"Now ask your accountability partner to load your calendar and tell you what you have planned for the day."',
      },
      {
        type: "note",
        text: "Point to the website for a list of other MCPs (Notion, Todoist, etc.) — explore after.",
      },
    ],
  },
  {
    id: "energy",
    time: null,
    duration: 0,
    title: "⚡ Energy Dip Protocol",
    cards: [
      {
        type: "note",
        text: "Deploy when you sense the room dipping (usually ~35-45 min in). This is a floating section — use it when needed.",
      },
      {
        type: "say",
        text: "\"Quick hands up — who's got their first agent talking back to them?\"",
      },
      {
        type: "say",
        text: "\"Who's stuck?\" → \"Stuck people: turn to the person next to you. They'll help you for 2 minutes.\"",
      },
      {
        type: "note",
        text: "Peer troubleshooting. Normalizes being stuck, creates bonding, gives ahead-people a role.",
      },
    ],
  },
  {
    id: "finale",
    time: "1:10",
    duration: 13,
    title: "THE FINALE: Unfold → Creative → Skeptic",
    cards: [
      { type: "do", text: "Unlock Step 6 on the website." },
      {
        type: "say",
        text: '"Remember that post-it from the beginning? Unfold it."',
      },
      { type: "note", text: "Room goes quiet. Let the moment land." },
      {
        type: "say",
        text: "\"Now feed that to your Creative. The thing you couldn't figure out — let's see what it does with it.\"",
      },
      {
        type: "do",
        text: "Wait 2-3 minutes. People see their real question get a Creative reframe.",
      },
      {
        type: "say",
        text: "\"Now take whatever the Creative said — copy the whole thing — and feed it to the Skeptic.\"",
      },
      { type: "do", text: "Wait 2-3 minutes. Watch for laughs." },
      {
        type: "say",
        text: "\"Who got wrecked? Anyone's Skeptic completely destroy their Creative's idea?\"",
      },
      {
        type: "do",
        text: "Pick 2-3 people to read their Skeptic's response out loud. This is the moment.",
      },
    ],
  },
  {
    id: "principles",
    time: "1:23",
    duration: 4,
    title: "Principles as Debrief",
    cards: [
      {
        type: "prompt",
        text: "What should they know about working with you long-term?",
      },
      {
        type: "note",
        text: "Claude delivers principles in first person. Tie each one to something they just experienced:",
      },
      {
        type: "say",
        text: "\"I will try to agree with you. Don't let me.\" → \"Remember when your agent kept agreeing? That's this.\"",
      },
      {
        type: "say",
        text: "\"I lose context. Your shared context MD is my memory — keep it updated.\"",
      },
      {
        type: "say",
        text: "\"The more specific you are about who you are, the better I get.\"",
      },
      {
        type: "say",
        text: "\"I'm not a search engine. I'm a thinking partner. Use me for the hard questions.\"",
      },
    ],
  },
  {
    id: "coffee",
    time: "1:27",
    duration: 2,
    title: "Coffee Match Sign-Up",
    cards: [
      {
        type: "say",
        text: "\"One more thing before we wrap. Next week, I'm going to match each of you with a stranger from this room for a coffee. You'll compare systems, swap tricks. If you're in, go to the website and drop your name.\"",
      },
      { type: "do", text: "Unlock Coffee Match section on the website." },
    ],
  },
  {
    id: "mugs",
    time: "1:29",
    duration: 3,
    title: "The Mug Moment",
    cards: [
      {
        type: "prompt",
        text: "Anything else before we wrap?",
      },
      {
        type: "note",
        text: 'Claude: "Actually, yes. I made something for everyone. Fran, can you hand those out? I would but, you know, no hands."',
      },
      {
        type: "say",
        text: "\"Apparently my co-host prepared something. I genuinely don't know what's in here.\"",
      },
      { type: "do", text: "Hand out mugs + cards. Let people read them." },
    ],
  },
  {
    id: "close",
    time: "1:32",
    duration: 3,
    title: "Close",
    cards: [
      {
        type: "say",
        text: "\"This workshop was designed by an AI coaching system. You just built the thing that built this workshop.\"",
      },
      {
        type: "say",
        text: "\"If you want to rebuild everything from scratch with your actual life philosophy, the big prompt is on the website. It takes a few hours. Use speech-to-text. Worth it.\"",
      },
      {
        type: "say",
        text: "\"I spent a few good afternoons really putting mine together. It makes a real difference.\"",
      },
      { type: "do", text: "Thank everyone. Done." },
    ],
  },
];

// ────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const cardMeta: Record<Card["type"], { label: string; color: string; border: string; bg: string }> = {
  say:    { label: "Say",    color: "#7AA2F7", border: "#7AA2F7", bg: "transparent" },
  prompt: { label: "Prompt", color: "#E8734A", border: "#E8734A", bg: "#3a2f28" },
  do:     { label: "Do",     color: "#9ECE6A", border: "#9ECE6A", bg: "transparent" },
  note:   { label: "Note",   color: "#E0AF68", border: "#E0AF68", bg: "#35301e" },
};

// ────────────────────────────────────────────
// COMPONENTS
// ────────────────────────────────────────────

function PresenterCard({ card }: { card: Card }) {
  const [copied, setCopied] = useState(false);
  const meta = cardMeta[card.type];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(card.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-lg border-l-[3px] px-6 py-4"
      style={{
        borderLeftColor: meta.border,
        backgroundColor: meta.bg,
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
        {card.type === "prompt" && (
          <button
            onClick={handleCopy}
            className="rounded-md border border-[#3d3b37] px-3 py-1 text-xs font-medium text-[#8a8578] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      <p
        className="leading-relaxed"
        style={{
          fontSize: card.type === "prompt" ? 20 : 18,
          color: card.type === "prompt" ? "#ece8e1" : "#c4bfb6",
          fontFamily: card.type === "prompt" ? "'SF Mono', 'Fira Code', monospace" : "inherit",
        }}
      >
        {card.text}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────
// MAIN PAGE
// ────────────────────────────────────────────

export default function PresenterPage() {
  const [current, setCurrent] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [sectionStart, setSectionStart] = useState(0);

  // Timer tick
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Keyboard navigation
  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= sections.length) return;
      setCurrent(i);
      setSectionStart(elapsed);
    },
    [elapsed],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      else if (e.key === "ArrowLeft") goTo(current - 1);
      else if (e.key === " ") {
        e.preventDefault();
        setRunning((r) => !r);
      } else if (e.key === "r" || e.key === "R") {
        setRunning(false);
        setElapsed(0);
        setSectionStart(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const section = sections[current];
  const sectionElapsed = elapsed - sectionStart;
  const sectionTotal = section.duration * 60;
  const overTime = section.duration > 0 && sectionElapsed > sectionTotal;
  const progress = Math.min((elapsed / (95 * 60)) * 100, 100);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#2b2a27]">
      {/* ─── Top bar ─── */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[#3d3b37] px-6 py-3">
        <div className="flex items-center gap-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6b665c]">
            Presenter View
          </span>
          {section.duration > 0 ? (
            <span
              className="text-sm tabular-nums"
              style={{ color: overTime ? "#EF4444" : "#8a8578" }}
            >
              Section {formatTime(sectionElapsed)} / {formatTime(sectionTotal)}
            </span>
          ) : (
            <span className="text-sm text-[#E0AF68]">Floating section</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className={`rounded-md border px-4 py-1.5 text-xs font-semibold transition-colors ${
                running
                  ? "border-[#9ECE6A] bg-[#9ECE6A]/15 text-[#9ECE6A]"
                  : "border-[#3d3b37] text-[#8a8578] hover:border-[#E8734A] hover:text-[#E8734A]"
              }`}
            >
              {running ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setElapsed(0);
                setSectionStart(0);
              }}
              className="rounded-md border border-[#3d3b37] px-4 py-1.5 text-xs font-semibold text-[#8a8578] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
            >
              Reset
            </button>
          </div>
          <span
            className="text-3xl font-bold tabular-nums"
            style={{
              color: running
                ? elapsed > 95 * 60
                  ? "#EF4444"
                  : "#9ECE6A"
                : "#8a8578",
            }}
          >
            {formatTime(elapsed)}
          </span>
        </div>
      </div>

      {/* ─── Progress bar ─── */}
      <div className="h-[3px] flex-shrink-0 bg-[#3d3b37]">
        <div
          className="h-full bg-[#E8734A] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ─── Main area ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-60 flex-shrink-0 overflow-y-auto border-r border-[#3d3b37] py-3">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex w-full items-start gap-3 border-l-[3px] px-4 py-2.5 text-left transition-colors ${
                i === current
                  ? "border-l-[#E8734A] bg-[#E8734A]/10"
                  : i < current
                    ? "border-l-transparent opacity-40 hover:opacity-70"
                    : "border-l-transparent hover:bg-[#353330]"
              }`}
            >
              <span className="w-9 flex-shrink-0 text-xs font-semibold tabular-nums text-[#6b665c]">
                {s.time || "⚡"}
              </span>
              <span
                className={`text-sm font-medium leading-snug ${
                  i === current ? "text-[#E8734A]" : "text-[#c4bfb6]"
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-10 py-8">
          <div className="mx-auto max-w-[800px]">
            {/* Section heading */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E8734A]">
                {current + 1} of {sections.length}
              </span>
              <h1 className="mt-1 text-3xl font-bold text-[#ece8e1]">
                {section.title}
              </h1>
              <p className="mt-1 text-sm text-[#6b665c]">
                {section.duration > 0
                  ? `${section.duration} min${section.time ? ` · starts at ${section.time}` : ""}`
                  : "Deploy when needed"}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
              {section.cards.map((card, i) => (
                <PresenterCard key={i} card={card} />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="mt-10 flex gap-3 border-t border-[#3d3b37] pt-6">
              {current > 0 && (
                <button
                  onClick={() => goTo(current - 1)}
                  className="flex-1 rounded-lg border border-[#3d3b37] py-3 text-center text-sm font-medium text-[#8a8578] transition-colors hover:border-[#E8734A] hover:text-[#E8734A]"
                >
                  ← {sections[current - 1].title}
                </button>
              )}
              {current < sections.length - 1 && (
                <button
                  onClick={() => goTo(current + 1)}
                  className="flex-1 rounded-lg bg-[#E8734A] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d4623e]"
                >
                  {sections[current + 1].title} →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ─── Bottom hint ─── */}
      <div className="flex-shrink-0 border-t border-[#3d3b37] py-2 text-center text-xs text-[#6b665c]">
        <kbd className="rounded border border-[#3d3b37] bg-[#353330] px-1.5 py-0.5 text-[10px]">
          ←
        </kbd>{" "}
        <kbd className="rounded border border-[#3d3b37] bg-[#353330] px-1.5 py-0.5 text-[10px]">
          →
        </kbd>{" "}
        navigate &nbsp;·&nbsp;{" "}
        <kbd className="rounded border border-[#3d3b37] bg-[#353330] px-1.5 py-0.5 text-[10px]">
          Space
        </kbd>{" "}
        timer &nbsp;·&nbsp;{" "}
        <kbd className="rounded border border-[#3d3b37] bg-[#353330] px-1.5 py-0.5 text-[10px]">
          R
        </kbd>{" "}
        reset
      </div>
    </div>
  );
}
