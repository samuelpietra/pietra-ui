import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectLabelProps = ComponentPropsWithoutRef<
	typeof RadixSelect.Label
>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
	(props, ref) => {
		return <RadixSelect.Label ref={ref} {...props} />;
	},
);

SelectLabel.displayName = "Select.Label";
