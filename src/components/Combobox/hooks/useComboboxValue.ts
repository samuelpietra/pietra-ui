import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ComboboxValue } from "../components/ComboboxRoot";

interface UseComboboxValueOptions<T> {
	controlledValue?: ComboboxValue<T>;
	defaultValue?: ComboboxValue<T>;
	onChange?: (value: ComboboxValue<T> | null) => void;
	multiple: boolean;
	customGetOptionLabel?: (option: T) => string;
	customGetOptionValue?: (option: T) => string;
}

export function useComboboxValue<T>({
	controlledValue,
	defaultValue,
	onChange,
	multiple,
	customGetOptionLabel,
	customGetOptionValue,
}: UseComboboxValueOptions<T>) {
	const isControlled = controlledValue !== undefined;
	const wasControlled = useRef(isControlled);

	useEffect(() => {
		if (process.env.NODE_ENV === "production") return;

		if (wasControlled.current !== isControlled) {
			console.warn(
				"Combobox: switching between controlled and uncontrolled is not supported.",
			);
		}

		wasControlled.current = isControlled;
	}, [isControlled]);

	const getOptionLabel = useCallback(
		(option: T) =>
			customGetOptionLabel ? customGetOptionLabel(option) : String(option),
		[customGetOptionLabel],
	);

	const getOptionValue = useCallback(
		(option: T) =>
			customGetOptionValue ? customGetOptionValue(option) : String(option),
		[customGetOptionValue],
	);

	const [internalValue, setInternalValue] = useState<ComboboxValue<T> | null>(
		() => {
			if (defaultValue !== undefined) return defaultValue;
			return multiple ? [] : null;
		},
	);

	const value = isControlled ? (controlledValue ?? null) : internalValue;

	const selectedArray = useMemo(
		() => (multiple && Array.isArray(value) ? (value as T[]) : []),
		[multiple, value],
	);

	const hasValue = useMemo(
		() => (multiple ? selectedArray.length > 0 : value !== null),
		[multiple, selectedArray, value],
	);

	const isOptionSelected = useCallback(
		(option: T) => {
			if (multiple) {
				return selectedArray.some(
					(selected) => getOptionValue(selected) === getOptionValue(option),
				);
			}
			return (
				value !== null && getOptionValue(value as T) === getOptionValue(option)
			);
		},
		[multiple, selectedArray, value, getOptionValue],
	);

	const updateValue = useCallback(
		(newValue: ComboboxValue<T> | null) => {
			if (!isControlled) {
				setInternalValue(newValue);
			}

			if (onChange) {
				onChange(newValue);
			}
		},
		[isControlled, onChange],
	);

	return useMemo(
		() => ({
			value,
			selectedArray,
			hasValue,
			isOptionSelected,
			getOptionLabel,
			getOptionValue,
			updateValue,
		}),
		[
			value,
			selectedArray,
			hasValue,
			isOptionSelected,
			getOptionLabel,
			getOptionValue,
			updateValue,
		],
	);
}
