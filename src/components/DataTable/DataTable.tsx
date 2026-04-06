import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import { useMemo } from "react";
import { List } from "react-window";

import "./DataTable.css";

import {
	DataTableRow,
	type DataTableRowProps,
	SortIndicator,
} from "./components";
import type { DataTableProps } from "./DataTable.types";

const DEFAULT_ROW_HEIGHT = 45;

export function DataTable<T>({
	ariaLabel,
	columns,
	data,
	hoverable = true,
	noDataMessage = "No results found.",
	onRowClick,
	onRowContextMenu,
	onSortChange,
	rowClassName,
	rowHeight = DEFAULT_ROW_HEIGHT,
	sort,
	striped = false,
}: DataTableProps<T>) {
	const sortedData = useMemo(() => {
		if (!sort) return data;

		const comparator = columns.find(
			(col) => col.id === sort.columnId,
		)?.comparator;
		if (!comparator) return data;

		const sorted = [...data].sort(comparator);
		return sort.direction === "desc" ? sorted.reverse() : sorted;
	}, [data, sort, columns]);

	function handleSort(columnId: string) {
		if (!onSortChange) return;

		const column = columns.find((col) => col.id === columnId);
		if (!column?.comparator) return;

		if (sort?.columnId === columnId) {
			onSortChange({
				columnId,
				direction: sort.direction === "asc" ? "desc" : "asc",
			});
		} else {
			onSortChange({ columnId, direction: "asc" });
		}
	}

	const columnStyles = useMemo(
		() =>
			columns.map<CSSProperties>((col) => ({
				...(col.width
					? { flex: "0 0 auto", width: col.width }
					: { flex: 1, minWidth: 0 }),
				...(col.align && { textAlign: col.align }),
			})),
		[columns],
	);

	function getColumnId(target: EventTarget) {
		const cell = (target as HTMLElement).closest<HTMLElement>(
			"[data-column-id]",
		);
		return cell?.dataset.columnId;
	}

	function handleHeaderClick(e: MouseEvent<HTMLDivElement>) {
		const columnId = getColumnId(e.target);
		if (columnId) handleSort(columnId);
	}

	function handleHeaderKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key === "Enter" || e.key === " ") {
			const columnId = getColumnId(e.target);
			if (columnId) {
				e.preventDefault();
				handleSort(columnId);
			}
		}
	}

	function getRowIndex(target: EventTarget) {
		const row = (target as HTMLElement).closest<HTMLElement>(
			"[data-row-index]",
		);
		return row?.dataset.rowIndex;
	}

	function handleRowClick(e: MouseEvent<HTMLDivElement>) {
		if (!onRowClick) return;
		const rowIndex = getRowIndex(e.target);
		if (rowIndex) onRowClick(sortedData[Number(rowIndex)]);
	}

	function handleRowContextMenu(e: MouseEvent<HTMLDivElement>) {
		if (!onRowContextMenu) return;
		const rowIndex = getRowIndex(e.target);
		// Note: do not call e.preventDefault() here — the event must bubble up
		// to Radix's ContextMenu.Trigger so it can open the menu and suppress
		// the native browser context menu itself.
		if (rowIndex) onRowContextMenu(sortedData[Number(rowIndex)]);
	}

	function handleRowKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (!onRowClick) return;
		if (e.key === "Enter" || e.key === " ") {
			const rowIndex = getRowIndex(e.target);
			if (rowIndex) {
				e.preventDefault();
				onRowClick(sortedData[Number(rowIndex)]);
			}
		}
	}

	return (
		<div className="pietra-data-table" role="table" aria-label={ariaLabel}>
			<div className="pietra-data-table-header" role="rowgroup">
				{/* biome-ignore lint/a11y/useFocusableInteractive: header row is not interactive, individual column headers are */}
				<div
					className="pietra-data-table-header-row"
					role="row"
					onClick={handleHeaderClick}
					onKeyDown={handleHeaderKeyDown}
				>
					{columns.map((column, colIndex) => {
						const isSortable = !!column.comparator && !!onSortChange;
						const isSorted = sort?.columnId === column.id;

						return (
							<div
								key={column.id}
								className={[
									"pietra-data-table-cell",
									isSortable && "pietra-data-table-sortable",
								]
									.filter(Boolean)
									.join(" ")}
								style={columnStyles[colIndex]}
								role="columnheader"
								tabIndex={isSortable ? 0 : undefined}
								data-column-id={isSortable ? column.id : undefined}
								aria-sort={
									isSorted
										? sort.direction === "asc"
											? "ascending"
											: "descending"
										: undefined
								}
							>
								{column.header}
								{isSorted && <SortIndicator direction={sort.direction} />}
							</div>
						);
					})}
				</div>
			</div>

			{sortedData.length === 0 ? (
				<div className="pietra-data-table-empty">{noDataMessage}</div>
			) : (
				<div
					className="pietra-data-table-body"
					role="rowgroup"
					onClick={handleRowClick}
					onContextMenu={handleRowContextMenu}
					onKeyDown={handleRowKeyDown}
				>
					<List<DataTableRowProps>
						role="presentation"
						rowCount={sortedData.length}
						rowHeight={rowHeight}
						rowComponent={DataTableRow}
						rowProps={{
							columns: columns as DataTableRowProps["columns"],
							columnStyles,
							hasRowClick: !!onRowClick,
							hasRowContextMenu: !!onRowContextMenu,
							hoverable,
							rowClassName: rowClassName as DataTableRowProps["rowClassName"],
							sortedData,
							striped,
						}}
					/>
				</div>
			)}
		</div>
	);
}

DataTable.displayName = "DataTable";
