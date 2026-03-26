import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuTriggerIconProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.TriggerIcon
>;

export const DropdownMenuTriggerIcon = forwardRef<
	HTMLSpanElement,
	DropdownMenuTriggerIconProps
>((props, ref) => {
	return <RadixDropdownMenu.TriggerIcon ref={ref} {...props} />;
});

DropdownMenuTriggerIcon.displayName = "DropdownMenu.TriggerIcon";
