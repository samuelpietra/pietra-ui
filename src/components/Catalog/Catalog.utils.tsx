import type { ReactNode } from "react";

import type { CatalogField, FieldMapper } from "./Catalog.types";

export type ResolvedField = {
	value: (item: unknown) => unknown;
	render?: (value: unknown, item: unknown) => ReactNode;
	onClick?: (item: unknown) => void;
};

// biome-ignore lint/suspicious/noExplicitAny: identity bridge for FieldMapper factory calls
function identity(field: CatalogField<any, any>) {
	return field;
}

export function resolveMapper(
	// biome-ignore lint/suspicious/noExplicitAny: T is inferred at the consumer call site
	mapper: FieldMapper<any>,
	// biome-ignore lint/suspicious/noExplicitAny: fields array holds mixed K types
	fields: CatalogField<any, any>[],
): ResolvedField {
	if (typeof mapper === "string") {
		const field = fields.find(
			(f) => f.type === "descriptor" && f.id === mapper,
		);

		if (!field) {
			throw new Error(
				`Catalog: field "${mapper}" not found. Make sure it matches a descriptor field id.`,
			);
		}

		return field as unknown as ResolvedField;
	}

	// biome-ignore lint/suspicious/noExplicitAny: bridge between unknown context and consumer's T
	const field = mapper(fields as any, identity as any);
	return field as unknown as ResolvedField;
}

export function renderFieldContent(
	field: ResolvedField,
	item: unknown,
): ReactNode {
	const value = field.value(item);
	const content = field.render?.(value, item) ?? String(value);

	if (!field.onClick) return content;

	return (
		<button
			type="button"
			className="pietra-catalog-clickable-cell"
			onClick={(event) => {
				event.stopPropagation();
				field.onClick?.(item);
			}}
		>
			{content}
		</button>
	);
}
