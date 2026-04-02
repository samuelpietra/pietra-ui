import {
	type ComponentType,
	createContext,
	type Dispatch,
	type SetStateAction,
} from "react";

import type { SortState } from "@/components/DataTable";

import type { CatalogField } from "../Catalog.types";

export type CatalogViewEntry = {
	id: string;
	label: string;
	icon: ComponentType<{ size?: number | string }>;
};

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
	view?: string;
	setView: (view: string) => void;
	views: CatalogViewEntry[];
	registerView: (entry: CatalogViewEntry, isDefault: boolean) => void;
};

export const CatalogContext = createContext<CatalogContextValue | null>(null);
