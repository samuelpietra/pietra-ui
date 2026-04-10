import {
	ComboboxClear,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxRoot,
	ComboboxSeparator,
	ComboboxTrigger,
} from "./components";

export type {
	ComboboxClearProps,
	ComboboxContentProps,
	ComboboxEmptyProps,
	ComboboxGroupProps,
	ComboboxInputProps,
	ComboboxItemProps,
	ComboboxRootProps,
	ComboboxSeparatorProps,
	ComboboxTriggerProps,
	ComboboxValue,
} from "./components";
export type { ComboboxContextValue } from "./context";
export { useComboboxContext } from "./context";

export const Combobox = {
	Root: ComboboxRoot,
	Input: ComboboxInput,
	Trigger: ComboboxTrigger,
	Content: ComboboxContent,
	Item: ComboboxItem,
	Empty: ComboboxEmpty,
	Group: ComboboxGroup,
	Separator: ComboboxSeparator,
	Clear: ComboboxClear,
};
