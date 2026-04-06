import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Text } from "./Text";

describe("Text", () => {
	it("renders children", () => {
		render(<Text>Hello world</Text>);
		expect(screen.getByText("Hello world")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLSpanElement>();

		render(<Text ref={ref}>Test</Text>);
		expect(ref.current).toBeInstanceOf(HTMLSpanElement);
	});

	it("passes className", () => {
		render(<Text className="custom">Test</Text>);
		expect(screen.getByText("Test")).toHaveClass("custom");
	});

	describe("numberOfLines", () => {
		it("applies clamp class and inline style", () => {
			render(<Text numberOfLines={2}>Clamped text</Text>);

			const el = screen.getByText("Clamped text");
			expect(el).toHaveClass("pietra-line-clamp");
			expect(el.style.webkitLineClamp).toBe("2");
		});

		it("does not apply clamp class when not set", () => {
			render(<Text>Normal text</Text>);

			const el = screen.getByText("Normal text");
			expect(el).not.toHaveClass("pietra-line-clamp");
		});

		it("merges with existing className", () => {
			render(
				<Text numberOfLines={3} className="custom">
					Clamped text
				</Text>,
			);

			const el = screen.getByText("Clamped text");
			expect(el).toHaveClass("pietra-line-clamp");
			expect(el).toHaveClass("custom");
		});

		it("merges with existing style", () => {
			render(
				<Text numberOfLines={2} style={{ color: "red" }}>
					Styled text
				</Text>,
			);

			const el = screen.getByText("Styled text");
			expect(el.style.color).toBe("red");
			expect(el.style.webkitLineClamp).toBe("2");
		});
	});
});
