import { createContext, useContext } from "react";

import type { CatalogContextValue } from "./Catalog.types";

export const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalogContext<T>(): CatalogContextValue<T> {
	const context = useContext(CatalogContext);

	if (!context) {
		throw new Error(
			"useCatalogContext must be used within a <Catalog> provider",
		);
	}

	return context as CatalogContextValue<T>;
}
