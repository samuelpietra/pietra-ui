import { useEffect, useMemo, useState } from "react";

import type { SortState } from "../DataTable";

import "./Catalog.css";

import type {
	CatalogContextValue,
	CatalogField,
	CatalogIdentifierField,
	CatalogProps,
} from "./Catalog.types";
import { CatalogContext } from "./CatalogContext";

function identity<T, V extends keyof T>(field: CatalogField<T, V>) {
	return field;
}

export function Catalog<T>({
	children,
	collection,
	mapItemToFields,
	selectable = false,
}: CatalogProps<T>) {
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

	const contextValue = useMemo<CatalogContextValue<T>>(
		() => ({
			collection,
			fields,
			getItemId,
			selectable,
			selectedItems,
			setSelectedItems,
			sort,
			setSort,
		}),
		[collection, fields, getItemId, selectable, selectedItems, sort],
	);

	return (
		<CatalogContext.Provider value={contextValue as CatalogContextValue}>
			<div className="pietra-catalog">{children}</div>
		</CatalogContext.Provider>
	);
}

Catalog.displayName = "Catalog";
