import { useCallback, useEffect, useMemo, useState } from "react";

import type { SortState } from "@/components/DataTable";

import type {
	CatalogField,
	CatalogIdentifierField,
	MapItemToFields,
} from "../Catalog.types";
import type { CatalogContextValue, CatalogViewEntry } from "../context";

function identity<T, V extends keyof T>(field: CatalogField<T, V>) {
	return field;
}

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

			const collectionById = new Map(
				collection.map((item) => [getItemId(item), item]),
			);

			return prev.reduce<T[]>((acc, item) => {
				const fresh = collectionById.get(getItemId(item));

				if (fresh) acc.push(fresh);

				return acc;
			}, []);
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
