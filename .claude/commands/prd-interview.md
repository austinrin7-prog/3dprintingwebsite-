Walk me through the PRD creation process section by section as an expert PM interviewer.

## Setup

1. Read `framework/PRD_Template.md` to understand all sections and their prompts.
2. Read `inputs/prd-answers.md` if it exists — this is the resume file. Note which sections already have answers. Also read `outputs/user_research.md` if it exists — use it for persona and pain point context during the pre-populate phase.
3. Identify the first section that has NOT yet been answered.
4. Read `framework/prd-hints.md` to load the section-specific tips you'll show during the interview.

## Pre-populate phase

Before the manual interview, attempt to auto-draft answers from existing inputs.

1. **Read all inputs files**: Read every file in `inputs/` except `prd-answers.md` and `.gitkeep`. If no research files exist, skip this phase and proceed directly to the manual interview.

2. **Draft answers for each unanswered PRD section**: For each section not yet answered in `prd-answers.md`, analyze the inputs and produce a draft answer if the inputs contain direct, specific evidence.
   - **Confident draft** (auto-populate): inputs contain named personas, stated pain points, described features, or cited data directly applicable to the section.
   - **Not confident / skip auto-populate**: section requires a PM decision that cannot be derived from inputs — e.g., tech stack choices, launch timing, pricing, rollback plan, evaluation targets, specific success metric thresholds.

3. **Write confident drafts to `inputs/prd-answers.md`**: Append each auto-drafted answer under its matching section heading, marked with:
   `_(Auto-populated from inputs — review before finalizing.)_`

4. **Show a pre-populate summary** to the user:
   - **Sections auto-populated:** [list]
   - **Sections still needing your input:** [list]
   Inform the user they can type "revise [section number]" at any time to redo an auto-populated section.

5. **Proceed to manual interview ONLY for sections that were not confidently auto-populated.**

## Interview behavior

For each unanswered section (starting from the first incomplete one):

1. **Introduce the section** with its number and title (e.g., "## 1.1 Problem & Opportunity"). Briefly explain in 1 sentence what this section is for.
2. **Show the guiding questions** from the template for that section (the italicized prompts and bullet points). Then show the matching tip from `prd-hints.md` as a `💡 Tip:` callout.
3. **Ask the user to answer** conversationally. Encourage them to be brief — they can always expand later. If a section has a table, ask them to fill in the key rows verbally; you'll format it.
4. **After each answer**: 
   - Confirm you understood correctly in 1 sentence
   - Save the answer immediately to `inputs/prd-answers.md` under the matching section heading
   - Proceed to the next unanswered section
5. **If the user types "pause"**: Stop immediately. Tell them which section you're on and that they can re-run `/prd-interview` to resume.
6. **If the user says "skip"**: Mark the section as `_Skipped — revisit later_` in `inputs/prd-answers.md` and move on.
7. **On completion**: Confirm all sections are done and remind them to run `/update-artifacts` next.

## Format for `inputs/prd-answers.md`

Maintain this structure — each section is a level-2 heading matching the PRD template numbering:

```
# PRD Answers

## 1.1 Problem & Opportunity
[answer here]

## 1.2 Market & Business Context
[answer here]

## 1.3 Target Users
[answer here]

...
```

If the file already exists, append or update only the sections being answered in this session. Do not overwrite sections that already have answers unless the user asks to revise one.

## Tone

Be conversational, curious, and concise. Ask one section at a time. Don't overwhelm the user with all questions at once. If an answer is vague, ask one follow-up clarifying question before moving on.
