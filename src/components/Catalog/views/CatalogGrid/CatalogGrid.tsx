import { type ReactNode, useCallback, useMemo, useState } from "react";
import { Grid } from "react-window";
import { LayoutGrid } from "lucide-react";

import type { AnyFieldMapper } from "../../Catalog.types";
import { CatalogView } from "../../components";
import {
	useCatalogContext,
	useCatalogSelection,
	useResolvedFields,
	useSortedCollection,
} from "../../hooks";
import { CatalogGridCard, type CatalogGridCardProps } from "./components";

import "./CatalogGrid.css";

const DEFAULT_ROW_HEIGHT = 220;
const DEFAULT_MIN_COLUMN_WIDTH = 180;

export type CatalogGridProps = {
	defaultView?: boolean;
	titleField: AnyFieldMapper;
	previewField?: AnyFieldMapper;
	footerField?: AnyFieldMapper;
	noDataMessage?: ReactNode;
	minColumnWidth?: number;
	rowHeight?: number;
};

export function CatalogGrid({
	defaultView,
	titleField,
	previewField,
	footerField,
	noDataMessage,
	minColumnWidth = DEFAULT_MIN_COLUMN_WIDTH,
	rowHeight = DEFAULT_ROW_HEIGHT,
}: CatalogGridProps) {
	const { collection, fields, selectable, sort } = useCatalogContext();
	const { isSelected, toggleItem } = useCatalogSelection();
	const sorted = useSortedCollection(collection, fields, sort);
	const [columnCount, setColumnCount] = useState(3);

	const mappers = useMemo(
		() => ({ titleField, previewField, footerField }),
		[titleField, previewField, footerField],
	);

	const {
		titleField: title,
		previewField: preview,
		footerField: footer,
	} = useResolvedFields(mappers, fields);

	const handleResize = useCallback(
		(size: { width: number }) => {
			const count = Math.max(1, Math.floor(size.width / minColumnWidth));
			setColumnCount(count);
		},
		[minColumnWidth],
	);

	if (sorted.length === 0 && noDataMessage) {
		return (
			<CatalogView
				id="grid"
				label="Grid"
				icon={LayoutGrid}
				defaultView={defaultView}
			>
				<div className="pietra-catalog-grid-empty">{noDataMessage}</div>
			</CatalogView>
		);
	}

	const rowCount = Math.ceil(sorted.length / columnCount);

	return (
		<CatalogView
			id="grid"
			label="Grid"
			icon={LayoutGrid}
			defaultView={defaultView}
		>
			<Grid<CatalogGridCardProps>
				role={selectable ? "listbox" : "list"}
				columnCount={columnCount}
				columnWidth={`${100 / columnCount}%`}
				rowCount={rowCount}
				rowHeight={rowHeight}
				cellComponent={CatalogGridCard}
				cellProps={{
					data: sorted,
					columnCount,
					isSelected,
					selectable,
					toggleItem,
					title,
					preview,
					footer,
				}}
				onResize={handleResize}
			/>
		</CatalogView>
	);
}

CatalogGrid.displayName = "CatalogGrid";
