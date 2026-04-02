import { useContext } from "react";

import {
	CatalogContext,
	type CatalogContextValue,
} from "../context/Catalog.context";

export function useCatalogContext<T>(): CatalogContextValue<T> {
	const context = useContext(CatalogContext);

	if (!context) {
		throw new Error(
			"useCatalogContext must be used within a <Catalog> provider",
		);
	}

	return context as CatalogContextValue<T>;
}
