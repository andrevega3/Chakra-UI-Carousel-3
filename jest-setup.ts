import "@testing-library/jest-dom"
import structuredClone from "structured-clone";

if (typeof globalThis.structuredClone === "undefined") {
  globalThis.structuredClone = structuredClone;
}

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
