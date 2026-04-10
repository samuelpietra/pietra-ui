import { type ReactNode, useMemo } from "react";
import { List, useDynamicRowHeight } from "react-window";
import { List as ListIcon } from "lucide-react";

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
import { CatalogListRow, type CatalogListRowProps } from "./components";

import "./CatalogList.css";

const DEFAULT_ROW_HEIGHT = 100;

export type CatalogListProps = {
	/** Marks this as the initially visible view. */
	defaultView?: boolean;
	/** Field used as the primary title. */
	titleField: AnyFieldMapper;
	/** Field rendered below the title. */
	subtitleField?: AnyFieldMapper;
	/** Field rendered as body text. */
	descriptionField?: AnyFieldMapper;
	/** Field rendered as a leading visual (avatar, thumbnail). */
	previewField?: AnyFieldMapper;
	/** Field rendered at the bottom of each row. */
	footerField?: AnyFieldMapper;
	/** Content shown when the collection is empty. */
	noDataMessage?: ReactNode;
	/** Fixed row height in pixels. */
	rowHeight?: number;
};

export function CatalogList({
	defaultView,
	titleField,
	subtitleField,
	descriptionField,
	previewField,
	footerField,
	noDataMessage,
	rowHeight = DEFAULT_ROW_HEIGHT,
}: CatalogListProps) {
	const { collection, fields, selectable, sort } = useCatalogContext();
	const { isSelected, toggleItem } = useCatalogSelection();
	const { onContextMenu, hasContextMenu } = useCatalogContextMenu();
	const sorted = useSortedCollection(collection, fields, sort);
	const dynamicRowHeight = useDynamicRowHeight({
		defaultRowHeight: rowHeight,
	});

	const mappers = useMemo(
		() => ({
			titleField,
			subtitleField,
			descriptionField,
			previewField,
			footerField,
		}),
		[titleField, subtitleField, descriptionField, previewField, footerField],
	);

	const {
		titleField: title,
		subtitleField: subtitle,
		descriptionField: description,
		previewField: preview,
		footerField: footer,
	} = useResolvedFields(mappers, fields);

	if (sorted.length === 0 && noDataMessage) {
		return (
			<CatalogView
				id="list"
				label="List"
				icon={ListIcon}
				defaultView={defaultView}
			>
				<Box className="pietra-catalog-list-empty">{noDataMessage}</Box>
			</CatalogView>
		);
	}

	return (
		<CatalogView
			id="list"
			label="List"
			icon={ListIcon}
			defaultView={defaultView}
		>
			<CatalogContextMenuWrapper>
				<List<CatalogListRowProps>
					className="pietra-catalog-list"
					role={selectable ? "listbox" : "list"}
					rowCount={sorted.length}
					rowHeight={dynamicRowHeight}
					rowComponent={CatalogListRow}
					rowProps={{
						data: sorted,
						isSelected,
						selectable,
						toggleItem,
						title,
						subtitle,
						description,
						preview,
						footer,
						onItemContextMenu: hasContextMenu ? onContextMenu : undefined,
					}}
				/>
			</CatalogContextMenuWrapper>
		</CatalogView>
	);
}

CatalogList.displayName = "CatalogList";
