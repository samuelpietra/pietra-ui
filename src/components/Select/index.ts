import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectSeparator,
	SelectTrigger,
} from "./components";

export type {
	SelectContentProps,
	SelectGroupProps,
	SelectItemProps,
	SelectLabelProps,
	SelectRootProps,
	SelectSeparatorProps,
	SelectTriggerProps,
} from "./components";

export const Select = {
	Root: SelectRoot,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Item: SelectItem,
	Group: SelectGroup,
	Label: SelectLabel,
	Separator: SelectSeparator,
};
