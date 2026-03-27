import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectContentProps = ComponentPropsWithoutRef<
	typeof RadixSelect.Content
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
	(props, ref) => {
		return <RadixSelect.Content ref={ref} {...props} />;
	},
);

SelectContent.displayName = "Select.Content";
