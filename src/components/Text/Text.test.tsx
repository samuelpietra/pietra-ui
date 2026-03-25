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
});
