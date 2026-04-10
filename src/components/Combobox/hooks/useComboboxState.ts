import { useCallback, useMemo } from "react";

import type { ComboboxRootProps } from "../components/ComboboxRoot";
import type { ComboboxContextValue } from "../context";
import { useComboboxNavigation } from "./useComboboxNavigation";
import { useComboboxSearch } from "./useComboboxSearch";
import { useComboboxValue } from "./useComboboxValue";

type UseComboboxStateOptions<T> = Omit<ComboboxRootProps<T>, "children">;

export function useComboboxState<T>({
	options,
	value: controlledValue,
	defaultValue,
	onChange,
	multiple = false,
	allowCreate = false,
	onCreateOption,
	filter: customFilter,
	getOptionLabel: customGetOptionLabel,
	getOptionValue: customGetOptionValue,
	disabled = false,
}: UseComboboxStateOptions<T>): ComboboxContextValue<T> {
	const {
		updateValue,
		value,
		selectedArray,
		hasValue,
		isOptionSelected,
		getOptionLabel,
		getOptionValue,
	} = useComboboxValue({
		controlledValue,
		defaultValue,
		onChange,
		multiple,
		customGetOptionLabel,
		customGetOptionValue,
	});

	const {
		inputValue,
		setInputValue,
		filteredOptions,
		hasCreateOption,
		totalOptionsCount,
	} = useComboboxSearch({
		options,
		allowCreate,
		customFilter,
		getOptionLabel,
		multiple,
		value: value as T | null,
	});

	const {
		isOpen,
		setIsOpen,
		highlightedIndex,
		setHighlightedIndex,
		listboxId,
		getOptionId,
	} = useComboboxNavigation();

	const selectOption = useCallback(
		(option: T) => {
			if (disabled) return;

			if (multiple) {
				const optionVal = getOptionValue(option);
				const exists = selectedArray.some(
					(selected) => getOptionValue(selected) === optionVal,
				);

				if (exists) {
					const next = selectedArray.filter(
						(selected) => getOptionValue(selected) !== optionVal,
					);
					updateValue(next);
				} else {
					updateValue([...selectedArray, option]);
				}
				setInputValue("");
			} else {
				updateValue(option);
				setInputValue(getOptionLabel(option));
				setIsOpen(false);
			}
			setHighlightedIndex(-1);
		},
		[
			disabled,
			multiple,
			selectedArray,
			getOptionValue,
			getOptionLabel,
			updateValue,
			setInputValue,
			setIsOpen,
			setHighlightedIndex,
		],
	);

	const removeOption = useCallback(
		(option: T) => {
			if (disabled) return;

			if (multiple) {
				const optionVal = getOptionValue(option);
				const next = selectedArray.filter(
					(selected) => getOptionValue(selected) !== optionVal,
				);
				updateValue(next);
			} else {
				updateValue(null);
				setInputValue("");
			}
		},
		[
			disabled,
			multiple,
			selectedArray,
			getOptionValue,
			updateValue,
			setInputValue,
		],
	);

	const clearAll = useCallback(() => {
		if (disabled) return;
		updateValue(multiple ? [] : null);
		setInputValue("");
	}, [disabled, multiple, updateValue, setInputValue]);

	const setOpen = useCallback(
		(open: boolean) => {
			if (disabled && open) return;
			setIsOpen(open);

			if (open && !multiple) {
				setInputValue("");
			}
			if (!open) {
				setHighlightedIndex(-1);
				if (!multiple && value !== null) {
					setInputValue(getOptionLabel(value as T));
				}
			}
		},
		[
			disabled,
			multiple,
			value,
			getOptionLabel,
			setIsOpen,
			setInputValue,
			setHighlightedIndex,
		],
	);

	const createOption = useCallback(
		(input: string) => {
			if (!onCreateOption || !input) return;
			const created = onCreateOption(input);
			selectOption(created);
		},
		[onCreateOption, selectOption],
	);

	return useMemo(
		() => ({
			value,
			selectedArray,
			hasValue,
			isOptionSelected,
			getOptionLabel,
			getOptionValue,
			inputValue,
			setInputValue,
			filteredOptions,
			hasCreateOption,
			totalOptionsCount,
			isOpen,
			highlightedIndex,
			setHighlightedIndex,
			listboxId,
			getOptionId,
			selectOption,
			removeOption,
			clearAll,
			setOpen,
			createOption,
			multiple,
			allowCreate,
			disabled,
		}),
		[
			value,
			selectedArray,
			hasValue,
			isOptionSelected,
			getOptionLabel,
			getOptionValue,
			inputValue,
			setInputValue,
			filteredOptions,
			hasCreateOption,
			totalOptionsCount,
			isOpen,
			highlightedIndex,
			setHighlightedIndex,
			listboxId,
			getOptionId,
			selectOption,
			removeOption,
			clearAll,
			setOpen,
			createOption,
			multiple,
			allowCreate,
			disabled,
		],
	);
}
