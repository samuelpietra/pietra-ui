import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Popover as RadixPopover } from "@radix-ui/themes";

export type PopoverTriggerProps = ComponentPropsWithoutRef<
	typeof RadixPopover.Trigger
>;

export const PopoverTrigger = forwardRef<
	HTMLButtonElement,
	PopoverTriggerProps
>((props, ref) => {
	return <RadixPopover.Trigger ref={ref} {...props} />;
});

PopoverTrigger.displayName = "Popover.Trigger";
