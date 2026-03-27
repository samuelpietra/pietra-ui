import { SelectContent } from "./SelectContent";
import { SelectGroup } from "./SelectGroup";
import { SelectItem } from "./SelectItem";
import { SelectLabel } from "./SelectLabel";
import { SelectRoot } from "./SelectRoot";
import { SelectSeparator } from "./SelectSeparator";
import { SelectTrigger } from "./SelectTrigger";

export type { SelectContentProps } from "./SelectContent";
export type { SelectGroupProps } from "./SelectGroup";
export type { SelectItemProps } from "./SelectItem";
export type { SelectLabelProps } from "./SelectLabel";
export type { SelectRootProps } from "./SelectRoot";
export type { SelectSeparatorProps } from "./SelectSeparator";
export type { SelectTriggerProps } from "./SelectTrigger";

export const Select = {
	Root: SelectRoot,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Item: SelectItem,
	Group: SelectGroup,
	Label: SelectLabel,
	Separator: SelectSeparator,
};
