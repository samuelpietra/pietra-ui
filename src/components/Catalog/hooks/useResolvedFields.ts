import { useMemo } from "react";

import type { AnyFieldMapper, CatalogField } from "../Catalog.types";
import { type ResolvedField, resolveMapper } from "../Catalog.utils";

export function useResolvedFields<
	T extends Record<string, AnyFieldMapper | undefined>,
>(
	mappers: T,
	// biome-ignore lint/suspicious/noExplicitAny: fields array holds mixed K types
	fields: CatalogField<any, any>[],
): {
	[K in keyof T]: T[K] extends AnyFieldMapper
		? ResolvedField
		: ResolvedField | undefined;
} {
	return useMemo(() => {
		const result: Record<string, ResolvedField | undefined> = {};

		for (const key of Object.keys(mappers)) {
			const mapper = mappers[key];
			result[key] = mapper ? resolveMapper(mapper, fields) : undefined;
		}

		// biome-ignore lint/suspicious/noExplicitAny: mapped type matches input shape
		return result as any;
	}, [mappers, fields]);
}
