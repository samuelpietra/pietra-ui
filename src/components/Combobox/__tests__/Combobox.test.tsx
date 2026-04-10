import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "@/test-utils";

import {
	CreatableSelect,
	FRUITS,
	GroupedSelect,
	MultiSelect,
	SingleSelect,
	WithClear,
} from "../__fixtures__/mocks";
import { Combobox } from "../index";

describe("Combobox", () => {
	let user: UserEvent;

	beforeEach(() => {
		user = userEvent.setup();
	});

	it("opens dropdown on input focus", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		expect(input).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});

	it("filters options as user types", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");

		await user.click(input);
		await user.type(input, "ban");

		const listbox = screen.getByRole("listbox");

		expect(within(listbox).getByText("Banana")).toBeInTheDocument();
		expect(within(listbox).queryByText("Apple")).not.toBeInTheDocument();
		expect(within(listbox).queryByText("Cherry")).not.toBeInTheDocument();
	});

	it("selects option and closes dropdown in single select mode", async () => {
		const mockOnChangeFn = vi.fn();
		renderWithTheme(<SingleSelect onChange={mockOnChangeFn} />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		const option = screen.getByText("Banana");
		await user.click(option);

		expect(mockOnChangeFn).toHaveBeenCalledWith("Banana");
		expect(input).toHaveValue("Banana");
		expect(input).toHaveAttribute("aria-expanded", "false");
	});

	it("reopens dropdown on click after selecting in single mode", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);
		await user.click(screen.getByText("Banana"));

		expect(input).toHaveAttribute("aria-expanded", "false");

		await user.click(input);

		expect(input).toHaveAttribute("aria-expanded", "true");
		expect(input).toHaveValue("");
	});

	it("selects multiple options and shows tags", async () => {
		const mockOnChangeFn = vi.fn();
		renderWithTheme(<MultiSelect onChange={mockOnChangeFn} />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.click(screen.getByText("Apple"));
		expect(mockOnChangeFn).toHaveBeenLastCalledWith(["Apple"]);

		await user.click(screen.getByText("Banana"));
		expect(mockOnChangeFn).toHaveBeenLastCalledWith(["Apple", "Banana"]);

		// Tags should be visible
		const tags = screen.getAllByText(/Apple|Banana/);
		expect(tags.length).toBeGreaterThanOrEqual(2);

		// Dropdown stays open in multi-select
		expect(input).toHaveAttribute("aria-expanded", "true");
	});

	it("removes tag on dismiss click", async () => {
		const mockOnChangeFn = vi.fn();
		renderWithTheme(<MultiSelect onChange={mockOnChangeFn} />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.click(screen.getByText("Apple"));
		await user.click(screen.getByText("Banana"));

		const dismissButtons = screen.getAllByLabelText("Remove");
		await user.click(dismissButtons[0]);

		expect(mockOnChangeFn).toHaveBeenLastCalledWith(["Banana"]);
	});

	it("removes last tag on backspace with empty input", async () => {
		const mockOnChangeFn = vi.fn();
		renderWithTheme(<MultiSelect onChange={mockOnChangeFn} />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.click(screen.getByText("Apple"));
		await user.click(screen.getByText("Banana"));

		// Focus input and press backspace
		await user.click(input);
		await user.keyboard("{Backspace}");

		expect(mockOnChangeFn).toHaveBeenLastCalledWith(["Apple"]);
	});

	it("shows 'Create X' option when allowCreate and no match", async () => {
		renderWithTheme(<CreatableSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);
		await user.type(input, "Mango");

		expect(screen.getByText('Create "Mango"')).toBeInTheDocument();
	});

	it("navigates options with ArrowDown and ArrowUp", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.keyboard("{ArrowDown}");
		const firstOption = screen.getByRole("option", { name: "Apple" });
		expect(firstOption).toHaveClass("pietra-combobox-item-highlighted");

		await user.keyboard("{ArrowDown}");
		const secondOption = screen.getByRole("option", { name: "Banana" });
		expect(secondOption).toHaveClass("pietra-combobox-item-highlighted");

		await user.keyboard("{ArrowUp}");
		expect(firstOption).toHaveClass("pietra-combobox-item-highlighted");
	});

	it("selects highlighted option on Enter", async () => {
		const mockOnChangeFn = vi.fn();
		renderWithTheme(<SingleSelect onChange={mockOnChangeFn} />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.keyboard("{ArrowDown}");
		await user.keyboard("{ArrowDown}");
		await user.keyboard("{Enter}");

		expect(mockOnChangeFn).toHaveBeenCalledWith("Banana");
	});

	it("closes dropdown on Escape", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);
		expect(input).toHaveAttribute("aria-expanded", "true");

		await user.keyboard("{Escape}");
		expect(input).toHaveAttribute("aria-expanded", "false");
	});

	it("renders tag area when collapseTags is set", async () => {
		renderWithTheme(<MultiSelect collapseTags />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.click(screen.getByText("Apple"));
		await user.click(screen.getByText("Banana"));

		expect(screen.getAllByText("Apple").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("Banana").length).toBeGreaterThanOrEqual(1);
	});

	it("clears all selections with clear button", async () => {
		renderWithTheme(<WithClear />);

		const input = screen.getByRole("combobox");
		await user.click(input);

		await user.click(screen.getByText("Apple"));
		await user.click(screen.getByText("Banana"));

		// Tags should be visible before clearing
		expect(screen.getAllByLabelText("Remove").length).toBe(2);

		const clearButton = screen.getByLabelText("Clear all selections");
		await user.click(clearButton);

		// Tags should be gone after clearing
		expect(screen.queryAllByLabelText("Remove").length).toBe(0);
	});

	it("shows empty state when no options match", async () => {
		renderWithTheme(<SingleSelect />);

		const input = screen.getByRole("combobox");
		await user.click(input);
		await user.type(input, "xyz");

		expect(screen.getByText("No results found")).toBeInTheDocument();
	});

	it("does not open when disabled", async () => {
		renderWithTheme(
			<Combobox.Root options={FRUITS} disabled>
				<Combobox.Input placeholder="Disabled" />
				<Combobox.Content />
			</Combobox.Root>,
		);

		const input = screen.getByRole("combobox");
		expect(input).toBeDisabled();

		await user.click(input);
		expect(input).toHaveAttribute("aria-expanded", "false");
	});

	describe("grouped custom content", () => {
		it("renders groups with labels and items", async () => {
			renderWithTheme(<GroupedSelect />);

			const input = screen.getByRole("combobox");
			await user.click(input);

			expect(screen.getByText("Web")).toBeInTheDocument();
			expect(screen.getByText("General")).toBeInTheDocument();
			expect(screen.getByText("Systems")).toBeInTheDocument();

			expect(
				screen.getByRole("option", { name: "JavaScript" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("option", { name: "Python" }),
			).toBeInTheDocument();
			expect(screen.getByRole("option", { name: "Rust" })).toBeInTheDocument();
		});

		it("associates group label via aria-labelledby", async () => {
			renderWithTheme(<GroupedSelect />);

			const input = screen.getByRole("combobox");
			await user.click(input);

			const groups = screen.getAllByRole("group");
			for (const group of groups) {
				const labelledBy = group.getAttribute("aria-labelledby");
				expect(labelledBy).toBeTruthy();

				if (labelledBy) {
					expect(document.getElementById(labelledBy)).toBeInTheDocument();
				}
			}
		});

		it("selects a grouped item on click", async () => {
			const mockOnChangeFn = vi.fn();
			renderWithTheme(<GroupedSelect onChange={mockOnChangeFn} />);

			const input = screen.getByRole("combobox");
			await user.click(input);
			await user.click(screen.getByRole("option", { name: "TypeScript" }));

			expect(mockOnChangeFn).toHaveBeenCalledWith(
				expect.objectContaining({ id: "ts", label: "TypeScript" }),
			);
		});

		it("filters grouped items as user types", async () => {
			renderWithTheme(<GroupedSelect />);

			const input = screen.getByRole("combobox");
			await user.click(input);
			await user.type(input, "Rust");

			expect(screen.getByRole("option", { name: "Rust" })).toBeInTheDocument();
			expect(
				screen.queryByRole("option", { name: "JavaScript" }),
			).not.toBeInTheDocument();
		});

		it("renders separators between groups", async () => {
			const { container } = renderWithTheme(<GroupedSelect />);

			const input = screen.getByRole("combobox");
			await user.click(input);

			const separators = container.querySelectorAll(
				".pietra-combobox-separator",
			);
			expect(separators.length).toBeGreaterThanOrEqual(1);
		});

		it("navigates grouped items with keyboard", async () => {
			const mockOnChangeFn = vi.fn();
			renderWithTheme(<GroupedSelect onChange={mockOnChangeFn} />);

			const input = screen.getByRole("combobox");
			await user.click(input);

			await user.keyboard("{ArrowDown}");
			const firstOption = screen.getByRole("option", { name: "JavaScript" });
			expect(firstOption).toHaveClass("pietra-combobox-item-highlighted");

			await user.keyboard("{Enter}");
			expect(mockOnChangeFn).toHaveBeenCalledWith(
				expect.objectContaining({ id: "js" }),
			);
		});
	});
});
