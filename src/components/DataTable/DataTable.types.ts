import type { ReactNode } from "react";

export type DataTableColumn<T> = {
	id: string;
	header: ReactNode;
	cell: (item: T) => ReactNode;
	align?: "left" | "center" | "right";
	comparator?: (a: T, b: T) => number;
	isRowHeader?: boolean;
	width?: string | number;
};

export type SortState = {
	columnId: string;
	direction: "asc" | "desc";
};

export type DataTableProps<T> = {
	ariaLabel: string;
	columns: DataTableColumn<T>[];
	data: T[];
	hoverable?: boolean;
	noDataMessage?: ReactNode;
	onRowClick?: (item: T) => void;
	onSortChange?: (sort: SortState) => void;
	rowHeight?: number;
	sort?: SortState;
	striped?: boolean;
};
