import { forwardRef, type ReactNode } from "react";
import clsx from "clsx";

import { Box } from "@/components/Box";

import { useComboboxContext } from "../../context";

import "./ComboboxItem.css";

export interface ComboboxItemProps<T = unknown> {
	/** The option object this item represents. */
	option: T;
	/** Position index within the flattened option list. Required for keyboard navigation. */
	index: number;
	className?: string;
	/** Custom content. Defaults to `getOptionLabel(option)`. */
	children?: ReactNode;
}

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
	({ option, index, className, children }, ref) => {
		const {
			highlightedIndex,
			setHighlightedIndex,
			selectOption,
			getOptionLabel,
			getOptionValue,
			getOptionId,
			isOptionSelected,
			filteredOptions,
		} = useComboboxContext();

		const isVisible = filteredOptions.some(
			(o) => getOptionValue(o) === getOptionValue(option),
		);

		if (!isVisible) return null;

		const isHighlighted = index === highlightedIndex;
		const isSelected = isOptionSelected(option);

		const classNames = clsx(
			"pietra-combobox-item",
			isHighlighted && "pietra-combobox-item-highlighted",
			isSelected && "pietra-combobox-item-selected",
			className,
		);

		return (
			<Box
				ref={ref}
				id={getOptionId(index)}
				role="option"
				aria-selected={isSelected}
				tabIndex={-1}
				className={classNames}
				onMouseEnter={() => setHighlightedIndex(index)}
				onMouseDown={(event) => event.preventDefault()}
				onClick={() => selectOption(option)}
			>
				{children ?? getOptionLabel(option)}
			</Box>
		);
	},
);

ComboboxItem.displayName = "Combobox.Item";
