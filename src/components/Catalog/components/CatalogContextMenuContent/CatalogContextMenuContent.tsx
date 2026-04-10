import { useCatalogContext } from "../../hooks";

export function CatalogContextMenuContent() {
	const { contextItem, selectedItems, renderContextMenu } = useCatalogContext();

	if (!contextItem || !renderContextMenu) return null;

	return renderContextMenu(contextItem, selectedItems);
}

CatalogContextMenuContent.displayName = "CatalogContextMenuContent";
