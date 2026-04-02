import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popover } from "../index";

describe("Popover", () => {
	it("renders trigger and content", () => {
		render(
			<Popover.Root open>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<p>Popover content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		expect(screen.getByText("Open")).toBeInTheDocument();
		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});

	it("opens on trigger click", async () => {
		const user = userEvent.setup();

		render(
			<Popover.Root>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<p>Popover content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

		await user.click(screen.getByText("Open"));

		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});

	it("closes on Escape", async () => {
		const user = userEvent.setup();

		render(
			<Popover.Root>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<p>Popover content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		await user.click(screen.getByText("Open"));
		expect(screen.getByText("Popover content")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
	});

	it("closes on Close button click", async () => {
		const user = userEvent.setup();

		render(
			<Popover.Root>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<Popover.Close>
						<button type="button">Close</button>
					</Popover.Close>
				</Popover.Content>
			</Popover.Root>,
		);

		await user.click(screen.getByText("Open"));
		expect(screen.getByText("Close")).toBeInTheDocument();

		await user.click(screen.getByText("Close"));
		expect(screen.queryByText("Close")).not.toBeInTheDocument();
	});

	it("sets aria-expanded on trigger", async () => {
		const user = userEvent.setup();

		render(
			<Popover.Root>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<p>Content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		const trigger = screen.getByText("Open");
		expect(trigger).toHaveAttribute("aria-expanded", "false");

		await user.click(trigger);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	});

	it("renders content with dialog role", () => {
		render(
			<Popover.Root open>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<p>Content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("forwards ref on Trigger", () => {
		const ref = createRef<HTMLButtonElement>();

		render(
			<Popover.Root>
				<Popover.Trigger ref={ref}>
					<button type="button">Open</button>
				</Popover.Trigger>
			</Popover.Root>,
		);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});

	it("forwards ref on Content", () => {
		const ref = createRef<HTMLDivElement>();

		render(
			<Popover.Root open>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content ref={ref}>
					<p>Content</p>
				</Popover.Content>
			</Popover.Root>,
		);

		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("forwards ref on Close", () => {
		const ref = createRef<HTMLButtonElement>();

		render(
			<Popover.Root open>
				<Popover.Trigger>
					<button type="button">Open</button>
				</Popover.Trigger>
				<Popover.Content>
					<Popover.Close ref={ref}>
						<button type="button">Close</button>
					</Popover.Close>
				</Popover.Content>
			</Popover.Root>,
		);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});
});
