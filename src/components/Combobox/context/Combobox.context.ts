import { createContext, useContext } from "react";

import type { ComboboxValue } from "../components/ComboboxRoot";

export type ComboboxContextValue<T = unknown> = {
	value: ComboboxValue<T> | null;
	selectedArray: T[];
	inputValue: string;
	isOpen: boolean;
	multiple: boolean;
	allowCreate: boolean;
	filteredOptions: T[];
	highlightedIndex: number;
	disabled: boolean;
	getOptionLabel: (option: T) => string;
	getOptionValue: (option: T) => string;
	selectOption: (option: T) => void;
	removeOption: (option: T) => void;
	clearAll: () => void;
	setInputValue: (value: string) => void;
	setOpen: (open: boolean) => void;
	setHighlightedIndex: (index: number) => void;
	createOption: (inputValue: string) => void;
	listboxId: string;
	getOptionId: (index: number) => string;
	hasCreateOption: boolean;
	totalOptionsCount: number;
	isOptionSelected: (option: T) => boolean;
	hasValue: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: generic erasure boundary — compound components can't preserve T through context
export const ComboboxContext = createContext<ComboboxContextValue<any> | null>(
	null,
);

/** Returns the Combobox context. Generic T is erased — consumers get `unknown` option types. */
export function useComboboxContext(): ComboboxContextValue {
	const context = useContext(ComboboxContext);
	if (!context) {
		throw new Error(
			"Combobox compound components must be used within a Combobox.Root",
		);
	}
	return context;
}
