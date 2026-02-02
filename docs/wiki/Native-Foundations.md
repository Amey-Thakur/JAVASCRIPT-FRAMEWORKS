# Native Foundations: Benchmarking Pure Web Standards

**Authors**: [Amey Thakur](https://github.com/Amey-Thakur) & [Mega Satish](https://github.com/msatmod)

## Abstract
Native foundations represent the baseline for all performance and architectural metrics in this repository. **Vanilla JS** and **Lit** provide a study in standard-aligned engineering, stripping away the "Framework Layer" to expose the raw mechanics of modern web rendering.

---

## Implementation Benchmarks

| Implementation | Standard Alignment | Source Code | Live Demo |
| :--- | :--- | :--- | :--- |
| **Vanilla JS** | Pure ECMAScript & DOM | [Source](../../Source%20Code/Vanilla%20Todo%20App/) | [🚀 Launch App](https://amey-thakur.github.io/JAVASCRIPT-FRAMEWORKS-TODO-APPS/Vanilla%20Todo%20App/) |
| **Lit** | Custom Elements Standard | [Source](../../Source%20Code/Lit%20Todo%20App/) | [🚀 Launch App](https://amey-thakur.github.io/JAVASCRIPT-FRAMEWORKS-TODO-APPS/Lit%20Todo%20App/) |

---

## Architectural Mechanics

### Vanilla JS: The Raw Threshold
The Vanilla JS implementation is the architectural substrate of the ecosystem. It manipulates the DOM directly using native Web APIs.

- **Technical Execution**: Manual orchestration of `querySelector`, `addEventListener`, and property assignment.
- **Strategic value**: Serves as the high-fidelity benchmark for payload size (approximately 0kb framework runtime) and execution speed.

### Lit: Evolutionary Standards
Lit provides a tiny layer on top of native **Custom Elements**, adding a high-speed declarative template engine.

- **Web Standards Core**: Components are actual `HTMLElement` subclasses that the browser recognizes natively.
- **Optimized Rendering**: Lit only re-renders the specific dynamic parts of a template, maintaining standard compliance while offering the developer experience of a modern framework.

> [!TIP]
> ### Scholarly Insight: The Zero-abstraction Baseline
> Every modern framework is essentially an abstraction layer over the patterns seen in these foundations. Understanding these core Web APIs is fundamental to mastering any reactive library.

---

## Researcher Citation Footer
Thakur, A., & Satish, M. (2022). *Native Web Standards Benchmarks*. Framework Encyclopedia. [CITATION.cff](../../CITATION.cff)

---
[[ Back to Home ]](Home.md)
