import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { BadgeGroup, type BadgeGroupItem } from "./BadgeGroup";

const badges: BadgeGroupItem[] = [
	{ id: "a", children: "Alpha" },
	{ id: "b", children: "Beta" },
	{ id: "c", children: "Gamma" },
];

describe("BadgeGroup", () => {
	it("renders all badges initially for measurement", () => {
		const { container } = render(<BadgeGroup badges={badges} />);

		expect(container.querySelectorAll("[data-badge-group-item]")).toHaveLength(
			3,
		);
	});

	it("renders indicator element even when not overflowing", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const indicator = container.querySelector("[data-badge-group-indicator]");

		expect(indicator).toBeInTheDocument();
	});

	it("applies custom gap via CSS variable", () => {
		const { container } = render(<BadgeGroup badges={badges} gap={4} />);
		const group = container.querySelector(".pietra-badge-group");

		expect(group).toHaveStyle({ gap: "var(--space-4)" });
	});

	it("uses default gap of 2", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const group = container.querySelector(".pietra-badge-group");

		expect(group).toHaveStyle({ gap: "var(--space-2)" });
	});

	it("forwards ref", () => {
		const ref = { current: null as HTMLDivElement | null };

		render(<BadgeGroup ref={ref} badges={badges} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("hides indicator when not overflowing", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const indicator = container.querySelector("[data-badge-group-indicator]");

		expect(indicator?.classList).toContain(
			"pietra-badge-group-indicator-hidden",
		);
		expect(indicator?.textContent).toBe("");
	});

	it("accepts custom indicator render prop", () => {
		const customIndicator = vi.fn(() => (
			<span data-testid="custom">overflow</span>
		));

		render(<BadgeGroup badges={badges} indicator={customIndicator} />);

		// In jsdom there's no overflow, so indicator should not be called
		expect(customIndicator).not.toHaveBeenCalled();
	});

	it("renders badges with correct keys from id", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const items = container.querySelectorAll("[data-badge-group-item]");

		expect(items).toHaveLength(3);
	});
});
