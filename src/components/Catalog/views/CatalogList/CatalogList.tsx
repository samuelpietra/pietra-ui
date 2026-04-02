import { type ReactNode, useMemo } from "react";
import { List, useDynamicRowHeight } from "react-window";
import { List as ListIcon } from "lucide-react";

import type { AnyFieldMapper } from "../../Catalog.types";
import type { ResolvedField } from "../../Catalog.utils";
import { CatalogView } from "../../components";
import {
	useCatalogContext,
	useCatalogSelection,
	useResolvedFields,
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
	const dynamicRowHeight = useDynamicRowHeight({
		defaultRowHeight: rowHeight,
	});

	const sorted = useMemo(() => {
		if (!sort) return collection;

		const field = fields.find(
			(f) => f.type === "descriptor" && f.id === sort.columnId,
		) as unknown as ResolvedField | undefined;

		if (!field?.value) return collection;

		const comparator = (
			field as unknown as {
				comparator?: (a: unknown, b: unknown) => number;
			}
		).comparator;

		if (!comparator) return collection;

		const dir = sort.direction === "asc" ? 1 : -1;

		return [...collection].sort(
			(a, b) => dir * comparator(field.value(a), field.value(b)),
		);
	}, [collection, fields, sort]);

	const {
		titleField: title,
		subtitleField: subtitle,
		descriptionField: description,
		previewField: preview,
		footerField: footer,
	} = useResolvedFields(
		{
			titleField,
			subtitleField,
			descriptionField,
			previewField,
			footerField,
		},
		fields,
	);

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
				role="list"
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
