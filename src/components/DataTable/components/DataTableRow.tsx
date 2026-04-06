import type { CSSProperties, ReactElement } from "react";

import type { DataTableColumn } from "../DataTable.types";

export interface DataTableRowProps {
	columns: DataTableColumn<unknown>[];
	columnStyles: CSSProperties[];
	hasRowClick: boolean;
	hasRowContextMenu: boolean;
	hoverable: boolean;
	rowClassName?: (item: unknown, index: number) => string | undefined;
	sortedData: unknown[];
	striped: boolean;
}

export function DataTableRow({
	index,
	style,
	columns,
	columnStyles,
	hasRowClick,
	hasRowContextMenu,
	hoverable,
	rowClassName,
	sortedData,
	striped,
}: {
	index: number;
	style: CSSProperties;
} & DataTableRowProps): ReactElement {
	const item = sortedData[index];

	const classNames = [
		"pietra-data-table-row",
		hoverable && "pietra-data-table-row-hoverable",
		striped && index % 2 === 0 && "pietra-data-table-row-striped",
		rowClassName?.(item, index),
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			style={style}
			className={classNames}
			role="row"
			tabIndex={hasRowClick ? 0 : undefined}
			data-row-index={hasRowClick || hasRowContextMenu ? index : undefined}
		>
			{columns.map((column, colIndex) => (
				<div
					key={column.id}
					className="pietra-data-table-cell"
					style={columnStyles[colIndex]}
					role={column.isRowHeader ? "rowheader" : "cell"}
				>
					{column.cell(item)}
				</div>
			))}
		</div>
	);
}

DataTableRow.displayName = "DataTableRow";
