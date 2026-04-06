import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "@/test-utils";

import { ContextMenu } from "../index";

describe("ContextMenu", () => {
	it("shows content on right-click", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Item>Edit</ContextMenu.Item>
					<ContextMenu.Item>Delete</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		expect(screen.queryByText("Edit")).not.toBeInTheDocument();

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		expect(screen.getByText("Edit")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	it("closes on Escape", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Item>Edit</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		expect(screen.getByText("Edit")).toBeInTheDocument();

		await user.keyboard("{Escape}");

		expect(screen.queryByText("Edit")).not.toBeInTheDocument();
	});

	it("renders menu items with correct role", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Item>Edit</ContextMenu.Item>
					<ContextMenu.Item>Delete</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		const menuItems = screen.getAllByRole("menuitem");
		expect(menuItems).toHaveLength(2);
	});

	it("renders checkbox items with checked state", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.CheckboxItem checked>
						Show toolbar
					</ContextMenu.CheckboxItem>
					<ContextMenu.CheckboxItem>Show sidebar</ContextMenu.CheckboxItem>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		const checkedItem = screen.getByRole("menuitemcheckbox", {
			name: "Show toolbar",
		});
		expect(checkedItem).toHaveAttribute("aria-checked", "true");

		const uncheckedItem = screen.getByRole("menuitemcheckbox", {
			name: "Show sidebar",
		});
		expect(uncheckedItem).toHaveAttribute("aria-checked", "false");
	});

	it("renders radio items with selected state", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.RadioGroup value="date">
						<ContextMenu.RadioItem value="date">Date</ContextMenu.RadioItem>
						<ContextMenu.RadioItem value="name">Name</ContextMenu.RadioItem>
					</ContextMenu.RadioGroup>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		const selectedItem = screen.getByRole("menuitemradio", { name: "Date" });
		expect(selectedItem).toHaveAttribute("aria-checked", "true");

		const unselectedItem = screen.getByRole("menuitemradio", {
			name: "Name",
		});
		expect(unselectedItem).toHaveAttribute("aria-checked", "false");
	});

	it("fires onSelect when clicking a menu item", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Item onSelect={onSelect}>Edit</ContextMenu.Item>
					<ContextMenu.Item>Delete</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		await user.click(screen.getByRole("menuitem", { name: "Edit" }));

		expect(onSelect).toHaveBeenCalledOnce();
	});

	it("renders submenu trigger", async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<ContextMenu.Root>
				<ContextMenu.Trigger>
					<div>Right-click here</div>
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
						<ContextMenu.SubContent>
							<ContextMenu.Item>Email</ContextMenu.Item>
							<ContextMenu.Item>Slack</ContextMenu.Item>
						</ContextMenu.SubContent>
					</ContextMenu.Sub>
				</ContextMenu.Content>
			</ContextMenu.Root>,
		);

		await user.pointer({
			keys: "[MouseRight]",
			target: screen.getByText("Right-click here"),
		});

		const subTrigger = screen.getByText("Share");
		expect(subTrigger).toBeInTheDocument();
		expect(subTrigger.closest("[role='menuitem']")).toHaveAttribute(
			"aria-haspopup",
			"menu",
		);
	});
});
