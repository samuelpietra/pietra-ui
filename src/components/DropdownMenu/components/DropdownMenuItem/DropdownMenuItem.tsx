import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuItemProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Item
>;

export const DropdownMenuItem = forwardRef<
	HTMLDivElement,
	DropdownMenuItemProps
>((props, ref) => {
	return <RadixDropdownMenu.Item ref={ref} {...props} />;
});

DropdownMenuItem.displayName = "DropdownMenu.Item";
