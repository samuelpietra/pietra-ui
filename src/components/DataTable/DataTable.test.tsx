import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataTable } from "./DataTable";
import type { DataTableColumn } from "./DataTable.types";

type Item = { id: string; name: string; value: number };

const ITEMS: Item[] = [
	{ id: "1", name: "Charlie", value: 30 },
	{ id: "2", name: "Alice", value: 10 },
	{ id: "3", name: "Bob", value: 20 },
];

const COLUMNS: DataTableColumn<Item>[] = [
	{
		id: "name",
		header: "Name",
		cell: (item) => item.name,
		comparator: (a, b) => a.name.localeCompare(b.name),
		isRowHeader: true,
	},
	{
		id: "value",
		header: "Value",
		cell: (item) => String(item.value),
	},
];

function getTable() {
	return screen.getByRole("table");
}

function getRows() {
	return screen.getAllByRole("row");
}

function getDataRows() {
	return getRows().slice(1);
}

describe("DataTable", () => {
	describe("rendering", () => {
		it("renders column headers", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			const headers = screen.getAllByRole("columnheader");
			expect(headers).toHaveLength(2);
			expect(headers[0]).toHaveTextContent("Name");
			expect(headers[1]).toHaveTextContent("Value");
		});

		it("renders data rows", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			const rows = getDataRows();
			expect(rows).toHaveLength(3);

			const firstRow = within(rows[0]);
			expect(firstRow.getByRole("rowheader")).toHaveTextContent("Charlie");
			expect(firstRow.getByRole("cell")).toHaveTextContent("30");
		});

		it("renders aria-label on table", () => {
			render(
				<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Inventory" />,
			);

			expect(getTable()).toHaveAttribute("aria-label", "Inventory");
		});

		it("renders default empty message", () => {
			render(<DataTable columns={COLUMNS} data={[]} ariaLabel="Test" />);

			expect(screen.getByText("No results found.")).toBeInTheDocument();
			expect(screen.queryAllByRole("row")).toHaveLength(1);
		});

		it("renders custom empty message", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={[]}
					ariaLabel="Test"
					noDataMessage={<span>Nothing here</span>}
				/>,
			);

			expect(screen.getByText("Nothing here")).toBeInTheDocument();
		});

		it("marks isRowHeader cells with rowheader role", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			const firstRow = getDataRows()[0];
			expect(within(firstRow).getByRole("rowheader")).toHaveTextContent(
				"Charlie",
			);
			expect(within(firstRow).getAllByRole("cell")).toHaveLength(1);
		});
	});

	describe("sorting", () => {
		it("makes sortable headers focusable", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={vi.fn()}
				/>,
			);

			const headers = screen.getAllByRole("columnheader");
			expect(headers[0]).toHaveAttribute("tabindex", "0");
			expect(headers[1]).not.toHaveAttribute("tabindex");
		});

		it("sets aria-sort on the sorted column", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={vi.fn()}
				/>,
			);

			const headers = screen.getAllByRole("columnheader");
			expect(headers[0]).toHaveAttribute("aria-sort", "ascending");
			expect(headers[1]).not.toHaveAttribute("aria-sort");
		});

		it("calls onSortChange with asc when clicking unsorted column", async () => {
			const onSortChange = vi.fn();
			const sortableColumns: DataTableColumn<Item>[] = [
				COLUMNS[0],
				{ ...COLUMNS[1], comparator: (a, b) => a.value - b.value },
			];

			render(
				<DataTable
					columns={sortableColumns}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={onSortChange}
				/>,
			);

			const headers = screen.getAllByRole("columnheader");
			await userEvent.click(headers[1]);

			expect(onSortChange).toHaveBeenCalledWith({
				columnId: "value",
				direction: "asc",
			});
		});

		it("toggles direction when clicking already-sorted column", async () => {
			const onSortChange = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={onSortChange}
				/>,
			);

			const headers = screen.getAllByRole("columnheader");
			await userEvent.click(headers[0]);

			expect(onSortChange).toHaveBeenCalledWith({
				columnId: "name",
				direction: "desc",
			});
		});

		it("does not call onSortChange for non-sortable column", async () => {
			const onSortChange = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					onSortChange={onSortChange}
				/>,
			);

			const headers = screen.getAllByRole("columnheader");
			await userEvent.click(headers[1]);

			expect(onSortChange).not.toHaveBeenCalled();
		});

		it("sorts data by comparator", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={vi.fn()}
				/>,
			);

			const rows = getDataRows();
			const names = rows.map(
				(row) => within(row).getByRole("rowheader").textContent,
			);
			expect(names).toEqual(["Alice", "Bob", "Charlie"]);
		});

		it("sorts data descending", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "desc" }}
					onSortChange={vi.fn()}
				/>,
			);

			const rows = getDataRows();
			const names = rows.map(
				(row) => within(row).getByRole("rowheader").textContent,
			);
			expect(names).toEqual(["Charlie", "Bob", "Alice"]);
		});

		it("triggers sort via Enter key", async () => {
			const onSortChange = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={onSortChange}
				/>,
			);

			const header = screen.getAllByRole("columnheader")[0];
			header.focus();
			await userEvent.keyboard("{Enter}");

			expect(onSortChange).toHaveBeenCalledOnce();
		});

		it("triggers sort via Space key", async () => {
			const onSortChange = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					sort={{ columnId: "name", direction: "asc" }}
					onSortChange={onSortChange}
				/>,
			);

			const header = screen.getAllByRole("columnheader")[0];
			header.focus();
			await userEvent.keyboard(" ");

			expect(onSortChange).toHaveBeenCalledOnce();
		});
	});

	describe("row click", () => {
		it("makes rows focusable when onRowClick is set", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					onRowClick={vi.fn()}
				/>,
			);

			const rows = getDataRows();
			for (const row of rows) {
				expect(row).toHaveAttribute("tabindex", "0");
			}
		});

		it("does not make rows focusable without onRowClick", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			const rows = getDataRows();
			for (const row of rows) {
				expect(row).not.toHaveAttribute("tabindex");
			}
		});

		it("calls onRowClick with the correct item", async () => {
			const onRowClick = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					onRowClick={onRowClick}
				/>,
			);

			const rows = getDataRows();
			await userEvent.click(rows[1]);

			expect(onRowClick).toHaveBeenCalledWith(ITEMS[1]);
		});

		it("triggers row click via Enter key", async () => {
			const onRowClick = vi.fn();

			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					onRowClick={onRowClick}
				/>,
			);

			const row = getDataRows()[0];
			row.focus();
			await userEvent.keyboard("{Enter}");

			expect(onRowClick).toHaveBeenCalledWith(ITEMS[0]);
		});
	});

	describe("styling", () => {
		it("applies striped class to even rows", () => {
			render(
				<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" striped />,
			);

			const rows = getDataRows();
			expect(rows[0]).toHaveClass("pietra-data-table-row-striped");
			expect(rows[1]).not.toHaveClass("pietra-data-table-row-striped");
			expect(rows[2]).toHaveClass("pietra-data-table-row-striped");
		});

		it("applies hoverable class by default", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			const rows = getDataRows();
			for (const row of rows) {
				expect(row).toHaveClass("pietra-data-table-row-hoverable");
			}
		});

		it("omits hoverable class when hoverable is false", () => {
			render(
				<DataTable
					columns={COLUMNS}
					data={ITEMS}
					ariaLabel="Test"
					hoverable={false}
				/>,
			);

			const rows = getDataRows();
			for (const row of rows) {
				expect(row).not.toHaveClass("pietra-data-table-row-hoverable");
			}
		});
	});

	describe("aria structure", () => {
		it("has correct role hierarchy", () => {
			render(<DataTable columns={COLUMNS} data={ITEMS} ariaLabel="Test" />);

			expect(getTable()).toBeInTheDocument();
			expect(screen.getAllByRole("rowgroup")).toHaveLength(2);
			expect(screen.getAllByRole("row")).toHaveLength(4);
			expect(screen.getAllByRole("columnheader")).toHaveLength(2);
		});
	});
});
