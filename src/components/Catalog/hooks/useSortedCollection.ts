import { useMemo } from "react";

import type { SortState } from "@/components/DataTable";

import type { CatalogField } from "../Catalog.types";

export function useSortedCollection(
	collection: unknown[],
	// biome-ignore lint/suspicious/noExplicitAny: fields hold mixed T and K types from the field system
	fields: CatalogField<any, any>[],
	sort: SortState | undefined,
): unknown[] {
	return useMemo(() => {
		if (!sort) return collection;

		const field = fields.find(
			(f) => f.type === "descriptor" && f.id === sort.columnId,
		);

		if (!field || field.type !== "descriptor") return collection;
		if (!field.comparator) return collection;

		const { comparator, value } = field;
		const dir = sort.direction === "asc" ? 1 : -1;

		return [...collection].sort((a, b) => dir * comparator(value(a), value(b)));
	}, [collection, fields, sort]);
}
