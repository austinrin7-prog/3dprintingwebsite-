# PRD: 3D Printed Goods Ecommerce Website

| | |
|---|---|
| **Owner** | Candy / Store Owner |
| **Product / Feature** | 3D Printed Goods Online Store |
| **Status** | Draft |
| **Last Updated** | June 27, 2026 |

---

# 1. Discovery - Problem & Context

## 1.1 Problem & Opportunity

- **Problem:** Small 3D printing sellers often rely on DMs, marketplaces, or scattered social posts to sell products. Buyers cannot easily see available items, compare options, understand print materials, or submit custom requests in a structured way.
- **Why it matters (users & business):** Buyers need confidence before ordering physical items, especially custom or made-to-order products. The seller needs fewer repetitive questions, clearer order details, and a professional place to send interested customers.
- **Evidence:** Common friction in maker businesses includes unclear pricing, limited product photos, inconsistent custom request details, and manual order coordination through chat.
- **Why now:** Affordable 3D printing has made custom physical goods more accessible, but sellers still need a clean ecommerce experience tailored to made-to-order production.

## 1.2 Target Users

| Role | Buyer or User? | Goals | Constraints |
|---|---|---|---|
| Hobby buyer / gift shopper | Buyer | Find unique printed items, customize color or size, buy quickly | Needs trust, clear photos, shipping dates, and simple checkout |
| Practical problem solver | Buyer | Order replacement parts, organizers, brackets, or custom utility prints | Needs dimensions, material strength notes, and custom upload/contact flow |
| Store owner / maker | User | List products, manage orders, collect custom request details | Limited time, likely solo operator, needs simple admin tools |

## 1.3 Pain Points

1. Buyers do not know what materials, colors, sizes, or finish quality are available without messaging the seller.
2. Custom orders require too much back-and-forth because measurements, reference files, and deadlines are not collected upfront.
3. Marketplace pages make the seller look less distinct and may not explain made-to-order timelines clearly.

## 1.4 Goals & Non-Goals

**Goals**
1. Launch a professional storefront for ready-made and made-to-order 3D printed products.
2. Let buyers choose product options such as color, material, size, and quantity before purchase.
3. Capture custom print requests with enough detail for the seller to quote or accept the job.
4. Reduce manual questions by showing dimensions, production time, shipping expectations, and care notes.

**AI hypothesis:** If we build an AI-assisted custom request helper for buyers, they will submit clearer requests because the assistant can ask for missing details such as dimensions, material use case, color, file upload, and deadline before the seller reviews the request.

**Guardrail metrics**
- Checkout completion rate
- Quote request completion rate
- Refund or cancellation rate caused by unclear product expectations
- Average seller time spent clarifying each custom request

**Non-goals**
- No full 3D model editor in v1.
- No real-time print farm scheduling in v1.
- No multi-vendor marketplace in v1.
- No international tax and customs automation in v1 unless required before launch.

---

# 2. Design - Solution Shape

## 2.1 Solution

Build a branded ecommerce website where customers can browse 3D printed products, view detailed product pages, pick options, add items to cart, and check out. The site also includes a custom print request flow that gathers structured information and optionally uses AI to help buyers describe what they need.

End-to-end user steps:

1. Visitor lands on homepage and sees featured products, categories, and value props.
2. Visitor browses products by category, use case, price, or material.
3. Visitor opens a product page with photos, dimensions, materials, lead time, customization options, and shipping notes.
4. Visitor selects color/material/size and adds item to cart.
5. Visitor checks out using card payment, shipping address, and order confirmation.
6. For custom work, visitor opens the custom request form.
7. **[AI]** Assistant helps turn a rough request into a structured brief and flags missing details.
8. Seller reviews the request and responds with quote, questions, or payment link.

**Alternatives considered & why rejected:**
- Etsy-only storefront: fast to start, but weak brand control and less flexible for custom request intake.
- Instagram/DM-only selling: low setup cost, but hard to scale and easy to lose order details.
- Full custom 3D configurator: powerful, but too expensive and complex for v1.

## 2.2 Features

**MVP**
1. Homepage with product categories, featured items, trust signals, and clear call to action.
2. Product catalog with filtering by category, price, material, color availability, and production time.
3. Product detail pages with images, dimensions, material, finish, lead time, care notes, and options.
4. Cart and checkout using a payment provider such as Stripe.
5. Custom request form with fields for description, dimensions, use case, color/material, quantity, deadline, budget, and optional file upload.
6. Basic seller admin for creating products, managing inventory/status, and viewing orders/requests.
7. Order confirmation and transactional email notifications.

**Future**
- AI-assisted product description generation for the seller.
- AI quote assistant based on filament cost, print time, labor, and shipping.
- Customer accounts and reorder history.
- Gift cards, discount codes, and bundles.
- Reviews and user-submitted photos.
- Upload and preview STL/OBJ files.
- Shipping label generation and production queue.

## 2.3 Key Flows

- Wireframe / prototype link: TBD.
- Critical screens: Homepage, product catalog, product detail, cart, checkout, custom request form, seller dashboard, order/request detail.
- AI moments: Custom request assistant asks clarifying questions and summarizes the request. Seller can edit all AI-generated summaries before using them. If AI is unavailable, the form still works as a normal structured request form.

## 2.4 Non-Functional Requirements

- **Fallback:** If AI request assistance fails, show the standard custom request form and allow submission without AI.
- **Latency target:** Catalog/product pages load in under 2 seconds on a typical broadband connection. AI custom request response should return in under 8 seconds.
- **Cost target:** Keep AI assistance below $0.05 per custom request in MVP; revisit after real usage.
- **Accessibility / i18n:** WCAG 2.1 AA for core buying flows. English-only at launch, with structure ready for future localization.
- **Performance:** Product images should use responsive formats and lazy loading below the first viewport.
- **Security:** Payment data handled by PCI-compliant provider; app should not store raw card details.

