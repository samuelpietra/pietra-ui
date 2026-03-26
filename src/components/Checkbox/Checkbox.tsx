import { forwardRef } from "react";
import {
	Checkbox as RadixCheckbox,
	type CheckboxProps as RadixCheckboxProps,
} from "@radix-ui/themes";

export type CheckboxProps = RadixCheckboxProps;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
	(props, ref) => {
		return <RadixCheckbox ref={ref} {...props} />;
	},
);

Checkbox.displayName = "Checkbox";
