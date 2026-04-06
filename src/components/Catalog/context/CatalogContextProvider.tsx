import type { ReactNode } from "react";

import type {
	CatalogContextMenuRender,
	MapItemToFields,
} from "../Catalog.types";
import { useCatalogState } from "../hooks/useCatalogState";
import { CatalogContext, type CatalogContextValue } from "./Catalog.context";

import "../Catalog.css";

export type CatalogProps<T> = {
	children: ReactNode;
	collection: T[];
	contextMenu?: CatalogContextMenuRender<T>;
	mapItemToFields: MapItemToFields<T>;
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
