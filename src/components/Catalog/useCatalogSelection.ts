import { useCallback, useMemo } from "react";

import { useCatalogContext } from "./CatalogContext";

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
		if (!selectable || collection.length === 0) {
			return { allSelected: false, someSelected: false };
		}
		const all = collection.every(isSelected);
		return {
			allSelected: all,
			someSelected: !all && collection.some(isSelected),
		};
	}, [selectable, collection, isSelected]);

	const toggleItem = useCallback(
		(item: T) => {
			const id = getItemId(item);
			setSelectedItems((prev) => {
				const exists = prev.some((i) => getItemId(i) === id);
				if (exists) {
					return prev.filter((i) => getItemId(i) !== id);
				}
				return [...prev, item];
			});
		},
		[getItemId, setSelectedItems],
	);

	const toggleAll = useCallback(() => {
		if (allSelected) {
			setSelectedItems([]);
		} else {
			setSelectedItems([...collection]);
		}
	}, [allSelected, collection, setSelectedItems]);

	return {
		allSelected,
		someSelected,
		isSelected,
		toggleItem,
		toggleAll,
	};
}
