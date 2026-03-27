import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Image } from "./Image";

const TEST_SRC = "https://example.com/image.png";
const FALLBACK_SRC = "https://example.com/fallback.png";

function getHiddenImg() {
	return screen.getByRole("img", { hidden: true });
}

const loadImage = () => {
	const img = getHiddenImg();
	fireEvent.load(img);
};

const errorImage = () => {
	const img = getHiddenImg();
	fireEvent.error(img);
};

describe("Image", () => {
	it("renders with alt text", () => {
		render(<Image src={TEST_SRC} alt="Test image" />);
		expect(getHiddenImg()).toHaveAttribute("alt", "Test image");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLImageElement>();

		render(<Image ref={ref} src={TEST_SRC} alt="Test" />);
		expect(ref.current).toBeInstanceOf(HTMLImageElement);
	});

	it("passes className to the img element", () => {
		render(<Image src={TEST_SRC} alt="Test" className="custom" />);
		expect(getHiddenImg()).toHaveClass("custom");
	});

	describe("loading state", () => {
		it("shows skeleton when src is undefined", () => {
			const { getByTestId } = render(
				<Image src={undefined} alt="Test" width={100} height={100} />,
			);

			expect(getByTestId("image-skeleton")).toBeInTheDocument();
		});

		it("shows skeleton while image is loading", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" width={100} />,
			);

			expect(getByTestId("image-skeleton")).toBeInTheDocument();
		});

		it("hides skeleton after image loads", () => {
			const { queryByTestId } = render(
				<Image src={TEST_SRC} alt="Test" width={100} />,
			);

			loadImage();
			expect(queryByTestId("image-skeleton")).not.toBeInTheDocument();
		});

		it("hides img with visibility:hidden while loading", () => {
			render(<Image src={TEST_SRC} alt="Test" />);
			expect(getHiddenImg()).toHaveStyle({ visibility: "hidden" });
		});

		it("shows img after load", () => {
			render(<Image src={TEST_SRC} alt="Test" />);
			loadImage();
			expect(getHiddenImg()).not.toHaveStyle({ visibility: "hidden" });
		});
	});

	describe("src changes", () => {
		it("resets loading state when src changes", () => {
			const { queryByTestId, rerender } = render(
				<Image src={TEST_SRC} alt="Test" width={100} />,
			);

			loadImage();
			expect(queryByTestId("image-skeleton")).not.toBeInTheDocument();

			rerender(
				<Image src="https://example.com/other.png" alt="Test" width={100} />,
			);

			expect(queryByTestId("image-skeleton")).toBeInTheDocument();
		});

		it("resets error state when src changes", () => {
			const { rerender } = render(
				<Image src={TEST_SRC} alt="Test" fallbackSrc={FALLBACK_SRC} />,
			);

			errorImage();
			expect(getHiddenImg()).toHaveAttribute("src", FALLBACK_SRC);

			rerender(
				<Image
					src="https://example.com/new.png"
					alt="Test"
					fallbackSrc={FALLBACK_SRC}
				/>,
			);

			expect(getHiddenImg()).toHaveAttribute(
				"src",
				"https://example.com/new.png",
			);
		});
	});

	describe("fallback", () => {
		it("uses fallbackSrc when image fails to load", () => {
			render(<Image src={TEST_SRC} alt="Test" fallbackSrc={FALLBACK_SRC} />);
			errorImage();
			expect(getHiddenImg()).toHaveAttribute("src", FALLBACK_SRC);
		});

		it("does not set onError after fallback is applied", () => {
			const onError = vi.fn();

			render(
				<Image
					src={TEST_SRC}
					alt="Test"
					fallbackSrc={FALLBACK_SRC}
					onError={onError}
				/>,
			);

			errorImage();
			onError.mockClear();

			fireEvent.error(getHiddenImg());
			expect(onError).not.toHaveBeenCalled();
		});

		it("has no src when src is undefined regardless of fallbackSrc", () => {
			render(<Image src={undefined} alt="Test" fallbackSrc={FALLBACK_SRC} />);
			expect(getHiddenImg()).not.toHaveAttribute("src");
		});
	});

	describe("callbacks", () => {
		it("calls onLoad when image loads", () => {
			const onLoad = vi.fn();

			render(<Image src={TEST_SRC} alt="Test" onLoad={onLoad} />);
			loadImage();
			expect(onLoad).toHaveBeenCalledOnce();
		});

		it("calls onError when image fails", () => {
			const onError = vi.fn();

			render(<Image src={TEST_SRC} alt="Test" onError={onError} />);
			errorImage();
			expect(onError).toHaveBeenCalledOnce();
		});

		it("does not attach onLoad when src is undefined", () => {
			const onLoad = vi.fn();

			render(<Image src={undefined} alt="Test" onLoad={onLoad} />);
			fireEvent.load(getHiddenImg());
			expect(onLoad).not.toHaveBeenCalled();
		});
	});

	describe("shape", () => {
		it("defaults to square (no border-radius)", () => {
			render(<Image src={TEST_SRC} alt="Test" />);
			loadImage();
			expect(getHiddenImg()).not.toHaveStyle({ borderRadius: "8px" });
			expect(getHiddenImg()).not.toHaveStyle({ borderRadius: "50%" });
		});

		it("applies 8px border-radius for rounded shape", () => {
			render(<Image src={TEST_SRC} alt="Test" shape="rounded" />);
			expect(getHiddenImg()).toHaveStyle({ borderRadius: "8px" });
		});

		it("applies 50% border-radius for circular shape", () => {
			render(<Image src={TEST_SRC} alt="Test" shape="circular" />);
			expect(getHiddenImg()).toHaveStyle({ borderRadius: "50%" });
		});
	});

	describe("fit", () => {
		it("auto-applies cover when both width and height are provided", () => {
			render(<Image src={TEST_SRC} alt="Test" width={200} height={200} />);
			expect(getHiddenImg()).toHaveStyle({ objectFit: "cover" });
		});

		it("auto-applies cover when ratio is provided", () => {
			render(<Image src={TEST_SRC} alt="Test" ratio={16 / 9} width={200} />);
			expect(getHiddenImg()).toHaveStyle({ objectFit: "cover" });
		});

		it("does not auto-apply cover when only width is provided", () => {
			render(<Image src={TEST_SRC} alt="Test" width={200} />);
			expect(getHiddenImg()).not.toHaveStyle({ objectFit: "cover" });
		});

		it("allows explicit fit to override auto-cover", () => {
			render(
				<Image
					src={TEST_SRC}
					alt="Test"
					width={200}
					height={200}
					fit="contain"
				/>,
			);

			expect(getHiddenImg()).toHaveStyle({ objectFit: "contain" });
		});
	});

	describe("bordered", () => {
		it("shows border after image loads", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" bordered width={200} height={200} />,
			);

			loadImage();
			expect(getByTestId("image-wrapper")).toHaveStyle({
				border: "1px solid var(--gray-6)",
			});
		});

		it("hides border while loading", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" bordered width={200} height={200} />,
			);

			expect(getByTestId("image-wrapper").style.border).toBe("");
		});
	});

	describe("dimensions", () => {
		it("assumes square when only width is provided", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" width={200} />,
			);

			expect(getByTestId("image-wrapper")).toHaveStyle({
				width: "200px",
				height: "200px",
			});
		});

		it("assumes square when only height is provided", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" height={150} />,
			);

			expect(getByTestId("image-wrapper")).toHaveStyle({
				width: "150px",
				height: "150px",
			});
		});

		it("uses both width and height when provided", () => {
			const { getByTestId } = render(
				<Image src={TEST_SRC} alt="Test" width={300} height={200} />,
			);

			expect(getByTestId("image-wrapper")).toHaveStyle({
				width: "300px",
				height: "200px",
			});
		});

		it("sets img to 100% when both dimensions provided", () => {
			render(<Image src={TEST_SRC} alt="Test" width={300} height={200} />);
			expect(getHiddenImg()).toHaveStyle({ width: "100%", height: "100%" });
		});
	});

	describe("style passthrough", () => {
		it("merges custom style with internal styles", () => {
			render(<Image src={TEST_SRC} alt="Test" style={{ opacity: 0.5 }} />);
			expect(getHiddenImg()).toHaveStyle({ opacity: "0.5" });
		});

		it("allows custom style to override internal styles", () => {
			render(<Image src={TEST_SRC} alt="Test" style={{ display: "inline" }} />);
			expect(getHiddenImg()).toHaveStyle({ display: "inline" });
		});
	});
});
