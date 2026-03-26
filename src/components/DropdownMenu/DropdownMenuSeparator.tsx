import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Separator
>;

export const DropdownMenuSeparator = forwardRef<
	HTMLDivElement,
	DropdownMenuSeparatorProps
>((props, ref) => {
	return <RadixDropdownMenu.Separator ref={ref} {...props} />;
});

DropdownMenuSeparator.displayName = "DropdownMenu.Separator";
