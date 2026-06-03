# PRD Creation — Project Guide

This repo is an agentic pipeline for creating AI product requirement documents. It turns raw research and answers into a structured, dual-format PRD (Markdown + interactive HTML).

---

## Directory Guide

| Directory | Purpose |
|---|---|
| `.claude/agents/` | Specialized subagents: engineer, strategist, user_researcher |
| `.claude/commands/` | Slash commands — the executable workflow |
| `framework/` | **Read-only originals** — PRD template, blank user research doc, blank HTML artifacts. Never overwritten by any command. |
| `inputs/` | Raw external data you bring in: interview transcripts, problem briefs, market reports, survey exports. Also stores `prd-answers.md`. |
| `outputs/` | Populated working files: `user_research.md` (from `/research-sync`), `mockups.html`, `reusable_design_system.html`, `data_flow.html` (from `/update-artifacts`). |
| `final_deliverables/` | Final PRD only: `prd.md` (descriptive) and `prd.html` (interactive with embedded artifacts). Written by `/generate-prd`. |

---

## Workflow (run in order)

```
1. Drop raw research files into inputs/
         ↓
2. /research-sync
   Reads inputs/, synthesizes with user_researcher agent → writes outputs/user_research.md
   (framework/user_research.md is used as a read-only template and is never overwritten)
         ↓
3. /prd-interview
   Auto-populates PRD sections from inputs/ first, then guided Q&A for remaining sections
   → saves answers to inputs/prd-answers.md
   Type "pause" at any time to stop; re-run to resume from where you left off.
         ↓
4. /update-artifacts
   Uses research + PRD answers → writes outputs/mockups.html + outputs/reusable_design_system.html
   Edit outputs/data_flow.html (or ask Claude) to match your actual tech stack (section 3.3).
   (framework/*.html originals are never overwritten)
         ↓
5. /generate-prd
   Assembles everything → writes final_deliverables/prd.md + final_deliverables/prd.html
```

---

## Command Cheatsheet

| Command | What it does | Reads | Writes |
|---|---|---|---|
| `/research-sync` | Synthesize research into structured findings | `inputs/*` | `outputs/user_research.md` |
| `/prd-interview` | Auto-populate from inputs, then walk through remaining PRD sections Q&A | `framework/PRD_Template.md`, `framework/prd-hints.md`, `inputs/*`, `outputs/user_research.md` | `inputs/prd-answers.md` |
| `/update-artifacts` | Refresh HTML artifacts with real product content | `outputs/user_research.md`, `inputs/prd-answers.md`, `framework/*.html` (as templates) | `outputs/mockups.html`, `outputs/reusable_design_system.html` |
| `/generate-prd` | Produce final PRD in two formats | `inputs/prd-answers.md`, `outputs/user_research.md`, `outputs/*.html` | `final_deliverables/prd.md`, `final_deliverables/prd.html` |

---

## Inputs Convention

Drop any of the following into `inputs/`:
- Interview transcripts (`.txt`, `.md`)
- Survey exports (`.md`, `.csv`)
- Problem brief or one-pager (`.md`)
- Competitive analysis notes (`.md`)
- Support ticket summaries (`.md`, `.txt`)

`/research-sync` will read all files in `inputs/` except `prd-answers.md` and `.gitkeep`.

---

## HTML Artifacts → PRD Sections

The three populated HTML files in `outputs/` are embedded into `final_deliverables/prd.html` at these sections:

| File | Embedded at |
|---|---|
| `outputs/mockups.html` | Section 2.4 — Key Flows & Wireframes |
| `outputs/reusable_design_system.html` | Section 2.3 / design reference |
| `outputs/data_flow.html` | Section 3.3 — Tech Infrastructure |

---

## Agents

The three agents in `.claude/agents/` can be invoked at any time for ad-hoc review:
- `user_researcher` — synthesize research, identify pain points, refine personas
- `engineer` — assess technical feasibility, estimate effort, flag risks
- `strategist` — frame for leadership, write executive summaries, assess business impact
