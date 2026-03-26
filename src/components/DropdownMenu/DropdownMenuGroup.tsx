import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Group
>;

export const DropdownMenuGroup = forwardRef<
	HTMLDivElement,
	DropdownMenuGroupProps
>((props, ref) => {
	return <RadixDropdownMenu.Group ref={ref} {...props} />;
});

DropdownMenuGroup.displayName = "DropdownMenu.Group";
