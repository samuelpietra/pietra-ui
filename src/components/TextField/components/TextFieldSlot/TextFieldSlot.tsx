import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";

export type TextFieldSlotProps = ComponentPropsWithoutRef<
	typeof RadixTextField.Slot
>;

export const TextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(
	(props, ref) => {
		return <RadixTextField.Slot ref={ref} {...props} />;
	},
);

TextFieldSlot.displayName = "TextField.Slot";
