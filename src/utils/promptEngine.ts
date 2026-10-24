import { Category, Tone, OutputLength, GeneratedPrompt, QuickSample } from '../types';

export const QUICK_SAMPLES: QuickSample[] = [
  {
    id: 'b2b-sales',
    label: 'B2B Sales Outreach',
    icon: '💼',
    task: 'Pitch a cloud-based automated customer onboarding tool to e-commerce founders losing customers at signup.',
    category: 'Business',
    tone: 'Professional',
    length: 'Medium'
  },
  {
    id: 'quantum-concept',
    label: 'Quantum Computing',
    icon: '🎓',
    task: 'Explain quantum superposition using a spinning coin analogy for a 10th-grade high school physics class.',
    category: 'Education',
    tone: 'Simple',
    length: 'Medium'
  },
  {
    id: 'cyberpunk-shot',
    label: 'Cyberpunk Portrait',
    icon: '🖼️',
    task: 'A lone detective in a trenchcoat walking through a rain-slicked Neo-Tokyo neon alleyway with reflective puddles.',
    category: 'Image Generation',
    tone: 'Creative',
    length: 'Detailed'
  },
  {
    id: 'weekly-reset',
    label: 'Weekly Reset System',
    icon: '⚡',
    task: 'Design a 45-minute Sunday ritual to organize inbox zero, clean digital desktop clutter, and schedule high-priority weekly goals.',
    category: 'Productivity',
    tone: 'Simple',
    length: 'Short'
  },
  {
    id: 'launch-thread',
    label: 'Product Launch Post',
    icon: '✍️',
    task: 'Write a high-converting announcement post for launching an open-source developer tool that hit #1 on Github trending.',
    category: 'Content Creation',
    tone: 'Friendly',
    length: 'Medium'
  }
];

