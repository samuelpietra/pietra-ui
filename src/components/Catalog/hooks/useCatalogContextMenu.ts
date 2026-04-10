import { useCallback } from "react";

import { useCatalogContext } from "./useCatalogContext";

export function useCatalogContextMenu() {
	const { setContextItem, renderContextMenu } = useCatalogContext();

	const onOpenChange = useCallback(
		(open: boolean) => {
			if (!open) setContextItem(null);
		},
		[setContextItem],
	);

	return {
		onContextMenu: setContextItem,
		onOpenChange,
		hasContextMenu: !!renderContextMenu,
	};
}
