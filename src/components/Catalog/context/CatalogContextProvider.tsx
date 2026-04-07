import type { ReactNode } from "react";

import type {
	CatalogContextMenuRender,
	MapItemToFields,
} from "../Catalog.types";
import { useCatalogState } from "../hooks/useCatalogState";
import { CatalogContext, type CatalogContextValue } from "./Catalog.context";

import "../Catalog.css";

export type CatalogProps<T> = {
	/** Catalog sub-components (toolbar, views). */
	children: ReactNode;
	/** The data array to display. */
	collection: T[];
	/** Render function for the right-click context menu. Receives the clicked item and the current selection. */
	contextMenu?: CatalogContextMenuRender<T>;
	/** Callback that receives a `createField` helper and returns an array of field definitions. */
	mapItemToFields: MapItemToFields<T>;
	/** Enables row selection with checkboxes. */
	selectable?: boolean;
};

export function Catalog<T>({
	children,
	collection,
	contextMenu,
	mapItemToFields,
	selectable = false,
}: CatalogProps<T>) {
	const contextValue = useCatalogState({
		collection,
		contextMenu,
		mapItemToFields,
		selectable,
	});

	return (
		<CatalogContext.Provider value={contextValue as CatalogContextValue}>
			<div className="pietra-catalog">{children}</div>
		</CatalogContext.Provider>
	);
}

Catalog.displayName = "Catalog";