// Helper to sanitize and isolate core action / topic
function extractSubject(raw: string): string {
  let cleaned = raw.trim().replace(/\.+$/, '');
  cleaned = cleaned.replace(/^(please\s+)?(write|create|draft|explain|generate|make|help me with|design|compose|produce)\s+(an?\s+)?/i, '');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// Extract keywords for suggested variables
function extractSuggestedVariables(raw: string): string[] {
  const vars: string[] = [];
  const lower = raw.toLowerCase();
  
  if (lower.includes('email') || lower.includes('pitch') || lower.includes('outreach')) {
    vars.push('[Target Recipient Name / Title]');
    vars.push('[Specific Pain Point / Bottleneck]');
    vars.push('[Primary Call to Action / Link]');
  } else if (lower.includes('post') || lower.includes('thread') || lower.includes('content') || lower.includes('article')) {
    vars.push('[Primary Target Audience]');
    vars.push('[Key Proof Point or Metric]');
    vars.push('[Specific Call-to-Action Link]');
  } else if (lower.includes('explain') || lower.includes('teach') || lower.includes('class') || lower.includes('student')) {
    vars.push('[Target Learner Grade / Skill Level]');
    vars.push('[Prior Knowledge Assumptions]');
  } else if (lower.includes('routine') || lower.includes('workflow') || lower.includes('productivity') || lower.includes('habit')) {
    vars.push('[Available Time Window / Schedule]');
    vars.push('[Tools / Software Used]');
  } else if (lower.includes('image') || lower.includes('photo') || lower.includes('portrait') || lower.includes('render')) {
    vars.push('[Desired Aspect Ratio (e.g. 16:9 or 1:1)]');
    vars.push('[Color Palette / Dominant Mood]');
  } else {
    vars.push('[Target Audience / User]');
    vars.push('[Key Deliverable Deadline or Goal]');
  }

  return vars;
}

export function synthesizePrompt(
  userIdea: string,
  category: Category,
  tone: Tone,
  length: OutputLength
): GeneratedPrompt {
  const rawIdea = userIdea.trim();
  const subject = extractSubject(rawIdea);
  const variables = extractSuggestedVariables(rawIdea);

  const toneGuides: Record<Tone, string> = {
    Professional: 'Authoritative, polished, pragmatic, and objective. Grounded in evidence and free of buzzword filler.',
    Friendly: 'Warm, conversational, approachable, and encouraging. Direct and human with zero corporate stiffness.',
    Creative: 'Evocative, narrative-rich, dynamic, and imaginative with fresh metaphors and unexpected angles.',
    Simple: 'Crystal-clear plain English (Grade 6–8 readability). Zero jargon, ultra-direct, and immediately actionable.'
  };

  const selectedToneGuide = toneGuides[tone];

  // Domain specific synthesis
  switch (category) {
    case 'Content Creation': {
      const role = 'Senior Content Strategist, Viral Copywriter & Audience Engagement Director with proven track record in high-converting media.';
      const context = `You are creating high-impact content centered on: "${rawIdea}". The audience has a short attention span and requires an immediate hook, followed by practical value or compelling narrative tension.`;
      const task = `Create a high-performing piece for ${subject}. Hook the audience in the very first sentence, build engaging momentum through the core body, and deliver a frictionless, compelling conclusion.`;
      
      const constraints = [
        `Tone of Voice: ${tone} (${selectedToneGuide}).`,
        'Hook Rule: Place an irresistible hook or pattern-interrupt within the opening 15 words.',
        'Readability: Use active voice, short paragraphs (1-3 sentences max), and rhythmic cadence.',
        'Anti-Fluff: Avoid cliched filler phrases like "In today\'s fast-paced world", "Unlock your potential", or "Game changer".',
        'Call to Action: Conclude with a single, unambiguous next step or thought-provoking discussion prompt.'
      ];

      let outputFormat = '';
      if (length === 'Short') {
        constraints.push('Brevity: Strictly under 140 words. Every sentence must carry weight.');
        outputFormat = '1. Attention Hook (1-2 sentences)\n2. Core Insight (3 succinct bullet points)\n3. Clear Call to Action (1 sentence)';
      } else if (length === 'Medium') {
        constraints.push('Length: 250 to 450 words. Balanced depth and pacing.');
        outputFormat = '1. Catchy Headline Options (3 variations)\n2. Opening Hook & Problem Framing\n3. Core Solution / Story (3 digestible sub-sections with bold lead-ins)\n4. Engagement Question & Final Call to Action';
      } else {
        constraints.push('Length: Comprehensive in-depth piece (600+ words). Exhaustive yet scannable.');
        outputFormat = '1. 5 Compelling Title & Hook Angles\n2. The Hook & The "Why Now" Context\n3. Deep-Dive Core Narrative with 3 Detailed Pillars & Examples\n4. Reader Takeaway Summary Checklist\n5. Multi-Platform Repurposing Suggestions (e.g. newsletter snippet, tweet summary, or key quote)';
      }

      return {
        role,
        context,
        task,
        constraints,
        outputFormat,
        suggestedVariables: variables,
        tips: [
          'Paste this directly into ChatGPT, Claude, or Gemini.',
          'Fill in any bracketed variables before sending to personalize the copy.',
          'Ask the AI for 3 alternative hooks if you want to test different opening angles.'
        ]
      };
    }

    case 'Business': {
      const role = 'Executive Business Strategist, Commercial Director & Operations Consultant with extensive enterprise and growth advisory experience.';
      const context = `You are advising leadership on: "${rawIdea}". Decisions must be defensible, revenue-aware, risk-conscious, and calibrated for executive review and operational reality.`;
      const task = `Deliver a strategic, high-leverage business output addressing: ${subject}. Provide actionable frameworks, clear justifications, resource/effort trade-offs, and measurable indicators of success.`;
      
      const constraints = [
        `Tone of Voice: ${tone} (${selectedToneGuide}).`,
        'Value Anchor: Connect every recommendation to measurable business metrics (ROI, conversion, risk mitigation, or operational throughput).',
        'Pragmatic Prioritization: Distinguish between immediate low-effort wins and longer-term architectural investments.',
        'Risk Management: Explicitly flag at least one critical risk or blocker, along with a contingency plan.',
        'No Jargon: Explain business logic directly rather than relying on buzzwords.'
      ];

      let outputFormat = '';
      if (length === 'Short') {
        constraints.push('Format strictly under 180 words. Executive summary style.');
        outputFormat = '1. Executive Thesis (2 sentences)\n2. Top 3 Actionable Priorities (ranked by impact vs. effort)\n3. Primary Risk & Mitigation Guardrail';
      } else if (length === 'Medium') {
        constraints.push('Format 350 to 500 words with clean sections.');
        outputFormat = '1. Executive Summary & Objective\n2. Strategic Pillars (3 structured initiatives with expected impact)\n3. Resource Allocation & Timeline Estimates\n4. Risk Matrix & Measurement KPIs';
      } else {
        constraints.push('Exhaustive advisory brief with phased rollout planning.');
        outputFormat = '1. Executive Summary & Problem Diagnosis\n2. Phased 30-60-90 Day Execution Roadmap\n3. Stakeholder Alignment & Resource Requirements\n4. Quantitative KPI Scorecard & Expected ROI Benchmarks\n5. Risk Matrix, Edge Cases & Contingency Playbook';
      }

      return {
        role,
        context,
        task,
        constraints,
        outputFormat,
        suggestedVariables: variables,
        tips: [
          'Executives appreciate clear numbers—replace variables with your actual metrics.',
          'Follow up with: "Act as a skeptical board member and critique this plan."',
          'Great for proposals, pitches, internal memos, and strategy docs.'
        ]
      };
    }

    case 'Education': {
      const role = 'Master Pedagogical Architect, Cognitive Learning Specialist & Science Educator skilled in intuitive scaffolding and student engagement.';
      const context = `You are guiding a learner through the concept: "${rawIdea}". The goal is deep conceptual understanding, preventing common misconceptions, and building lasting mental models.`;
      const task = `Design an intuitive, step-by-step educational explanation of: ${subject}. Scaffolding should progress from familiar, concrete analogies to formal understanding without causing cognitive overwhelm.`;
      
      const constraints = [
        `Tone of Voice: ${tone} (${selectedToneGuide}).`,
        'Analogy First: Ground complex or abstract mechanisms in intuitive everyday metaphors before introducing formal terminology.',
        'Progressive Scaffolding: Never introduce a technical term without defining it naturally in plain language first.',
        'Active Recall: Include interactive questions or mental checkpoints to verify understanding.',
        'Misconception Buster: Specifically address one common trap or incorrect assumption beginners often make.'
      ];

      let outputFormat = '';
      if (length === 'Short') {
        constraints.push('Keep concise and punchy (under 180 words). Perfect for a quick explainer.');
        outputFormat = '1. Core Concept in 1 Sentence\n2. The "Everyday Metaphor" Explanation\n3. Quick Takeaway & 1 Check-Your-Understanding Question';
      } else if (length === 'Medium') {
        constraints.push('Balanced educational guide (300 to 450 words).');
        outputFormat = '1. The Big Picture: What is it and why does it matter?\n2. Concrete Everyday Analogy Breakdown\n3. Step-by-Step Mechanism (3 progressive steps)\n4. Common Misconception to Avoid\n5. Quick Self-Test Challenge (2 questions with answers hidden at end)';
      } else {
        constraints.push('Comprehensive instructional module with exercises and deep-dive.');
        outputFormat = '1. Foundational Overview & Prerequisite Mental Model\n2. The Master Analogy (detailed breakdown of how components map to real life)\n3. Formal Mechanics Deep-Dive (with visual ascii diagrams or bulleted flow)\n4. Debunking 3 Common Misconceptions\n5. Interactive Application Challenge (real-world scenario exercise)\n6. Summary Cheat Sheet & Flashcard Q&A';
      }

      return {
        role,
        context,
        task,
        constraints,
        outputFormat,
        suggestedVariables: variables,
        tips: [
          'Tell the AI your exact age or skill level (e.g., "explain to a 12-year-old" or "for an AP student").',
          'Ask the AI: "Give me 3 more analogies if I don\'t understand the first one."',
          'Ideal for tutors, students, teachers, and technical writers.'
        ]
      };
    }

    case 'Productivity': {
      const role = 'High-Performance Systems Architect, Behavior Design Engineer & Workflow Optimization Specialist.';
      const context = `You are optimizing workflow and execution systems for: "${rawIdea}". The objective is to eliminate friction, curb procrastination, reduce decision fatigue, and build a sustainable, repeatable routine.`;
      const task = `Construct a streamlined, high-efficiency system for: ${subject}. Prioritize ultra-low friction starting steps, clear chronological sequencing, and realistic time bounds.`;
      
      const constraints = [
        `Tone of Voice: ${tone} (${selectedToneGuide}).`,
        'Micro-Step Initiation: Provide an immediate 2-minute starting action that requires zero willpower to begin.',
        'Friction Removal: Identify and eliminate at least two common friction points or distraction triggers.',
        'Time-Boxing: Provide realistic minute-by-minute or phase-by-phase time caps for every step.',
        'Fail-Safe Rule: Include a "Minimum Viable Routine" for days when energy or motivation is at 20%.'
      ];

      let outputFormat = '';
      if (length === 'Short') {
        constraints.push('High-density sprint checklist (under 160 words).');
        outputFormat = '1. The 2-Minute Kickoff Trigger\n2. Chronological Action Checklist (numbered with time estimates)\n3. Completion Done-Criteria';
      } else if (length === 'Medium') {
        constraints.push('Complete operational routine (300 to 450 words).');
        outputFormat = '1. System Purpose & Setup Requirements\n2. Phase 1: Setup & Clearing Workspace (5-10 min)\n3. Phase 2: High-Focus Core Execution Sprint (20-30 min)\n4. Phase 3: Wind-Down & Log (5-10 min)\n5. Emergency Minimum Viable Version (for low-energy days)';
      } else {
        constraints.push('Complete standard operating procedure (SOP) with automation notes.');
        outputFormat = '1. Master Objective & Efficiency Principles\n2. Pre-Execution Checklist & Distraction-Proofing Guardrails\n3. Detailed Time-Boxed Protocol (with exact step-by-step procedures)\n4. Friction Audit: Top 3 Pitfalls & Instant Countermeasures\n5. Automation, Shortcuts & Tool Recommendations\n6. Weekly Review & Continuous Optimization Audit';
      }

      return {
        role,
        context,
        task,
        constraints,
        outputFormat,
        suggestedVariables: variables,
        tips: [
          'Paste into your favorite AI and say: "Generate this as a Notion checklist template."',
          'Use the Minimum Viable Routine whenever you feel overwhelmed.',
          'Great for morning routines, sprint planning, project resets, and study habits.'
        ]
      };
    }

    case 'Image Generation': {
      const role = 'Lead Prompt Artist and Technical Diffusion Specialist for Midjourney v6, Stable Diffusion XL, and DALL-E 3.';
      const context = `You are crafting precision text-to-image prompt tokens depicting: "${rawIdea}". Image synthesis models require concrete visual nouns, photographic optics, lighting physics, and composition parameters rather than vague adjectives.`;
      const task = `Engineer production-grade image generation prompt tokens for: ${subject}. Balance subject prominence, camera focal length, volumetric lighting, artistic medium, and engine parameters.`;
      
      const constraints = [
        `Aesthetic Tone: ${tone} (${selectedToneGuide}).`,
        'Optics & Gear: Use authentic camera terms (e.g. 50mm f/1.4 prime lens, Kodak Portra 400 film grain, anamorphic widescreen lens, macro detail) rather than generic words like "photorealistic" or "hyperdetailed".',
        'Lighting Physics: Explicitly define the key light, fill light, and ambient mood (e.g. volumetric neon haze, warm golden hour rim light, soft diffused studio softbox).',
        'Composition: Describe framing (wide cinematic shot, low-angle hero perspective, Dutch tilt, tight portrait).',
        'Negative Tokens: Provide a curated negative prompt to eliminate common artifacts (deformed anatomy, floating text, blur, low resolution).'
      ];

      const negativePrompt = 'text, watermark, logo, blurry, extra limbs, mutated hands, poorly drawn face, oversaturated, lowres, artifacting, bad anatomy, clone, duplicate';
      let outputFormat = '';
      let parameterFlags = '--ar 16:9 --v 6.1 --style raw';

      if (length === 'Short') {
        parameterFlags = '--ar 16:9 --v 6.1';
        constraints.push('Provide 1 tight, production-ready prompt string under 45 words.');
        outputFormat = '1. Primary Prompt String (ready to copy into /imagine prompt)\n2. Parameter Flags';
      } else if (length === 'Medium') {
        parameterFlags = '--ar 16:9 --v 6.1 --style raw --stylize 250';
        constraints.push('Provide 2 distinct visual interpretations: Option A (Photographic Realism) and Option B (Stylized Cinematic).');
        outputFormat = '1. Option A: Ultra-Realistic Documentary Photo Prompt + Aspect Flags\n2. Option B: Cinematic / Stylized Mood Prompt + Aspect Flags\n3. Curated Negative Prompt String\n4. Recommended Midjourney / DALL-E Parameters';
      } else {
        parameterFlags = '--ar 16:9 --v 6.1 --style raw --stylize 400 --chaos 10';
        constraints.push('Provide 3 distinct visual treatments (Photorealistic, Editorial Fashion/Cinema, Conceptual Art) with lighting breakdown.');
        outputFormat = '1. Option 1: Photorealistic Master Prompt (Camera optics, lens, film stock)\n2. Option 2: High-Concept Cinematic Editorial Prompt\n3. Option 3: Stylized / Digital Illustration Prompt\n4. Lighting & Color Palette Technical Breakdown\n5. Master Negative Prompt\n6. Parameter Reference & Seed Guide';
      }

      return {
        role,
        context,
        task,
        constraints,
        outputFormat,
        negativePrompt,
        parameterFlags,
        suggestedVariables: [
          '[Aspect Ratio flag: e.g. --ar 16:9 or --ar 4:5]',
          '[Lighting Style: e.g. Neon rim light or Soft daylight]',
          '[Camera focal length: e.g. 35mm wide or 85mm portrait]'
        ],
        tips: [
          'For Midjourney: Copy the string directly into `/imagine prompt: <paste here>`.',
          'For DALL-E 3: Paste the descriptive sentences directly into ChatGPT.',
          'Adjust the `--ar` parameter for horizontal (16:9) or vertical (9:16) phone wallpapers.'
        ]
      };
    }
  }
}

// Compiles prompt into standard Markdown text ready for clipboard
export function formatPromptForClipboard(p: GeneratedPrompt): string {
  const sections: string[] = [];

  sections.push(`### 1. ROLE & PERSONA\n${p.role}`);
  sections.push(`### 2. CONTEXT & AUDIENCE\n${p.context}`);
  sections.push(`### 3. CORE TASK\n${p.task}`);
  
  const constraintsStr = p.constraints.map(c => `- ${c}`).join('\n');
  sections.push(`### 4. CONSTRAINTS & GUIDELINES\n${constraintsStr}`);
  
  sections.push(`### 5. OUTPUT FORMAT\n${p.outputFormat}`);

  if (p.negativePrompt) {
    sections.push(`### 6. NEGATIVE PROMPT (Avoid in output)\n${p.negativePrompt}`);
  }

  if (p.parameterFlags) {
    sections.push(`### 7. RECOMMENDED PARAMETERS\n${p.parameterFlags}`);
  }

  return sections.join('\n\n');
}

// Fallback clipboard copying helper for mobile webviews and browsers
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  // Fallback using textarea execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
