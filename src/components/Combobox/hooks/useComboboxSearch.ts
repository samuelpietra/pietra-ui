import { useMemo, useState } from "react";

interface UseComboboxSearchOptions<T> {
	options: T[];
	allowCreate: boolean;
	customFilter?: (option: T, inputValue: string) => boolean;
	getOptionLabel: (option: T) => string;
	multiple: boolean;
	value: T | null;
}

export function useComboboxSearch<T>({
	options,
	allowCreate,
	customFilter,
	getOptionLabel,
	multiple,
	value,
}: UseComboboxSearchOptions<T>) {
	const [inputValue, setInputValue] = useState(() => {
		if (!multiple && value !== null && value !== undefined) {
			return getOptionLabel(value);
		}

		return "";
	});

	const filteredOptions = useMemo(() => {
		if (!inputValue) return options;

		return options.filter((option) => {
			if (customFilter) return customFilter(option, inputValue);

			return getOptionLabel(option)
				.toLowerCase()
				.includes(inputValue.toLowerCase());
		});
	}, [options, inputValue, customFilter, getOptionLabel]);

	const hasCreateOption = useMemo(
		() =>
			allowCreate &&
			inputValue.length > 0 &&
			filteredOptions.every(
				(option) =>
					getOptionLabel(option).toLowerCase() !== inputValue.toLowerCase(),
			),
		[allowCreate, inputValue, filteredOptions, getOptionLabel],
	);

	const totalOptionsCount = useMemo(
		() => filteredOptions.length + (hasCreateOption ? 1 : 0),
		[filteredOptions.length, hasCreateOption],
	);

	return useMemo(
		() => ({
			inputValue,
			setInputValue,
			filteredOptions,
			hasCreateOption,
			totalOptionsCount,
		}),
		[inputValue, filteredOptions, hasCreateOption, totalOptionsCount],
	);
}
