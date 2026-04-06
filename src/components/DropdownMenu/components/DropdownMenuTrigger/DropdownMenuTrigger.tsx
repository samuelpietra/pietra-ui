import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Trigger
>;

export const DropdownMenuTrigger = forwardRef<
	HTMLButtonElement,
	DropdownMenuTriggerProps
>((props, ref) => {
	return <RadixDropdownMenu.Trigger ref={ref} {...props} />;
});

DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";
