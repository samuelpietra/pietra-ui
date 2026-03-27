import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
	(props, ref) => {
		return <RadixSelect.Item ref={ref} {...props} />;
	},
);

SelectItem.displayName = "Select.Item";
