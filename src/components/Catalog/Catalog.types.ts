import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { SortState } from "../DataTable";

// --- Field types ---

export type CatalogIdentifierField<T> = {
	type: "identifier";
	id: string;
	value: (item: T) => string;
};

export type CatalogDescriptorField<T, K extends keyof T> = {
	type: "descriptor";
	id: string;
	label: string;
	value: (item: T) => T[K];
	render?: (value: T[K], item: T) => ReactNode;
	comparator?: (valueA: T[K], valueB: T[K]) => number;
	onClick?: (item: T) => void;
	align?: "left" | "center" | "right";
	width?: string | number;
};

// biome-ignore lint/suspicious/noExplicitAny: K is inferred per-field via createField, stored collections use any
export type CatalogField<T, K extends keyof T = any> =
	| CatalogIdentifierField<T>
	| CatalogDescriptorField<T, K>;

// --- Field creator ---

export type FieldCreator<T> = <V extends keyof T>(
	field: CatalogField<T, V>,
) => CatalogField<T, V>;

export type MapItemToFields<T> = (
	createField: FieldCreator<T>,
	// biome-ignore lint/suspicious/noExplicitAny: fields array holds mixed K types
) => CatalogField<T, any>[];

// --- Context ---

export type CatalogContextValue<T = unknown> = {
	collection: T[];
	// biome-ignore lint/suspicious/noExplicitAny: fields array holds mixed K types
	fields: CatalogField<T, any>[];
	getItemId: (item: T) => string;
	selectable: boolean;
	selectedItems: T[];
	setSelectedItems: Dispatch<SetStateAction<T[]>>;
	sort?: SortState;
	setSort: (sort?: SortState) => void;
};

// --- Props ---

export type CatalogProps<T> = {
	children: ReactNode;
	collection: T[];
	mapItemToFields: MapItemToFields<T>;
	selectable?: boolean;
};

export type CatalogTableProps = {
	ariaLabel?: string;
	hoverable?: boolean;
	noDataMessage?: ReactNode;
	rowHeight?: number;
	striped?: boolean;
};
