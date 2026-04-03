import { useCallback, useEffect, useMemo, useState } from "react";

import type { SortState } from "@/components/DataTable";

import type { CatalogIdentifierField, MapItemToFields } from "../Catalog.types";
import { identity } from "../Catalog.utils";
import type { CatalogContextValue, CatalogViewEntry } from "../context";

type UseCatalogStateOptions<T> = {
	collection: T[];
	mapItemToFields: MapItemToFields<T>;
	selectable: boolean;
};

export function useCatalogState<T>({
	collection,
	mapItemToFields,
	selectable,
}: UseCatalogStateOptions<T>): CatalogContextValue<T> {
	const fields = useMemo(() => mapItemToFields(identity), [mapItemToFields]);

	const getItemId = useMemo(() => {
		const identifierField = fields.find(
			(f): f is CatalogIdentifierField<T> => f.type === "identifier",
		);

		if (!identifierField) {
			throw new Error(
				'Catalog requires at least one field with type "identifier"',
			);
		}

		return identifierField.value;
	}, [fields]);

	const [selectedItems, setSelectedItems] = useState<T[]>([]);
	const [sort, setSort] = useState<SortState | undefined>(undefined);
	const [view, setView] = useState<string | undefined>(undefined);
	const [views, setViews] = useState<CatalogViewEntry[]>([]);

	const registerView = useCallback(
		(entry: CatalogViewEntry, isDefault: boolean) => {
			setViews((prev) => {
				if (prev.some((v) => v.id === entry.id)) return prev;

				return [...prev, entry];
			});

			setView((current) => {
				if (isDefault || current === undefined) return entry.id;

				return current;
			});
		},
		[],
	);

	useEffect(() => {
		setSelectedItems((prev) => {
			if (prev.length === 0) return prev;

			const collectionIds = new Set(collection.map(getItemId));
			const filtered = prev.filter((item) =>
				collectionIds.has(getItemId(item)),
			);

			if (filtered.length === prev.length) return prev;

			return filtered;
		});
	}, [collection, getItemId]);

	return useMemo(
		() => ({
			collection,
			fields,
			getItemId,
			selectable,
			selectedItems,
			setSelectedItems,
			sort,
			setSort,
			view,
			setView,
			views,
			registerView,
		}),
		[
			collection,
			fields,
			getItemId,
			selectable,
			selectedItems,
			sort,
			view,
			views,
			registerView,
		],
	);
}
