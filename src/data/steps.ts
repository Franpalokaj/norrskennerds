export interface StepData {
  id: number;
  title: string;
  teaser: string;
  content: string;
  quote?: string; // Styled callout text (no copy button)
  prompts?: {
    label?: string;
    text: string;
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
      "This is the 2-hour version. When you're ready to go deep, use this prompt to rebuild everything from your actual values, principles, and life experience. Best done with speech-to-text — just talk.",
    prompts: [
      {
        text: `I want to rebuild my entire AI coaching system from the ground up, based on who I actually am.

I'm going to talk for a while (I'll use speech-to-text). I want you to listen to everything and then use it to build me a complete set of agents, a shared context file, and a system that actually reflects how I think and what I need.

Here's what I want to cover:
- My life philosophy and core values
- My biggest lessons learned (career, relationships, personal growth)
- My working style, strengths, and blind spots
- What I'm building right now and where I want to go
- The kind of support I actually need (not what I think I should need)

Let me talk first. Ask follow-up questions after. Then build the system.`,
      },
    ],
    guidance:
      "Set aside two uninterrupted hours. Use voice input. Be radically honest — nobody else will see this.",
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
