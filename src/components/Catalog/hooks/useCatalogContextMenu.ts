import { useCallback } from "react";

import { useCatalogContext } from "./useCatalogContext";

type UseCatalogContextMenuResult = {
	onContextMenu: (item: unknown) => void;
	onOpenChange: (open: boolean) => void;
	hasContextMenu: boolean;
};

export function useCatalogContextMenu(): UseCatalogContextMenuResult {
	const { setContextItem, renderContextMenu } = useCatalogContext();

	const onContextMenu = useCallback(
		(item: unknown) => {
			setContextItem(item);
		},
		[setContextItem],
	);

	const onOpenChange = useCallback(
		(open: boolean) => {
			if (!open) setContextItem(null);
		},
		[setContextItem],
	);

	return {
		onContextMenu,
		onOpenChange,
		hasContextMenu: !!renderContextMenu,
	};
}
