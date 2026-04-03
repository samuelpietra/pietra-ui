import type { CSSProperties, ReactElement } from "react";

import { Box, Flex, Text } from "@/components";

import {
	type ResolvedField,
	renderFieldContent,
} from "../../../../Catalog.utils";
import { RowCheckbox } from "../../../../components";

export interface CatalogListRowProps {
	data: unknown[];
	isSelected: (item: unknown) => boolean;
	selectable: boolean;
	toggleItem: (item: unknown) => void;
	title: ResolvedField;
	subtitle?: ResolvedField;
	description?: ResolvedField;
	preview?: ResolvedField;
	footer?: ResolvedField;
}

export function CatalogListRow({
	index,
	style,
	data,
	isSelected,
	selectable,
	toggleItem,
	title,
	subtitle,
	description,
	preview,
	footer,
}: {
	index: number;
	style: CSSProperties;
} & CatalogListRowProps): ReactElement {
	const item = data[index];
	const selected = selectable && isSelected(item);

	return (
		// biome-ignore lint/a11y/useAriaPropsSupportedByRole: aria-selected is valid when role="option" (dynamic)
		<li
			style={style}
			role={selectable ? "option" : undefined}
			aria-selected={selectable ? selected : undefined}
			className={[
				"pietra-catalog-list-row",
				selected && "pietra-catalog-list-row-selected",
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
			tabIndex={selectable ? 0 : undefined}
		>
			{selectable && <RowCheckbox item={item} />}
			{preview && <Box flexShrink="0">{renderFieldContent(preview, item)}</Box>}
			<Flex
				direction="column"
				justify="between"
				flexGrow="1"
				minWidth="0"
				gap="1"
			>
				<Flex direction="column" minWidth="0">
					<Text size="2" weight="medium" numberOfLines={1}>
						{renderFieldContent(title, item)}
					</Text>
					{subtitle && (
						<Text size="1" color="gray" numberOfLines={1}>
							{renderFieldContent(subtitle, item)}
						</Text>
					)}
				</Flex>
				{description && (
					<Text size="1" color="gray" numberOfLines={2}>
						{renderFieldContent(description, item)}
					</Text>
				)}
				{footer && (
					<Flex gap="1" wrap="wrap">
						{renderFieldContent(footer, item)}
					</Flex>
				)}
			</Flex>
		</li>
	);
}
