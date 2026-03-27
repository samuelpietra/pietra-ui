import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";

import { useLatest } from "./useLatest";

describe("useLatest", () => {
	it("returns a ref with the initial value", () => {
		const { result } = renderHook(() => useLatest("initial"));

		expect(result.current.current).toBe("initial");
	});

	it("updates ref.current when value changes", () => {
		const { result, rerender } = renderHook(({ value }) => useLatest(value), {
			initialProps: { value: "first" },
		});

		rerender({ value: "second" });
		expect(result.current.current).toBe("second");
	});

	it("returns the same ref object across rerenders", () => {
		const { result, rerender } = renderHook(({ value }) => useLatest(value), {
			initialProps: { value: 1 },
		});

		const firstRef = result.current;

		rerender({ value: 2 });
		expect(result.current).toBe(firstRef);
	});
});
