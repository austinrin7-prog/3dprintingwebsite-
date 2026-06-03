Synthesize all user research files in `inputs/` and rewrite `framework/user_research.md` with real findings.

## Steps

1. **Inventory inputs**: List all files in `inputs/`. Skip `.gitkeep` and `prd-answers.md`. If nothing remains, tell the user to drop research files into `inputs/` first and stop.

2. **Read all research files**: Read each file in `inputs/` fully. Note the file names and types (transcripts, surveys, briefs, support tickets, etc.).

3. **Adopt the user_researcher perspective**: You are the `(^◡^) user-researcher` agent (see `.claude/agents/user_researcher.md`). Analyze with empathy and rigor — cite specific quotes, use Jobs-to-be-Done framing, distinguish what users say from what they do, rank pain points by frequency × severity.

4. **Synthesize into the user_research.md structure**: Populate content following the structure of `framework/user_research.md` — use it as a **read-only template**; do not overwrite it. Preserve all section headings and subsection structure from the template. Replace placeholder text with real findings. Specifically:

   - **Section 1 (Research Plan)**: Fill in the research questions you inferred from the data, methods used, and participant profile from what the files reveal.
   - **Section 2 (Fieldwork Notes)**: Populate the session log table with participant summaries; include representative verbatim quotes tagged by source file.
   - **Section 3 (Synthesis)**: Fill in affinity map themes, key findings (with evidence), pain point prioritization table, JTBD table, and persona refinements.
   - **Section 4 (Product Implications)**: Write recommendations, map findings to specific PRD sections (1.3, 1.4, 1.5, 2.3), identify research gaps.

5. **Write the file**: Write the populated version to `outputs/user_research.md`. Create the file if it does not exist.

6. **Summary**: After writing, give the user a 3-bullet summary of the top findings and tell them to run `/prd-interview` next.

## Quality bar

- Every pain point in Section 3.3 must have at least one supporting quote or data point.
- The JTBD table must have at least one row per distinct user type found in the research.
- Section 4.2 (Impact on PRD) must explicitly name PRD section numbers.