---

# 3. Build - AI Implementation

## 3.1 Model & AI Design

| Component | Model | Why | Rough cost/call |
|---|---|---|---|
| Custom request assistant | Small fast LLM, provider TBD | Needs structured Q&A, not deep reasoning | Target <$0.05 |
| Seller description helper | Small/medium LLM, future | Converts specs into polished listings | Target <$0.03 |

- **Key capabilities relied on:** Structured output, short-context conversation, form field extraction, safe clarification questions.
- **Known limitations & mitigations:** AI may infer incorrect requirements; always show editable summaries and require buyer confirmation before submission.
- **Inputs:** Buyer text description, category, dimensions, quantity, material preference, color, deadline, budget, uploaded file metadata.
- **Output format:** Structured request summary with missing fields, recommended follow-up questions, and buyer-confirmed requirements.
- **RAG / retrieval:** Not required for MVP. Future version may retrieve material capability notes, printer size limits, pricing rules, and store policies.

## 3.2 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | Next.js or similar React framework | Strong ecommerce UI, SEO, fast product pages |
| **Backend / API** | Next.js API routes or lightweight Node backend | Simple full-stack deployment |
| **Orchestration** | Server-side request handler | Enough for MVP AI form flow |
| **Auth** | Clerk, Auth.js, or platform auth | Seller admin and optional customer accounts |
| **Database** | PostgreSQL | Reliable products, orders, options, requests |
| **Vector store** | None for MVP | Not needed until policy/material retrieval is added |
| **Model provider** | OpenAI or equivalent | Structured outputs and dependable assistant behavior |
| **Payments** | Stripe | Checkout, payment links, tax/shipping support |
| **Hosting** | Vercel, Render, or Railway | Fast deployment for small business storefront |
| **Storage** | S3-compatible object storage | Product images and custom uploaded files |
| **Observability** | Basic logs plus error tracking | Catch checkout, order, and AI failures |

**Key constraints:** Must be easy for a solo seller to operate; checkout and custom requests must work even if AI is disabled; product pages should be SEO-friendly.

## 3.3 Evaluation

| Dimension | How measured | Target |
|---|---|---|
| Request completeness | Percentage of custom requests with dimensions/use case/material/deadline filled | >80% in alpha |
| Relevance | Human review of AI-generated clarification questions | >85% useful |
| Hallucination rate | AI suggests impossible material/process or invents specs | <5% after review |
| Latency | Time from custom prompt submit to assistant response | p95 <8 seconds |
| Cost | Model cost per custom request | <$0.05 |

- **Test cases:** Simple gift request, replacement part with dimensions, vague request, impossible size, missing deadline, file upload with sparse description, urgent request, out-of-scope unsafe item.
- **Method:** Human spot-check during alpha; automated regression cases for structured extraction once prompts stabilize.

---

# 4. Launch - Deploy & Operate

## 4.1 Launch Plan

| Phase | Audience | Goal | Exit criteria | Timing |
|---|---|---|---|---|
| Alpha | Store owner and trusted friends | Validate catalog, checkout, and request flow | 10 test orders/requests completed with no critical issues | Week 1-2 |
| Closed pilot | Local buyers or social followers | Validate real buying behavior and request quality | 20 real users, 5 paid orders, seller can fulfill without manual confusion | Week 3-4 |
| GA | Public visitors | Start selling publicly | Payment, shipping, email, and admin flows stable | Week 5+ |

**Rollback plan:** Disable AI assistant first if it causes bad requests. If checkout has issues, switch products to inquiry-only mode and keep catalog visible while payment is fixed.

## 4.2 Success Metrics

| Layer | Metric | Target | Source |
|---|---|---|---|
| **North star** | Paid orders per month | 25+ within 90 days of launch | Orders database / Stripe |
| **User** | Product detail to cart conversion | 8%+ | Analytics |
| **Business** | Revenue from storefront | $500+ monthly by month 3 | Stripe / accounting |
| **AI quality** | Custom requests requiring no follow-up | 50%+ by month 2 | Seller review |
| **Guardrails** | Refunds due to unclear expectations | <3% of orders | Seller admin |

## 4.3 Risks & Legal

- **Top risks & mitigations:**
  - Product expectation mismatch: include dimensions, material, photos, lead times, and care notes on every product page.
  - Custom print scope creep: require seller approval and quote before payment for custom requests.
  - AI creates inaccurate summaries: require buyer confirmation and seller review before fulfillment.
  - Shipping delays: show production lead time separately from carrier delivery time.
- **Data handling:** Store buyer contact, shipping, order, and custom request data securely. Encrypt sensitive data in transit and at rest where supported.
- **Model provider terms:** Do not send payment card data to the model. Avoid using buyer data for training unless explicitly permitted by provider settings and privacy policy.
- **Regulatory scope:** Standard ecommerce privacy, refund, tax, and shipping requirements. Consider GDPR/CCPA language if selling broadly.
- **Content safety:** Add policy for prohibited custom prints, including weapons, illegal items, and infringing copyrighted designs.

---

# Appendix

## Open Questions

- What exact products will be sold at launch?
- Will custom requests accept uploaded STL/OBJ files in MVP?
- Will the seller ship nationally, locally, or both?
- What materials and colors are available now?
- What is the target production lead time for common items?
- Are there any prohibited categories the seller wants to explicitly reject?

## References & Links

- Wireframes: TBD
- Prototype: TBD
- Master prompt: TBD
- Eval criteria / test set: TBD
