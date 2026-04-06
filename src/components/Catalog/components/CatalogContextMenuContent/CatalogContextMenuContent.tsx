import type { ReactNode } from "react";

import { useCatalogContext } from "../../hooks";

export function CatalogContextMenuContent(): ReactNode {
	const { contextItem, selectedItems, renderContextMenu } = useCatalogContext();

	if (!contextItem || !renderContextMenu) return null;

	return renderContextMenu(contextItem, selectedItems);
}

CatalogContextMenuContent.displayName = "CatalogContextMenuContent";
