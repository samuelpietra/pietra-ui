import { useCallback, useMemo } from "react";

import { useCatalogContext } from "./useCatalogContext";

export function useCatalogSelection<T = unknown>() {
	const { collection, getItemId, selectable, selectedItems, setSelectedItems } =
		useCatalogContext<T>();

	const selectedIds = useMemo(
		() =>
			selectable ? new Set(selectedItems.map(getItemId)) : new Set<string>(),
		[selectable, selectedItems, getItemId],
	);

	const isSelected = useCallback(
		(item: T) => selectedIds.has(getItemId(item)),
		[selectedIds, getItemId],
	);

	const { allSelected, someSelected } = useMemo(() => {
		if (!selectable || collection.length === 0 || selectedIds.size === 0) {
			return { allSelected: false, someSelected: false };
		}

		const all = selectedIds.size === collection.length;

		return {
			allSelected: all,
			someSelected: !all,
		};
	}, [selectable, collection.length, selectedIds]);

	const toggleItem = useCallback(
		(item: T) => {
			const id = getItemId(item);

			setSelectedItems((prev) => {
				if (selectedIds.has(id)) {
					return prev.filter((i) => getItemId(i) !== id);
				}

				return [...prev, item];
			});
		},
		[getItemId, setSelectedItems, selectedIds],
	);

	const toggleAll = useCallback(() => {
		setSelectedItems(allSelected ? [] : [...collection]);
	}, [allSelected, collection, setSelectedItems]);

	return {
		allSelected,
		someSelected,
		isSelected,
		toggleItem,
		toggleAll,
	};
}
