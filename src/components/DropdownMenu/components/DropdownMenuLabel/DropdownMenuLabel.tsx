import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Label
>;

export const DropdownMenuLabel = forwardRef<
	HTMLDivElement,
	DropdownMenuLabelProps
>((props, ref) => {
	return <RadixDropdownMenu.Label ref={ref} {...props} />;
});

DropdownMenuLabel.displayName = "DropdownMenu.Label";
