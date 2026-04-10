import { type KeyboardEvent, useCallback, useMemo, useRef } from "react";

import type { BadgeGroupItem } from "@/components/BadgeGroup";

import { useComboboxContext } from "../../../context";

export function useComboboxInput() {
	const {
		inputValue,
		setInputValue,
		isOpen,
		setOpen,
		multiple,
		selectedArray,
		filteredOptions,
		highlightedIndex,
		setHighlightedIndex,
		selectOption,
		removeOption,
		getOptionLabel,
		getOptionValue,
		allowCreate,
		createOption,
		listboxId,
		getOptionId,
		disabled,
		totalOptionsCount,
	} = useComboboxContext();

	const closingRef = useRef(false);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();
					if (!isOpen) {
						setOpen(true);
					}
					setHighlightedIndex(
						highlightedIndex < totalOptionsCount - 1 ? highlightedIndex + 1 : 0,
					);
					break;
				}
				case "ArrowUp": {
					event.preventDefault();
					if (!isOpen) {
						setOpen(true);
					}
					setHighlightedIndex(
						highlightedIndex > 0 ? highlightedIndex - 1 : totalOptionsCount - 1,
					);
					break;
				}
				case "Enter": {
					event.preventDefault();
					if (!isOpen || highlightedIndex < 0) break;

					if (highlightedIndex < filteredOptions.length) {
						selectOption(filteredOptions[highlightedIndex]);
						break;
					}
					if (allowCreate && highlightedIndex === filteredOptions.length) {
						createOption(inputValue);
					}
					break;
				}
				case "Escape": {
					event.preventDefault();
					setOpen(false);
					break;
				}
				case "Backspace": {
					if (multiple && inputValue === "" && selectedArray.length > 0) {
						removeOption(selectedArray[selectedArray.length - 1]);
					}
					break;
				}
				case "Tab": {
					closingRef.current = true;
					setOpen(false);
					break;
				}
				default:
					break;
			}
		},
		[
			isOpen,
			setOpen,
			highlightedIndex,
			setHighlightedIndex,
			totalOptionsCount,
			filteredOptions,
			selectOption,
			createOption,
			allowCreate,
			multiple,
			inputValue,
			selectedArray,
			removeOption,
		],
	);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(event.target.value);
			if (!isOpen) {
				setOpen(true);
			}
			setHighlightedIndex(-1);
		},
		[setInputValue, isOpen, setOpen, setHighlightedIndex],
	);

	const handleFocus = useCallback(() => {
		if (closingRef.current) {
			closingRef.current = false;
			return;
		}

		if (!disabled) {
			setOpen(true);
		}
	}, [disabled, setOpen]);

	const handleClick = useCallback(() => {
		if (!isOpen && !disabled) {
			setOpen(true);
		}
	}, [isOpen, disabled, setOpen]);

	const badgeItems: BadgeGroupItem[] = useMemo(
		() =>
			selectedArray.map((option) => ({
				id: String(getOptionValue(option)),
				size: "1" as const,
				variant: "soft" as const,
				onClose: () => removeOption(option),
				children: getOptionLabel(option),
			})),
		[selectedArray, getOptionValue, getOptionLabel, removeOption],
	);

	const inputProps = {
		value: inputValue,
		onChange: handleChange,
		onKeyDown: handleKeyDown,
		onFocus: handleFocus,
		onClick: handleClick,
		"aria-controls": isOpen ? listboxId : undefined,
		"aria-activedescendant":
			highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined,
		disabled,
	} as const;

	const resultLabel = totalOptionsCount === 1 ? "result" : "results";
	const statusMessage = isOpen
		? `${totalOptionsCount} ${resultLabel} available`
		: "";

	return {
		isOpen,
		multiple,
		selectedArray,
		badgeItems,
		inputProps,
		statusMessage,
	};
}
