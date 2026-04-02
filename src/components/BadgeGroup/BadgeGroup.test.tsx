import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { BadgeGroup, type BadgeGroupItem } from "./BadgeGroup";

beforeEach(() => {
	vi.stubGlobal(
		"ResizeObserver",
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
		},
	);
});

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

	it("renders indicator in measuring mode on first render", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const indicator = container.querySelector(
			".pietra-badge-group-indicator-measuring",
		);

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

	it("renders default +N indicator", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const indicator = container.querySelector("[data-badge-group-indicator]");

		expect(indicator?.textContent).toContain("+");
	});

	it("uses custom indicator render prop", () => {
		const { container } = render(
			<BadgeGroup
				badges={badges}
				indicator={(count, overflow) => (
					<span data-testid="custom">
						{count} hidden ({overflow.length})
					</span>
				)}
			/>,
		);

		const custom = container.querySelector("[data-testid='custom']");
		expect(custom).toBeInTheDocument();
	});

	it("renders badges with correct keys from id", () => {
		const { container } = render(<BadgeGroup badges={badges} />);
		const items = container.querySelectorAll("[data-badge-group-item]");

		expect(items).toHaveLength(3);
	});
});
