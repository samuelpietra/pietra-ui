import { forwardRef, type ReactNode } from "react";

import { ComboboxRootInner } from "./components/ComboboxRootInner";

export type ComboboxValue<T> = T | T[];

export type ComboboxRootProps<T = unknown> = {
	/** The list of selectable options. */
	options: T[];
	/** Controlled selected value. Pass with `onChange` for controlled mode. */
	value?: ComboboxValue<T>;
	/** Initial value for uncontrolled mode. */
	defaultValue?: ComboboxValue<T>;
	/** Called when the selected value changes. */
	onChange?: (value: ComboboxValue<T> | null) => void;
	/** When true, allows selecting multiple options. */
	multiple?: boolean;
	/** When true, shows a "Create" option when no match is found. Requires `onCreateOption`. */
	allowCreate?: boolean;
	/** Called to create a new option from user input. Must return the created option. */
	onCreateOption?: (inputValue: string) => T;
	/** Custom filter function. Overrides the default label-based substring match. */
	filter?: (option: T, inputValue: string) => boolean;
	/** Returns the display label for an option. Defaults to `String(option)`. */
	getOptionLabel?: (option: T) => string;
	/** Returns the unique value key for an option. Defaults to `String(option)`. */
	getOptionValue?: (option: T) => string;
	/** When true, disables all interaction. */
	disabled?: boolean;
	children: ReactNode;
};

// Cast required: forwardRef erases generic T — this restores the generic signature for consumers
export const ComboboxRoot = forwardRef<HTMLDivElement, ComboboxRootProps>(
	(props, ref) => <ComboboxRootInner {...props} ref={ref} />,
) as <T>(
	props: ComboboxRootProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

(ComboboxRoot as { displayName?: string }).displayName = "Combobox.Root";
