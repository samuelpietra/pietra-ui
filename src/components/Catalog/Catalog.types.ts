import type { ReactNode } from "react";

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

// --- Context menu ---

export type CatalogContextMenuRender<T> = (
	item: T,
	selectedItems: T[],
) => ReactNode;

// --- Field mapper ---

// biome-ignore lint/suspicious/noExplicitAny: identity function for inline field creation in FieldMapper callbacks
type FieldMapperCreator<T> = <V extends keyof T = any>(
	field: CatalogField<T, V>,
) => CatalogField<T, V>;

export type FieldMapper<T> =
	| string
	| ((
			// biome-ignore lint/suspicious/noExplicitAny: fields array holds mixed K types
			fields: CatalogField<T, any>[],
			createField: FieldMapperCreator<T>,
			// biome-ignore lint/suspicious/noExplicitAny: returned field has unknown K
	  ) => CatalogField<T, any>);

// biome-ignore lint/suspicious/noExplicitAny: T is inferred at the consumer call site
export type AnyFieldMapper = FieldMapper<any>;
