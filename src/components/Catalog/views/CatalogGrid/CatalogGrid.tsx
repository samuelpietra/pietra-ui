import { type ReactNode, useCallback, useMemo, useState } from "react";
import { Grid } from "react-window";
import { LayoutGrid } from "lucide-react";

import { Box } from "@/components/Box";

import type { AnyFieldMapper } from "../../Catalog.types";
import { CatalogContextMenuWrapper, CatalogView } from "../../components";
import {
	useCatalogContext,
	useCatalogContextMenu,
	useCatalogSelection,
	useResolvedFields,
	useSortedCollection,
} from "../../hooks";
import { CatalogGridCard, type CatalogGridCardProps } from "./components";

import "./CatalogGrid.css";

const DEFAULT_ROW_HEIGHT = 220;
const DEFAULT_MIN_COLUMN_WIDTH = 180;

export type CatalogGridProps = {
	/** Marks this as the initially visible view. */
	defaultView?: boolean;
	/** Field used as the card title. */
	titleField: AnyFieldMapper;
	/** Field rendered as the card's visual preview. */
	previewField?: AnyFieldMapper;
	/** Field rendered at the bottom of each card. */
	footerField?: AnyFieldMapper;
	/** Content shown when the collection is empty. */
	noDataMessage?: ReactNode;
	/** Minimum column width in pixels for the auto-fit grid. */
	minColumnWidth?: number;
	/** Fixed row height in pixels. */
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
	const { onContextMenu, hasContextMenu } = useCatalogContextMenu();
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
				<Box className="pietra-catalog-grid-empty">{noDataMessage}</Box>
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
			<CatalogContextMenuWrapper>
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
						onItemContextMenu: hasContextMenu ? onContextMenu : undefined,
					}}
					onResize={handleResize}
				/>
			</CatalogContextMenuWrapper>
		</CatalogView>
	);
}

CatalogGrid.displayName = "CatalogGrid";
