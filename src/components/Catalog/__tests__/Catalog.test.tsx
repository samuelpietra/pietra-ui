import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContextMenu } from "@/components/ContextMenu";
import { renderWithTheme } from "@/test-utils";

import { createFields, PLAYERS, type Player } from "../__fixtures__/mock";
import { CatalogItemCount, CatalogToolbar } from "../components";
import { Catalog } from "../context";
import { useCatalogContext } from "../hooks";
import { CatalogGrid, CatalogList, CatalogTable } from "../views";

function getDataRows() {
	return screen.getAllByRole("row").slice(1);
}

describe("Catalog", () => {
	describe("rendering", () => {
		it("renders children", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<div data-testid="child">Hello</div>
				</Catalog>,
			);

			expect(screen.getByTestId("child")).toHaveTextContent("Hello");
		});

		it("throws when no identifier field is provided", () => {
			const consoleError = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});

			expect(() =>
				render(
					<Catalog
						collection={PLAYERS}
						mapItemToFields={(createField) => [
							createField<"marketValue">({
								type: "descriptor",
								id: "marketValue",
								label: "Market Value",
								value: (p) => p.marketValue,
							}),
						]}
					>
						<div />
					</Catalog>,
				),
			).toThrow('Catalog requires at least one field with type "identifier"');

			consoleError.mockRestore();
		});
	});

	describe("CatalogTable", () => {
		it("renders column headers from fields", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const headers = screen.getAllByRole("columnheader");
			expect(headers).toHaveLength(4);
			expect(headers[0]).toHaveTextContent("Player");
			expect(headers[1]).toHaveTextContent("Nationality");
			expect(headers[2]).toHaveTextContent("Market Value");
			expect(headers[3]).toHaveTextContent("Position");
		});

		it("renders data rows using field render functions", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const rows = getDataRows();
			expect(rows).toHaveLength(3);

			const firstRow = within(rows[0]);
			expect(firstRow.getByText("Ronaldo Nazario")).toBeInTheDocument();
		});

		it("renders default string value when render is omitted", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const rows = getDataRows();
			const firstRow = within(rows[0]);
			expect(firstRow.getByText("Striker")).toBeInTheDocument();
		});

		it("does not render identifier field as a column", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const headers = screen.getAllByRole("columnheader");
			const headerTexts = headers.map((h) => h.textContent);
			expect(headerTexts).not.toContain("ID");
		});

		it("renders empty state", () => {
			render(
				<Catalog collection={[]} mapItemToFields={createFields}>
					<CatalogTable noDataMessage="No players" />
				</Catalog>,
			);

			expect(screen.getByText("No players")).toBeInTheDocument();
		});
	});

	describe("sorting", () => {
		it("sorts rows when clicking a sortable column header", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const headers = screen.getAllByRole("columnheader");
			const nameHeader = headers[0];
			await userEvent.click(nameHeader);

			const rows = getDataRows();
			const names = rows.map(
				(row) => within(row).getAllByRole("cell")[0].textContent,
			);
			expect(names).toEqual([
				"Ronaldinho Gaucho",
				"Ronaldo Nazario",
				"Zinedine Zidane",
			]);
		});

		it("toggles sort direction on second click", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			const headers = screen.getAllByRole("columnheader");
			const nameHeader = headers[0];
			await userEvent.click(nameHeader); // asc
			await userEvent.click(nameHeader); // desc

			const rows = getDataRows();
			const names = rows.map(
				(row) => within(row).getAllByRole("cell")[0].textContent,
			);
			expect(names).toEqual([
				"Zinedine Zidane",
				"Ronaldo Nazario",
				"Ronaldinho Gaucho",
			]);
		});
	});

	describe("selection", () => {
		it("does not show checkboxes when selectable is false", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
		});

		it("shows checkboxes when selectable (header + rows)", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogTable />
				</Catalog>,
			);

			const checkboxes = screen.getAllByRole("checkbox");
			expect(checkboxes).toHaveLength(4); // 1 select-all header + 3 rows
		});

		it("toggles selection on row click", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogTable />
				</Catalog>,
			);

			const rows = getDataRows();
			await userEvent.click(rows[0]);

			const checkboxes = screen.getAllByRole("checkbox");
			// [0] is select-all header, [1..3] are row checkboxes
			expect(checkboxes[1]).toHaveAttribute("data-state", "checked");
			expect(checkboxes[2]).toHaveAttribute("data-state", "unchecked");
		});

		it("toggles selection off on second click", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogTable />
				</Catalog>,
			);

			const rows = getDataRows();
			await userEvent.click(rows[0]);
			await userEvent.click(rows[0]);

			const checkboxes = screen.getAllByRole("checkbox");
			expect(checkboxes[1]).toHaveAttribute("data-state", "unchecked");
		});

		it("select-all header selects all items", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogTable />
				</Catalog>,
			);

			const checkboxes = screen.getAllByRole("checkbox");
			const selectAll = checkboxes[0];
			await userEvent.click(selectAll);

			for (const cb of checkboxes.slice(1)) {
				expect(cb).toHaveAttribute("data-state", "checked");
			}
		});

		it("select-all header deselects all when all selected", async () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogTable />
				</Catalog>,
			);

			const checkboxes = screen.getAllByRole("checkbox");
			const selectAll = checkboxes[0];

			await userEvent.click(selectAll); // select all
			await userEvent.click(selectAll); // deselect all

			for (const cb of checkboxes.slice(1)) {
				expect(cb).toHaveAttribute("data-state", "unchecked");
			}
		});

		it("deselects items removed from collection", async () => {
			function Wrapper() {
				const [players, setPlayers] = useState(PLAYERS);
				return (
					<>
						<button
							type="button"
							data-testid="filter"
							onClick={() => setPlayers([PLAYERS[0]])}
						/>
						<Catalog
							collection={players}
							mapItemToFields={createFields}
							selectable
						>
							<CatalogTable />
						</Catalog>
					</>
				);
			}

			render(<Wrapper />);

			// Select all 3 items
			const selectAll = screen.getAllByRole("checkbox")[0];
			await userEvent.click(selectAll);

			// Shrink collection to 1 item
			await userEvent.click(screen.getByTestId("filter"));

			// Only 1 row remains, and it should still be checked
			const checkboxes = screen.getAllByRole("checkbox");
			expect(checkboxes).toHaveLength(2); // 1 header + 1 row
			expect(checkboxes[1]).toHaveAttribute("data-state", "checked");
		});
	});

	describe("CatalogToolbar", () => {
		it("renders children in toolbar", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogToolbar>
						<span data-testid="toolbar-child">Action</span>
					</CatalogToolbar>
				</Catalog>,
			);

			expect(screen.getByTestId("toolbar-child")).toHaveTextContent("Action");
		});
	});

	describe("CatalogItemCount", () => {
		it("renders item count", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogItemCount />
				</Catalog>,
			);

			expect(screen.getByText("3 items")).toBeInTheDocument();
		});

		it("renders singular for one item", () => {
			render(
				<Catalog collection={[PLAYERS[0]]} mapItemToFields={createFields}>
					<CatalogItemCount />
				</Catalog>,
			);

			expect(screen.getByText("1 item")).toBeInTheDocument();
		});
	});

	describe("useCatalogContext", () => {
		it("exposes collection and fields to custom views", () => {
			function CustomView() {
				const { collection, fields } = useCatalogContext<Player>();
				return (
					<div data-testid="custom">
						{collection.length} items, {fields.length} fields
					</div>
				);
			}

			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CustomView />
				</Catalog>,
			);

			expect(screen.getByTestId("custom")).toHaveTextContent(
				"3 items, 5 fields",
			);
		});

		it("throws when used outside provider", () => {
			const consoleError = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});

			function Orphan() {
				useCatalogContext();
				return null;
			}

			expect(() => render(<Orphan />)).toThrow(
				"useCatalogContext must be used within a <Catalog> provider",
			);

			consoleError.mockRestore();
		});
	});

	describe("field onClick", () => {
		it("calls onClick handler on field click", async () => {
			const handleClick = vi.fn();

			render(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={(createField) => [
						createField<"id">({
							type: "identifier",
							id: "productId",
							value: (p) => p.id,
						}),
						createField<"name">({
							type: "descriptor",
							id: "name",
							label: "Name",
							value: (p) => p.name,
							onClick: handleClick,
						}),
					]}
				>
					<CatalogTable />
				</Catalog>,
			);

			const buttons = screen.getAllByRole("button");
			await userEvent.click(buttons[0]);

			expect(handleClick).toHaveBeenCalledWith(PLAYERS[0]);
		});
	});

	describe("CatalogList", () => {
		it("renders list items using field values", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogList titleField="name" />
				</Catalog>,
			);

			expect(screen.getByText("Ronaldo Nazario")).toBeInTheDocument();
			expect(screen.getByText("Zinedine Zidane")).toBeInTheDocument();
			expect(screen.getByText("Ronaldinho Gaucho")).toBeInTheDocument();
		});

		it("renders empty state", () => {
			render(
				<Catalog collection={[]} mapItemToFields={createFields}>
					<CatalogList titleField="name" noDataMessage="No players" />
				</Catalog>,
			);

			expect(screen.getByText("No players")).toBeInTheDocument();
		});

		it("shows checkboxes when selectable", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogList titleField="name" />
				</Catalog>,
			);

			const checkboxes = screen.getAllByRole("checkbox");
			expect(checkboxes).toHaveLength(3);
		});

		it("uses listbox role when selectable", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogList titleField="name" />
				</Catalog>,
			);

			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
	});

	describe("CatalogGrid", () => {
		it("renders grid cards using field values", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogGrid titleField="name" />
				</Catalog>,
			);

			expect(screen.getByText("Ronaldo Nazario")).toBeInTheDocument();
			expect(screen.getByText("Zinedine Zidane")).toBeInTheDocument();
			expect(screen.getByText("Ronaldinho Gaucho")).toBeInTheDocument();
		});

		it("renders empty state", () => {
			render(
				<Catalog collection={[]} mapItemToFields={createFields}>
					<CatalogGrid titleField="name" noDataMessage="No players" />
				</Catalog>,
			);

			expect(screen.getByText("No players")).toBeInTheDocument();
		});

		it("shows checkboxes when selectable", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogGrid titleField="name" />
				</Catalog>,
			);

			const checkboxes = screen.getAllByRole("checkbox");
			expect(checkboxes).toHaveLength(3);
		});

		it("uses listbox role when selectable", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
					<CatalogGrid titleField="name" />
				</Catalog>,
			);

			expect(screen.getByRole("listbox")).toBeInTheDocument();
		});
	});

	describe("context menu", () => {
		it("does not render ContextMenu when contextMenu prop is not provided", () => {
			render(
				<Catalog collection={PLAYERS} mapItemToFields={createFields}>
					<CatalogTable />
				</Catalog>,
			);

			expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		});

		// Context menu tests use renderWithTheme because Radix ContextMenu
		// requires ThemeProvider to be present in the tree.

		it("shows context menu items on right-click in CatalogTable", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={createFields}
					contextMenu={(item: Player) => (
						<>
							<ContextMenu.Item>Edit {item.name}</ContextMenu.Item>
							<ContextMenu.Item>Delete</ContextMenu.Item>
						</>
					)}
				>
					<CatalogTable />
				</Catalog>,
			);

			await user.pointer({
				keys: "[MouseRight]",
				target: screen.getByText("Ronaldo Nazario"),
			});

			expect(screen.getByText("Edit Ronaldo Nazario")).toBeInTheDocument();
			expect(screen.getByText("Delete")).toBeInTheDocument();
		});

		it("shows context menu for the correct item in CatalogTable", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={createFields}
					contextMenu={(item: Player) => (
						<ContextMenu.Item>Edit {item.name}</ContextMenu.Item>
					)}
				>
					<CatalogTable />
				</Catalog>,
			);

			await user.pointer({
				keys: "[MouseRight]",
				target: screen.getByText("Zinedine Zidane"),
			});

			expect(screen.getByText("Edit Zinedine Zidane")).toBeInTheDocument();
		});

		it("shows context menu items on right-click in CatalogList", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={createFields}
					contextMenu={(item: Player) => (
						<ContextMenu.Item>Edit {item.name}</ContextMenu.Item>
					)}
				>
					<CatalogList titleField="name" />
				</Catalog>,
			);

			const listItems = screen.getAllByRole("listitem");

			await user.pointer({
				keys: "[MouseRight]",
				target: listItems[0],
			});

			expect(screen.getByText("Edit Ronaldo Nazario")).toBeInTheDocument();
		});

		it("shows context menu items on right-click in CatalogGrid", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={createFields}
					contextMenu={(item: Player) => (
						<ContextMenu.Item>Edit {item.name}</ContextMenu.Item>
					)}
				>
					<CatalogGrid titleField="name" />
				</Catalog>,
			);

			const cards = screen.getAllByText(/Nazario|Zidane|Gaucho/);

			await user.pointer({
				keys: "[MouseRight]",
				target: cards[0],
			});

			expect(screen.getByText("Edit Ronaldo Nazario")).toBeInTheDocument();
		});

		it("passes selectedItems to contextMenu render function", async () => {
			const user = userEvent.setup();

			renderWithTheme(
				<Catalog
					collection={PLAYERS}
					mapItemToFields={createFields}
					contextMenu={(item: Player, selectedItems: Player[]) => {
						if (selectedItems.length > 1 && selectedItems.includes(item)) {
							return (
								<ContextMenu.Item>
									Batch ({selectedItems.length})
								</ContextMenu.Item>
							);
						}
						return <ContextMenu.Item>Single {item.name}</ContextMenu.Item>;
					}}
					selectable
				>
					<CatalogTable />
				</Catalog>,
			);

			const rows = screen.getAllByRole("row").slice(1);
			await user.click(rows[0]);
			await user.click(rows[1]);

			await user.pointer({
				keys: "[MouseRight]",
				target: rows[0],
			});

			expect(screen.getByText("Batch (2)")).toBeInTheDocument();
		});
	});
});
