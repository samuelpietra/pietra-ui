import { type ReactNode, useMemo } from "react";
import { List, useDynamicRowHeight } from "react-window";
import { List as ListIcon } from "lucide-react";

import type { AnyFieldMapper } from "../../Catalog.types";
import { CatalogView } from "../../components";
import {
	useCatalogContext,
	useCatalogSelection,
	useResolvedFields,
	useSortedCollection,
} from "../../hooks";
import { CatalogListRow, type CatalogListRowProps } from "./components";

import "./CatalogList.css";

const DEFAULT_ROW_HEIGHT = 100;

export type CatalogListProps = {
	defaultView?: boolean;
	titleField: AnyFieldMapper;
	subtitleField?: AnyFieldMapper;
	descriptionField?: AnyFieldMapper;
	previewField?: AnyFieldMapper;
	footerField?: AnyFieldMapper;
	noDataMessage?: ReactNode;
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
				<div className="pietra-catalog-list-empty">{noDataMessage}</div>
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
				}}
			/>
		</CatalogView>
	);
}

CatalogList.displayName = "CatalogList";
