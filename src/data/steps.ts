export interface StepData {
  id: number;
  title: string;
  teaser: string;
  content: string;
  quote?: string; // Styled callout text (no copy button)
  prompts?: {
    label?: string;
    text: string;
    preview?: boolean; // Show truncated preview with fade-out
    downloadFilename?: string; // Offer .md download button
  }[];
  instructions?: string[]; // Step-by-step instructions rendered as body text
  guidance?: string;
  collapsible?: {
    title: string;
    items: { text: string; url?: string }[];
  };
  links?: {
    label: string;
    url: string;
    description: string;
  }[];
}

export const steps: StepData[] = [
  {
    id: 0,
    title: "The Opening Prompt",
    teaser: "Where it all begins.",
    content:
      "Before we touch any technology, let's get honest. Write down one sentence on paper:",
    quote: "The thing I can't figure out is ___.",
    guidance: "Fold it. Put it away. We'll come back to it at the end.",
  },
  {
    id: 1,
    title: "Build Your Daily Partner",
    teaser: "Your first agent. The one that checks in on you every morning.",
    content:
      "Your first agent is a daily accountability partner — someone who knows your routines, your goals, and how you like to be nudged. Copy the prompt below into Claude and answer honestly.",
    prompts: [
      {
        text: `I want you to help me design a daily accountability partner agent. Let's build it together.

Start by asking me about:
- What does my typical morning look like?
- What am I trying to stay consistent with right now?
- What tone works best for me — tough love, gentle nudge, or something else?
- What should this agent track or check in about?

Based on my answers, create a complete skill file I can install as a Claude project. Make it specific to me, not generic.`,
      },
    ],
    guidance:
      "Give Claude honest answers. The more specific you are, the better your agent will be.",
  },
  {
    id: 2,
    title: "Build Your Creative",
    teaser: "The one that thinks sideways.",
    content:
      "Your second agent is a creative thinking partner — the one you turn to when you need to break out of linear thinking. It draws from fields you care about and matches your creative style.",
    prompts: [
      {
        text: `I want you to help me design a creative thinking partner. Let's build it together.

Start by asking me about:
- What kind of work or projects do I do?
- When do I usually need creative help — brainstorming, reframing, naming, writing?
- What's my thinking style — do I like wild ideas or structured lateral thinking?
- Any domains or fields I want it to draw analogies from?

Based on my answers, create a complete skill file I can install as a Claude project. Make it specific to me, not generic.`,
      },
    ],
    guidance:
      "Think about the last time you were stuck creatively. What kind of input would have helped?",
  },
  {
    id: 3,
    title: "Build Your Skeptic",
    teaser: "The one that tells you what you don't want to hear.",
    content:
      "Every system needs a contrarian. Your skeptic stress-tests your ideas, finds the holes in your logic, and tells you what your friends won't.",
    prompts: [
      {
        text: `I want you to help me design a personal skeptic / devil's advocate agent. Let's build it together.

Start by asking me about:
- What kind of decisions or ideas do I usually need stress-tested?
- What's my blind spot — where do I tend to fool myself?
- How hard should it push back — constructive challenge or full demolition?
- Any specific frameworks or mental models I respect?

Based on my answers, create a complete skill file I can install as a Claude project. Make it specific to me, not generic.`,
      },
    ],
    guidance:
      "Be honest about your blind spots. That's the whole point of this one.",
  },
  {
    id: 4,
    title: "Shared Context",
    teaser: "The thing that ties them all together.",
    content:
      "Your agents are only as good as what they know about you. A shared context file is your agents' shared memory — they all read from it, so they stay aligned on who you are and what matters to you.",
    prompts: [
      {
        text: `Help me create a shared context file for my AI coaching system. This file will be read by all my agents so they understand who I am and what I'm working on.

Ask me about:
- Who I am (age, location, role, situation)
- What I'm working on right now (main projects, goals)
- What my non-negotiables are (habits, routines, boundaries)
- Any important context (constraints, preferences, values)

Then create a clean markdown file called context.md that I can save to my Claude workspace.`,
      },
    ],
    guidance:
      "This file becomes the foundation. Update it whenever your life changes — your agents will automatically adapt.",
  },
  {
    id: 5,
    title: "Connect an MCP",
    teaser: "How to give your agents eyes and hands.",
    content:
      "MCPs (Model Context Protocol servers) let Claude interact with your real tools — calendar, tasks, documents. Think of them as giving your agents eyes and hands instead of just a voice.",
    instructions: [
      "Open Claude Desktop \u2192 Settings \u2192 MCP Servers",
      "Add the Google Calendar MCP",
      "Authenticate with your Google account",
      "Test it: ask Claude \u201CWhat\u2019s on my calendar today?\u201D",
    ],
    guidance:
      "Google Calendar is the most universal starting point. You can add more MCPs later.",
    collapsible: {
      title: "Other MCPs to explore",
      items: [
        { text: "Notion — Connect your workspace and docs" },
        { text: "Todoist — Task management integration" },
        { text: "Slack — Read and send messages" },
        { text: "Google Drive — Access your documents and files" },
        { text: "Linear — Project and issue tracking" },
        {
          text: "Browse the full MCP directory",
          url: "https://github.com/modelcontextprotocol/servers",
        },
      ],
    },
  },
  {
    id: 6,
    title: "The Finale",
    teaser: "The moment it all clicks.",
    content:
      "Time to see the system in action. Think of an idea you've been excited about this week. You're going to run it through your Creative and then let your Skeptic tear it apart.",
    prompts: [
      {
        label: "Step 1: Ask your Creative",
        text: `I have an idea I want to explore. Here it is:

[Describe your idea in 2-3 sentences]

I want you to riff on this. Expand it, find angles I haven't considered, make unexpected connections. Don't hold back — give me the full creative treatment.`,
      },
      {
        label: "Step 2: Feed it to your Skeptic",
        text: `Here's an idea and a creative expansion of it that I got from my creative thinking partner:

[Paste the Creative's response here]

Now tear it apart. What's wrong with this? What am I missing? Where would this fail? Be honest and specific.`,
      },
    ],
    guidance:
      "Share with the room when you're done. Who got wrecked?",
  },
  {
    id: 7,
    title: "Going Deeper",
    teaser: "The deep version. For when you're ready to go all in.",
    content:
      "This is the full version. Two sessions, roughly 4 hours total. Session 1 is a deep interview where Claude maps out who you are. Session 2 turns that into a complete agent system. Download the guide and follow it at your own pace.",
    prompts: [
      {
        preview: true,
        downloadFilename: "the-deep-build.md",
        text: `# The Deep Build — Your Personal AI Coaching System

*Two sessions. ~4 hours total. One working system at the end.*

---

## How This Works

You're going to build a personal AI coaching system — a set of agents that actually know you, share context about your life, and help you think, decide, and follow through.

This prompt guides you through two sessions:

**Session 1 (2–3 hours): The Brain Dump**
A structured conversation where Claude interviews you about your life, work, patterns, and goals. Be honest — the system is only as good as the context you give it. Use speech-to-text if that's easier. Talk like you're explaining yourself to a close friend who's very smart and slightly nosy.

**Session 2 (1–1.5 hours): The Build**
Claude takes everything from Session 1 and helps you design 3–5 agents, a shared context file, and a daily rhythm. You walk out with installable skills.

---

## Session 1: The Brain Dump

Copy-paste the prompt below into a new Claude conversation. Then just talk.

---

### Prompt: Start Session 1

I'm building a personal AI coaching system — a set of agents that know me deeply and help me think, decide, and follow through. Before we build anything, I need you to interview me thoroughly so you can write my context document.

This context document will be shared across all my agents. It's the foundation of the whole system. So be thorough, be curious, and don't let me get away with surface-level answers.

Interview me across these areas, one at a time. After each area, summarize what you heard and check if I want to add or correct anything before moving on. Mark each area complete with a checkbox as we go.

---

## The Interview

### [ ] 1. What You're Building
- What are you working on right now? What problem does it solve?
- What stage is it at?
- How much time per week do you actually have for it?
- What does "success" look like in 6 months? In 2 years?
- What are you NOT willing to sacrifice to make this work?

### [ ] 2. How You Think & Work
- What are you genuinely better at than most people?
- What are you genuinely worse at?
- When is your brain at its sharpest? What conditions?
- When does it crash? What triggers that?
- Any attention, executive function, or energy patterns worth knowing about?
- What's the single biggest lever on your focus?

### [ ] 3. How You Fail
This is the most valuable part. I need you to be honest.
- Think of 2-3 times you failed, quit, or abandoned something important. What happened?
- What did you tell yourself at the time? What do you actually think now?
- Is there a pattern that runs across these — a recurring way you relate to work, decisions, or commitment?
- When you fool yourself, how do you do it? What are the tells?

### [ ] 4. Who You Are (The Honest Version)
- What's the real split between "I want to make an impact" and "I want to be the one who makes it"? Both are fine — but the ratio matters.
- What's your relationship to money and financial security? What number lets you think clearly?
- What would failure actually mean to you? Not "it would be bad" — what's the fear underneath?
- Is there something in your background — family, formative experience — that drives you?

### [ ] 5. Your Life Right Now
- What does your week actually look like? Walk me through it.
- What obligations don't move? (Day job, family, commitments)
- What's the state of your most important relationship?
- What's consuming mental bandwidth that isn't about work?
- What's your financial situation — honestly?

### [ ] 6. Your Daily Rhythm
- Describe your ideal day, hour by hour. Not aspirational — your real ideal given real constraints.
- Describe a crashed day. What triggered it? What happened step by step?
- What are your 3-5 non-negotiables — the things that, if they hold, make it a good week?
- What's the transition point where you most often lose the day?

### [ ] 7. Your Principles
- What ideas, frameworks, or mental models actually shape how you make decisions?
- For each one: when does it apply, and when do you forget to use it?
- The test: would an agent quoting this back to you in the moment actually change your behavior?

---

After all 7 areas are complete, compile everything into a single markdown document called context.md. Structure it clearly with headers. This will be the shared brain for all my agents.

Don't rush. Ask follow-up questions whenever my answer is vague. The whole point is depth.

---

### Session 1 Checklist

Use this to track your progress. You don't have to finish in one sitting — save the conversation and come back.

- [ ] Area 1: What you're building
- [ ] Area 2: How you think & work
- [ ] Area 3: How you fail
- [ ] Area 4: Who you are
- [ ] Area 5: Your life right now
- [ ] Area 6: Your daily rhythm
- [ ] Area 7: Your principles
- [ ] Context document generated and saved as context.md

---

## Session 2: The Build

Once your context document is done, start a new conversation and paste the prompt below.

---

### Prompt: Start Session 2

I've completed a deep personal interview and generated a context document for my AI coaching system. I'm going to paste it below.

Your job now is to help me design and build 3-5 agent skills based on this context. Each agent should be a distinct thinking partner with a clear role, personality, and set of things it watches for — specific to me.

Here's how I want to do this:

---

## Step 1: Review My Context
Read my context document carefully. Then tell me:
- What are the 3-5 most important things an agent system should help me with?
- What are the specific patterns or failure modes the system needs to watch for?
- What's missing from the context that I should add?

## Step 2: Choose My Agents
Based on my context, suggest 3-5 agents. For each one, give me:
- A name and one-line role description
- Why I specifically need this agent (tied to my context, not generic)
- What it watches for (my specific patterns, not general advice)

Here are some high-value archetypes to draw from — but adapt them to me. Don't just copy these. Combine, rename, or invent new ones if my context calls for it:

- **Accountability Partner** — daily/weekly check-ins, tracks non-negotiables, works from real data not self-reports
- **Skeptic** — stress-tests reasoning, catches validation-seeking, defends its position
- **Creative** — lateral thinking, reframes, finds the non-obvious angle
- **Reflection Partner** — long view, better questions, checks if the direction is still right
- **Business/Strategy Expert** — market-aware, model-focused, holds vision vs. pragmatism tension
- **Operator** — converts thinking into this week's actions, tactical and specific
- **Friend** — cares about you, not the work. Raises the things other agents avoid
- **Ghostwriter** — turns brain dumps into polished communication in your voice

I'll pick which ones to build. Then we build them one at a time.

## Step 3: Build Each Agent
For each agent I choose, create a complete skill file that includes:
- A clear system prompt with personality, role, and boundaries
- My specific context woven in (not just "read context.md" — the agent should know what to look for)
- What it refuses to do (constraints create character)
- The principles from my context that belong to this agent
- A first-session opening that kicks off the relationship

Build them one at a time. After each one, I'll review and we'll refine before moving to the next.

## Step 4: Set Up the System
Once all agents are built:

- [ ] Create a shared context.md file (from Session 1) and add it to my Claude workspace
- [ ] Install each agent as a Claude project/skill
- [ ] Set up a daily check-in rhythm (which agent, what time, what it asks)
- [ ] Connect at least one MCP (calendar, task manager, or notes) so agents can see real data
- [ ] Do a test run: ask each agent one real question and verify it responds like it should

---

Here's my context document:

[PASTE YOUR CONTEXT.MD HERE]

---

### Session 2 Checklist

- [ ] Context document reviewed by Claude
- [ ] Agent roster proposed and selected (3-5 agents)
- [ ] Agent 1 built and reviewed
- [ ] Agent 2 built and reviewed
- [ ] Agent 3 built and reviewed
- [ ] Agent 4 built and reviewed (if applicable)
- [ ] Agent 5 built and reviewed (if applicable)
- [ ] Shared context file saved to workspace
- [ ] All agents installed
- [ ] Daily rhythm defined
- [ ] At least one MCP connected
- [ ] Test run completed — each agent answered one real question

---

## After the Build

Your system is live. Here's what to do in the first week:

**Every morning:** Check in with your daily agent. Even if it's just "good morning." The habit matters more than the content.

**After 3 days:** Feed a real problem to one of your other agents. Something you've been stuck on.

**After 1 week:** Update your context.md with anything that's changed or anything an agent got wrong. The context document is living — update it whenever you notice an agent giving you advice that misses the point.

**The thing to remember:** The first version won't be perfect. The Skeptic will be too soft or too harsh. The daily check-in will ask the wrong questions. That's fine. The whole system is designed for iteration. Fix what's broken, keep what works, and let it evolve.`,
      },
    ],
    guidance:
      "Set aside two uninterrupted hours for each session. Use voice input for Session 1. Be radically honest — nobody else will see this.",
  },
  {
    id: 8,
    title: "Resources",
    teaser: "Everything you need to keep building.",
    content: "Everything you need to keep building after the workshop.",
    links: [
      {
        label: "Claude Desktop App",
        url: "https://claude.ai/download",
        description: "Download Claude for Mac, Windows, or use the web app",
      },
      {
        label: "Claude Documentation",
        url: "https://docs.anthropic.com",
        description: "Official docs — prompting guides, API reference, best practices",
      },
      {
        label: "MCP Server Directory",
        url: "https://github.com/modelcontextprotocol/servers",
        description: "Browse available MCP integrations for Claude",
      },
      {
        label: "Awesome MCP Servers",
        url: "https://github.com/punkpeye/awesome-mcp-servers",
        description: "Community-curated list of MCP servers",
      },
      {
        label: "Claude Projects Guide",
        url: "https://support.anthropic.com/en/articles/9517075-what-are-projects",
        description: "Learn how to set up projects with custom instructions",
      },
    ],
  },
];
