import { useCallback, useId, useMemo, useState } from "react";

export function useComboboxNavigation() {
	const uniqueId = useId();
	const listboxId = `pietra-combobox-listbox-${uniqueId}`;

	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const getOptionId = useCallback(
		(index: number) => `${listboxId}-option-${index}`,
		[listboxId],
	);

	return useMemo(
		() => ({
			isOpen,
			setIsOpen,
			highlightedIndex,
			setHighlightedIndex,
			listboxId,
			getOptionId,
		}),
		[isOpen, highlightedIndex, listboxId, getOptionId],
	);
}
