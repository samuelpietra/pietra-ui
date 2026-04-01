import type { ReactNode } from "react";
import { useCallback, useMemo, useRef } from "react";

import { Checkbox } from "../Checkbox";
import { DataTable, type DataTableColumn } from "../DataTable";
import type {
	CatalogDescriptorField,
	CatalogTableProps,
} from "./Catalog.types";
import { useCatalogContext } from "./CatalogContext";
import { useCatalogSelection } from "./useCatalogSelection";

function wrapClickable<T>(
	content: ReactNode,
	// biome-ignore lint/suspicious/noExplicitAny: fields hold mixed K types from the field system
	field: CatalogDescriptorField<T, any>,
	item: T,
) {
	if (!field.onClick) return content;

	return (
		<button
			type="button"
			className="pietra-catalog-clickable-cell"
			onClick={(e) => {
				e.stopPropagation();
				field.onClick?.(item);
			}}
		>
			{content}
		</button>
	);
}

function fieldToColumn<T>(
	// biome-ignore lint/suspicious/noExplicitAny: fields hold mixed K types from the field system
	field: CatalogDescriptorField<T, any>,
): DataTableColumn<T> {
	const { comparator } = field;

	return {
		id: field.id,
		header: field.label,
		cell: (item) => {
			const value = field.value(item);
			return wrapClickable(
				field.render?.(value, item) ?? String(value),
				field,
				item,
			);
		},
		comparator: comparator
			? (a, b) => comparator(field.value(a), field.value(b))
			: undefined,
		align: field.align,
		width: field.width,
	};
}

function SelectAllHeader() {
	const { allSelected, someSelected, toggleAll } = useCatalogSelection();

	return (
		<Checkbox
			aria-label="Select all rows"
			size="2"
			checked={someSelected ? "indeterminate" : allSelected}
			onCheckedChange={toggleAll}
		/>
	);
}

function RowCheckbox({ item }: { item: unknown }) {
	const { getItemId, selectedItems, setSelectedItems } = useCatalogContext();
	const id = getItemId(item);
	const checked = selectedItems.some((s) => getItemId(s) === id);

	return (
		<Checkbox
			aria-label="Select row"
			size="2"
			checked={checked}
			onClick={(e) => e.stopPropagation()}
			onCheckedChange={() => {
				setSelectedItems((prev) => {
					const exists = prev.some((i) => getItemId(i) === id);
					if (exists) return prev.filter((i) => getItemId(i) !== id);
					return [...prev, item];
				});
			}}
		/>
	);
}

export function CatalogTable({
	ariaLabel = "Catalog",
	hoverable,
	noDataMessage,
	rowHeight,
	striped,
}: CatalogTableProps) {
	const { collection, fields, selectable, sort, setSort } = useCatalogContext();

	const { isSelected, toggleItem } = useCatalogSelection();
	const isSelectedRef = useRef(isSelected);
	isSelectedRef.current = isSelected;
	const toggleItemRef = useRef(toggleItem);
	toggleItemRef.current = toggleItem;

	const columns = useMemo(() => {
		const fieldColumns = fields
			.filter((f) => f.type !== "identifier")
			.map((field) => fieldToColumn(field));

		if (!selectable) return fieldColumns;

		const checkboxColumn: DataTableColumn<unknown> = {
			id: "__catalog-checkbox",
			header: <SelectAllHeader />,
			width: 20,
			cell: (item) => <RowCheckbox item={item} />,
		};

		return [checkboxColumn, ...fieldColumns];
	}, [fields, selectable]);

	const handleRowClick = useCallback(
		(item: unknown) => toggleItemRef.current(item),
		[],
	);

	const rowClassName = useCallback(
		(item: unknown) => {
			if (!selectable) return undefined;
			return isSelectedRef.current(item)
				? "pietra-catalog-row-selected"
				: undefined;
		},
		[selectable],
	);

	return (
		<DataTable
			ariaLabel={ariaLabel}
			columns={columns}
			data={collection}
			hoverable={hoverable}
			noDataMessage={noDataMessage}
			onRowClick={selectable ? handleRowClick : undefined}
			onSortChange={setSort}
			rowClassName={selectable ? rowClassName : undefined}
			rowHeight={rowHeight}
			sort={sort}
			striped={striped}
		/>
	);
}

CatalogTable.displayName = "CatalogTable";
