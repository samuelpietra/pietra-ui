import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.SubTrigger
>;

export const DropdownMenuSubTrigger = forwardRef<
	HTMLDivElement,
	DropdownMenuSubTriggerProps
>((props, ref) => {
	return <RadixDropdownMenu.SubTrigger ref={ref} {...props} />;
});

DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";
