# Declarative Reactivity: VDOM Reconciliation vs. Proactive Observation

**Authors**: [Amey Thakur](https://github.com/Amey-Thakur) & [Mega Satish](https://github.com/msatmod)

## Abstract
This entry explores the implementation patterns of the three primary declarative frameworks in the ecosystem: **React**, **Solid**, and **Vue**. While all three share a common goal of declarative state-to-UI mapping, their internal execution engines represent divergent strategies for managing the user interface lifecycle.

---

## Implementation Benchmarks

| Framework | Reactivity Model | Source Code | Live Demo |
| :--- | :--- | :--- | :--- |
| **React** | Virtual DOM Reconciliation | [Source](../../Source%20Code/React%20Todo%20App/) | [🚀 Launch App](https://amey-thakur.github.io/JAVASCRIPT-FRAMEWORKS-TODO-APPS/React%20Todo%20App/) |
| **Solid** | Fine-grained Signal Tracking | [Source](../../Source%20Code/Solid%20Todo%20App/) | [🚀 Launch App](https://amey-thakur.github.io/JAVASCRIPT-FRAMEWORKS-TODO-APPS/Solid%20Todo%20App/) |
| **Vue** | Direct Proxy Observation | [Source](../../Source%20Code/Vue%20Todo%20App/) | [🚀 Launch App](https://amey-thakur.github.io/JAVASCRIPT-FRAMEWORKS-TODO-APPS/Vue%20Todo%20App/) |

---

## Architectural Deep Dive

### React: The Reconciliation Paradigm
React utilizes a **Virtual DOM (VDOM)** strategy. This involves maintaining a memory-based representation of the UI that is reconciled against the real DOM through a specialized diffing algorithm.

- **Computational Constraint**: Updates require a full component re-render to generate a new VDOM snapshot.
- **Strategic Advantage**: High predictability and a "Snapshot" mental model that simplifies state transitions.

### Solid: The Signal Paradigm
Solid represents a departure from the VDOM by compiling JSX into direct, atomic DOM operations.

- **Atomic Reactivity**: Uses `Signals` to track dependencies at the node level.
- **Zero Diffing**: When state changes, only the specific DOM node bound to that signal is modified, bypassing the reconciliation tree entirely.
- **Strategic Advantage**: Achieves near-native execution speed while retaining a JSX-based developer experience.

### Vue: The Proxy Paradigm
Vue's Composition API utilizes **JavaScript Proxies** to detect property access and modifications automatically.

- **Dependency Tracking**: The framework observes property "reads" to create a reactive dependency graph.
- **Automated View Sync**: Updates are triggered granularly on property "writes".
- **Strategic Advantage**: Offers the most intuitive learning curve by making standard JavaScript objects reactive.

---

## Researcher Citation Footer
Thakur, A., & Satish, M. (2022). *Declarative Reactivity Benchmarks*. Framework Encyclopedia. [CITATION.cff](../../CITATION.cff)

---
[[ Back to Home ]](Home.md)
