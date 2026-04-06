import type { CSSProperties, ReactElement } from "react";

import { Card, Flex, Inset, Text } from "@/components";

import {
	type ResolvedField,
	renderFieldContent,
} from "../../../../Catalog.utils";
import { RowCheckbox } from "../../../../components";
import { CatalogGridToolbar } from "../CatalogGridToolbar";

export interface CatalogGridCardProps {
	data: unknown[];
	columnCount: number;
	isSelected: (item: unknown) => boolean;
	selectable: boolean;
	toggleItem: (item: unknown) => void;
	title: ResolvedField;
	preview?: ResolvedField;
	footer?: ResolvedField;
	onItemContextMenu?: (item: unknown) => void;
}

export function CatalogGridCard({
	columnIndex,
	rowIndex,
	style,
	data,
	columnCount,
	isSelected,
	selectable,
	toggleItem,
	title,
	preview,
	footer,
	onItemContextMenu,
}: {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
} & CatalogGridCardProps): ReactElement | null {
	const itemIndex = rowIndex * columnCount + columnIndex;

	if (itemIndex >= data.length) return null;

	const item = data[itemIndex];
	const selected = selectable && isSelected(item);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: onContextMenu tracks right-clicked item for Catalog context menu
		<div
			style={style}
			className="pietra-catalog-grid-cell"
			onContextMenu={
				onItemContextMenu ? () => onItemContextMenu(item) : undefined
			}
		>
			<Card
				role={selectable ? "option" : undefined}
				aria-selected={selectable ? selected : undefined}
				tabIndex={selectable ? 0 : undefined}
				className={[
					"pietra-catalog-grid-card",
					selected && "pietra-catalog-grid-card-selected",
				]
					.filter(Boolean)
					.join(" ")}
				onClick={selectable ? () => toggleItem(item) : undefined}
				onKeyDown={
					selectable
						? (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									toggleItem(item);
								}
							}
						: undefined
				}
			>
				{preview && (
					<Inset clip="padding-box" side="top">
						<div className="pietra-catalog-grid-card-preview">
							{renderFieldContent(preview, item)}
						</div>
					</Inset>
				)}
				{selectable && (
					<CatalogGridToolbar>
						<RowCheckbox item={item} />
					</CatalogGridToolbar>
				)}
				<Flex direction="column" gap="1" pt="2">
					<Text size="2" weight="medium" numberOfLines={1}>
						{renderFieldContent(title, item)}
					</Text>
					{footer && (
						<Flex gap="1" wrap="wrap">
							{renderFieldContent(footer, item)}
						</Flex>
					)}
				</Flex>
			</Card>
		</div>
	);
}

CatalogGridCard.displayName = "CatalogGridCard";
