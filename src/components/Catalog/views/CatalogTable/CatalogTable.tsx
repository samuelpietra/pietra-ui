import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { Table } from "lucide-react";

import { Checkbox, DataTable, type DataTableColumn } from "@/components";

import "./CatalogTable.css";

import type { CatalogDescriptorField } from "../../Catalog.types";
import { renderFieldContent } from "../../Catalog.utils";
import {
	CatalogContextMenuWrapper,
	CatalogView,
	RowCheckbox,
} from "../../components";
import {
	useCatalogContext,
	useCatalogContextMenu,
	useCatalogSelection,
} from "../../hooks";

export type CatalogTableProps = {
	/** Accessible label for the table element. */
	ariaLabel?: string;
	/** Accessible label for the per-row selection checkbox. */
	selectRowLabel?: string;
	/** Accessible label for the select-all checkbox in the header. */
	selectAllLabel?: string;
	/** Marks this as the initially visible view. */
	defaultView?: boolean;
	/** Highlights rows on hover. */
	hoverable?: boolean;
	/** Content shown when the collection is empty. */
	noDataMessage?: ReactNode;
	/** Fixed row height in pixels. */
	rowHeight?: number;
	/** Alternates row background color. */
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

function SelectAllHeader({
	ariaLabel = "Select all rows",
}: {
	ariaLabel?: string;
}) {
	const { allSelected, someSelected, toggleAll } = useCatalogSelection();

	return (
		<Checkbox
			aria-label={ariaLabel}
			size="2"
			checked={someSelected ? "indeterminate" : allSelected}
			onCheckedChange={toggleAll}
		/>
	);
}

export function CatalogTable({
	ariaLabel = "Catalog",
	selectRowLabel,
	selectAllLabel,
	defaultView,
	hoverable,
	noDataMessage,
	rowHeight,
	striped,
}: CatalogTableProps) {
	const { collection, fields, selectable, sort, setSort } = useCatalogContext();
	const { isSelected, toggleItem } = useCatalogSelection();
	const { onContextMenu, hasContextMenu } = useCatalogContextMenu();
	const columns = useMemo(() => {
		const fieldColumns = fields
			.filter((f) => f.type !== "identifier")
			.map((field) => fieldToColumn(field));

		if (!selectable) return fieldColumns;

		const checkboxColumn: DataTableColumn<unknown> = {
			id: "__catalog-checkbox",
			header: <SelectAllHeader ariaLabel={selectAllLabel} />,
			width: 20,
			cell: (item) => <RowCheckbox item={item} ariaLabel={selectRowLabel} />,
		};

		return [checkboxColumn, ...fieldColumns];
	}, [fields, selectable, selectAllLabel, selectRowLabel]);

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
			<CatalogContextMenuWrapper>
				<DataTable
					ariaLabel={ariaLabel}
					columns={columns}
					data={collection}
					hoverable={hoverable}
					noDataMessage={noDataMessage}
					onRowClick={selectable ? toggleItem : undefined}
					onRowContextMenu={hasContextMenu ? onContextMenu : undefined}
					onSortChange={setSort}
					rowClassName={selectable ? rowClassName : undefined}
					rowHeight={rowHeight}
					sort={sort}
					striped={striped}
				/>
			</CatalogContextMenuWrapper>
		</CatalogView>
	);
}

CatalogTable.displayName = "CatalogTable";
