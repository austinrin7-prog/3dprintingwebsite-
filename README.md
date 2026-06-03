# PRD Creation — AI-Powered Product Requirement Documents

An agentic pipeline built on Claude Code that turns raw research and stakeholder answers into a structured, dual-format PRD (Markdown + interactive HTML).

## How it works

```
inputs/          →   /research-sync   →   outputs/user_research.md
                          ↓
                    /prd-interview    →   inputs/prd-answers.md
                          ↓
                   /update-artifacts  →   outputs/mockups.html
                                          outputs/reusable_design_system.html
                          ↓
                    /generate-prd     →   final_deliverables/prd.md
                                          final_deliverables/prd.html
```

Drop your raw research into `inputs/`, run the four commands in order, and get a complete PRD at the end.

## Quickstart

**1. Add your research files to `inputs/`**

Accepted formats: interview transcripts, survey exports, problem briefs, competitive analysis notes, support ticket summaries (`.txt`, `.md`, `.csv`).

**2. Synthesize research**

```
/research-sync
```

Reads all files in `inputs/` (except `prd-answers.md`) and writes `outputs/user_research.md` with structured findings. Original `framework/user_research.md` is used as a template and is never overwritten.

**3. Run the PRD interview**

```
/prd-interview
```

First scans all `inputs/` files and auto-drafts answers for any PRD sections that can be answered from existing data. Then runs guided Q&A for remaining sections. Each section shows practical hints to help you answer well. Type `pause` to stop and resume later; type `skip` to defer a section.

**4. Refresh HTML artifacts**

```
/update-artifacts
```

Writes `outputs/mockups.html` and `outputs/reusable_design_system.html` with real product content from your research and answers. Original `framework/*.html` files are never overwritten. Edit `outputs/data_flow.html` (or ask Claude) to match your actual tech stack after completing section 3.3.

**5. Generate the final PRD**

```
/generate-prd
```

Assembles everything into `final_deliverables/prd.md` (descriptive) and `final_deliverables/prd.html` (interactive with embedded design artifacts).

## Directory structure

```
inputs/                          # Raw research files you bring in
outputs/                         # Populated working files (user_research.md, HTML artifacts)
final_deliverables/              # Final PRD only (prd.md, prd.html)
framework/                       # Read-only originals — never overwritten by any command
  PRD_Template.md                # Structured template (4 sections, 12 sub-sections)
  prd-hints.md                   # Section-specific tips shown during /prd-interview
  user_research.md               # Blank user research template
  mockups.html                   # Original mockups template
  reusable_design_system.html    # Original design system template
  data_flow.html                 # Original architecture diagram template
.claude/
  commands/                      # Slash command definitions
  agents/                        # Specialized subagents (user_researcher, engineer, strategist)
```

## PRD structure

The template covers four phases of product development:

| Section | Contents |
|---|---|
| **1. Discovery** | Problem & opportunity, target users, pain points, goals & non-goals |
| **2. Design** | Solution shape, features (MVP vs future), key flows, non-functional requirements |
| **3. Build** | Model & AI design, tech stack, evaluation criteria |
| **4. Launch** | Launch plan, success metrics, risks & legal |

## Ad-hoc agents

Three specialized agents can be invoked at any time for focused review:

- `user_researcher` — synthesize research, identify pain points, refine personas
- `engineer` — assess technical feasibility, estimate effort, flag risks
- `strategist` — frame for leadership, write executive summaries, assess business impact

## Requirements

- [Claude Code](https://claude.ai/code) CLI

## References

- [html-effectiveness](https://github.com/ThariqS/html-effectiveness) by Thariq Shihipar — HTML artifact approach for embedding interactive design artifacts in PRDs
- [claude-code-pm-course](https://github.com/carlvellotti/claude-code-pm-course) by Carl Vellotti — PM workflow patterns for Claude Code that informed the interview and research-sync structure

## License

Apache 2.0 — see [LICENSE](LICENSE).
