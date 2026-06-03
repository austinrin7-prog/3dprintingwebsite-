Update the HTML design artifacts with real product content derived from user research and PRD answers.

## Prerequisites check

1. Read `outputs/user_research.md` if it exists; otherwise check `framework/user_research.md`. If neither has real findings (only template placeholders), tell the user to run `/research-sync` first and stop. Prefer `outputs/user_research.md` when it exists.
2. Read `inputs/prd-answers.md` — if it doesn't exist or fewer than 3 sections are answered, tell the user to run `/prd-interview` first and stop.

## Step 1 — Extract the key content

From `inputs/prd-answers.md`, extract:
- **Product name** (from answers header or section 1.1)
- **Target users / personas** (section 1.3)
- **Key pain points** (section 1.4)
- **Target-state workflow steps** (section 2.2)
- **MVP features** (section 2.3)

From `outputs/user_research.md` (or `framework/user_research.md` as fallback), extract:
- **Persona names and descriptions** (section 3.5)
- **Top pain points with quotes** (section 3.3)
- **Jobs-to-be-Done** (section 3.4)

## Step 2 — Generate `outputs/mockups.html`

**Check `inputs/` for design source files first:**
- Look for wireframe images (`.png`, `.jpg`, `.svg`) and spec files (`.md`, `.txt`) that describe screens, layouts, or UI flows
- If found, read them fully — these are the **PRIMARY source** for the HTML structure and layout

**Generate mode** (use when wireframes or screen specs exist in `inputs/`):
- Generate HTML that faithfully implements the screens shown or described in the uploaded files
- Do **NOT** constrain the HTML structure or layout to `framework/mockups.html`
- Use `framework/mockups.html` ONLY to copy the `:root` CSS tokens and reusable component classes (`.btn`, `.badge`, `.input`, `.table`, `.avatar`, etc.) — borrow the design system, not the screen layouts
- Implement as many screens as the wireframe/spec defines, each as a distinct labelled section within the page
- Match the visual hierarchy, screen labels, content areas, and UI components shown in the source material

**Fallback mode** (use ONLY when no wireframes or screen specs exist in `inputs/`):
- Use `framework/mockups.html` as the structural template and update visible text/content to reflect the real product
- Label the output with a comment: `<!-- Fallback: no wireframe found in inputs/ -->`

Write the result to `outputs/mockups.html`.

## Step 3 — Generate `outputs/reusable_design_system.html`

**Check `inputs/` for design token definitions:**
- Look in spec files and uploaded materials for color hex codes, font names, spacing values, border radius definitions, or shadow specs explicitly associated with this product
- If found, extract them as the real `:root` token values

**Generate mode** (use when product design tokens are found in `inputs/`):
- Replace the entire `:root` block with the extracted product tokens — use the real colors, fonts, and spacing, not the template's defaults
- Update the page `<title>` and `<h1>` to "[Product Name] — Design System"
- Update the subtitle to describe this product's component library
- In the Table example: replace placeholder feature names with 3 real MVP features from section 2.3
- Update avatar initials and owner names to match the product owner from prd-answers.md metadata
- All other component markup (buttons, inputs, badges, cards, alerts, etc.) stays structurally identical — only the tokens and example content change

**Fallback mode** (use ONLY when no product design tokens are found in `inputs/`):
- Use `framework/reusable_design_system.html` as the structural template
- Update title, subtitle, table rows, and owner fields with real product content
- Keep the existing generic token values

Write the result to `outputs/reusable_design_system.html`.

## Step 4 — Generate `outputs/data_flow.html`

This file is generated fresh — it is **not** derived from `framework/data_flow.html`'s structure.

**When to generate:** If section 3.2 (Tech Stack) in `inputs/prd-answers.md` has been answered. If section 3.2 is blank or skipped, skip this step and note it is pending.

**How to generate:**
- Read section 3.2 of `inputs/prd-answers.md` to get the actual tech stack (frontend, backend, orchestration, auth, database, vector store, model provider, hosting, observability)
- Read section 3.1 for AI model routing (which models handle which tasks)
- Generate an HTML architecture diagram showing:
  - **Nodes** for each tech layer, color-coded by type (user-facing, backend, AI, data, infra)
  - **Arrows/flows** connecting layers in the order data moves through the system
  - **Labels** on each node (technology name + brief role)
  - A **legend** explaining node color types
- Use `framework/data_flow.html` only as a reference for diagram layout patterns and CSS — do not copy its node content

Write the result to `outputs/data_flow.html`.

## Step 5 — Confirm

After files are written, tell the user:
- Whether `outputs/mockups.html` was **generated from uploaded wireframes/spec** (generate mode) or **fell back to the template** (fallback mode), and which source files were used
- Whether `outputs/reusable_design_system.html` used **extracted product design tokens** (generate mode) or **generic template tokens** (fallback mode)
- Whether `outputs/data_flow.html` was **generated from section 3.2** or is **still pending** (section 3.2 not yet answered)
- That they should open the files from `outputs/` in a browser to review
- That they can run `/generate-prd` once satisfied
