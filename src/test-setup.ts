/// <reference types="@testing-library/jest-dom/vitest" />

import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("react-window");

global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};
