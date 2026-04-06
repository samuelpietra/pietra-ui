import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectSeparatorProps = ComponentPropsWithoutRef<
	typeof RadixSelect.Separator
>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
	(props, ref) => {
		return <RadixSelect.Separator ref={ref} {...props} />;
	},
);

SelectSeparator.displayName = "Select.Separator";
