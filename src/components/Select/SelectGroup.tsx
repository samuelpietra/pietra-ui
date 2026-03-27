import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectGroupProps = ComponentPropsWithoutRef<
	typeof RadixSelect.Group
>;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
	(props, ref) => {
		return <RadixSelect.Group ref={ref} {...props} />;
	},
);

SelectGroup.displayName = "Select.Group";
