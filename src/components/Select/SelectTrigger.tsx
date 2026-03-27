import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectTriggerProps = ComponentPropsWithoutRef<
	typeof RadixSelect.Trigger
>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
	(props, ref) => {
		return <RadixSelect.Trigger ref={ref} {...props} />;
	},
);

SelectTrigger.displayName = "Select.Trigger";
