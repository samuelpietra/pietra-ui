import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { RadioGroup as RadixRadioGroup } from "@radix-ui/themes";

export type RadioGroupItemProps = ComponentPropsWithoutRef<
	typeof RadixRadioGroup.Item
>;

export const RadioGroupItem = forwardRef<
	HTMLButtonElement,
	RadioGroupItemProps
>((props, ref) => {
	return <RadixRadioGroup.Item ref={ref} {...props} />;
});

RadioGroupItem.displayName = "RadioGroup.Item";
