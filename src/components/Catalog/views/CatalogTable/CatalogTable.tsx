import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { Table } from "lucide-react";

import { Checkbox, DataTable, type DataTableColumn } from "@/components";

import type { CatalogDescriptorField } from "../../Catalog.types";
import { renderFieldContent } from "../../Catalog.utils";
import { CatalogView, RowCheckbox } from "../../components";
import { useCatalogContext, useCatalogSelection } from "../../hooks";

export type CatalogTableProps = {
	ariaLabel?: string;
	defaultView?: boolean;
	hoverable?: boolean;
	noDataMessage?: ReactNode;
	rowHeight?: number;
	striped?: boolean;
};

function fieldToColumn<T>(
	// biome-ignore lint/suspicious/noExplicitAny: fields hold mixed K types from the field system
	field: CatalogDescriptorField<T, any>,
): DataTableColumn<T> {
	const { comparator } = field;

	return {
		id: field.id,
		header: field.label,
		cell: (item) => renderFieldContent(field as never, item),
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

export function CatalogTable({
	ariaLabel = "Catalog",
	defaultView,
	hoverable,
	noDataMessage,
	rowHeight,
	striped,
}: CatalogTableProps) {
	const { collection, fields, selectable, sort, setSort } = useCatalogContext();

	const { isSelected, toggleItem } = useCatalogSelection();

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
		(item: unknown) => toggleItem(item),
		[toggleItem],
	);

	const rowClassName = useCallback(
		(item: unknown) => {
			if (!selectable) return undefined;
			return isSelected(item) ? "pietra-catalog-table-row-selected" : undefined;
		},
		[selectable, isSelected],
	);

	return (
		<CatalogView
			id="table"
			label="Table"
			icon={Table}
			defaultView={defaultView}
		>
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
		</CatalogView>
	);
}

CatalogTable.displayName = "CatalogTable";
