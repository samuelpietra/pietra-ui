import { type CSSProperties, memo, useCallback } from "react";
import clsx from "clsx";

import { Box, Text } from "@/components";

import type { ComboboxContextValue } from "../../../../context";

export interface ComboboxOptionRowProps {
	context: ComboboxContextValue;
}

function ComboboxOptionRowInner({
	index,
	style,
	context,
}: {
	index: number;
	style?: CSSProperties;
} & ComboboxOptionRowProps) {
	const {
		filteredOptions,
		highlightedIndex,
		setHighlightedIndex,
		selectOption,
		getOptionLabel,
		inputValue,
		getOptionId,
		createOption,
		isOptionSelected,
		hasCreateOption,
	} = context;

	const isCreateItem = hasCreateOption && index === filteredOptions.length;
	const option = isCreateItem ? null : filteredOptions[index];
	const isHighlighted = index === highlightedIndex;

	const selected = option ? isOptionSelected(option) : false;

	const label = isCreateItem
		? `Create "${inputValue}"`
		: getOptionLabel(filteredOptions[index]);

	const classNames = clsx(
		"pietra-combobox-item",
		isHighlighted && "pietra-combobox-item-highlighted",
		selected && "pietra-combobox-item-selected",
		isCreateItem && "pietra-combobox-item-create",
	);

	const handleClick = useCallback(() => {
		if (isCreateItem) {
			createOption(inputValue);
			return;
		}

		if (option) {
			selectOption(option);
		}
	}, [isCreateItem, createOption, inputValue, option, selectOption]);

	return (
		<Box
			id={getOptionId(index)}
			role="option"
			aria-selected={selected}
			tabIndex={-1}
			className={classNames}
			style={style}
			onMouseEnter={() => setHighlightedIndex(index)}
			onMouseDown={(event) => event.preventDefault()}
			onClick={handleClick}
		>
			<Text className="pietra-combobox-item-text">{label}</Text>
		</Box>
	);
}

// Cast required: memo returns MemoExoticComponent but react-window expects (props) => ReactElement | null
export const ComboboxOptionRow = memo(
	ComboboxOptionRowInner,
) as unknown as typeof ComboboxOptionRowInner;
