import { forwardRef, type ReactNode } from "react";
import { List } from "react-window";
import clsx from "clsx";

import { Box } from "@/components/Box";

import { useComboboxContext } from "../../context";

import "./ComboboxContent.css";

import { ComboboxEmpty } from "../ComboboxEmpty";
import {
	ComboboxOptionRow,
	type ComboboxOptionRowProps,
} from "./components/ComboboxOptionRow";

// Must match --pietra-combobox-item-height in ComboboxRootInner.css
const ITEM_HEIGHT = 32;
const MAX_VISIBLE_ITEMS = 5;

export interface ComboboxContentProps {
	className?: string;
	/** Fixed max height in pixels. Takes precedence over maxVisibleItems when set. */
	maxHeight?: number;
	/** Maximum number of visible items before scrolling. Defaults to 5. Ignored when maxHeight is set. */
	maxVisibleItems?: number;
	children?: ReactNode;
}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
	(
		{ className, maxHeight, maxVisibleItems = MAX_VISIBLE_ITEMS, children },
		ref,
	) => {
		const context = useComboboxContext();
		const {
			isOpen,
			filteredOptions,
			multiple,
			listboxId,
			getOptionValue,
			totalOptionsCount,
			setHighlightedIndex,
		} = context;

		if (!isOpen) return null;

		const contentClassName = clsx("pietra-combobox-content", className);

		if (children) {
			return (
				<Box
					ref={ref}
					id={listboxId}
					role="listbox"
					aria-multiselectable={multiple ? true : undefined}
					className={contentClassName}
					onMouseLeave={() => setHighlightedIndex(-1)}
					style={{
						maxHeight: maxHeight ?? maxVisibleItems * ITEM_HEIGHT,
						overflowY: "auto",
					}}
				>
					{children}
				</Box>
			);
		}

		if (totalOptionsCount === 0) {
			return (
				<Box
					ref={ref}
					id={listboxId}
					role="listbox"
					aria-multiselectable={multiple ? true : undefined}
					className={contentClassName}
				>
					<ComboboxEmpty />
				</Box>
			);
		}

		const listHeight = Math.min(
			totalOptionsCount * ITEM_HEIGHT,
			maxHeight ?? maxVisibleItems * ITEM_HEIGHT,
		);

		const shouldVirtualize = totalOptionsCount > maxVisibleItems;

		return (
			<Box
				ref={ref}
				id={listboxId}
				role="listbox"
				aria-multiselectable={multiple ? true : undefined}
				className={contentClassName}
				onMouseLeave={() => setHighlightedIndex(-1)}
				style={
					shouldVirtualize
						? undefined
						: { maxHeight: listHeight, overflowY: "auto" }
				}
			>
				{shouldVirtualize ? (
					<List<ComboboxOptionRowProps>
						rowCount={totalOptionsCount}
						rowHeight={ITEM_HEIGHT}
						rowProps={{ context }}
						style={{ height: listHeight, width: "100%" }}
						rowComponent={ComboboxOptionRow}
					/>
				) : (
					Array.from({ length: totalOptionsCount }, (_, index) => (
						<ComboboxOptionRow
							key={
								index < filteredOptions.length
									? getOptionValue(filteredOptions[index])
									: "__create__"
							}
							index={index}
							context={context}
						/>
					))
				)}
			</Box>
		);
	},
);

ComboboxContent.displayName = "Combobox.Content";
