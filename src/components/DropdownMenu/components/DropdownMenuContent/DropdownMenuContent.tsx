import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Content
>;

export const DropdownMenuContent = forwardRef<
	HTMLDivElement,
	DropdownMenuContentProps
>((props, ref) => {
	return <RadixDropdownMenu.Content ref={ref} {...props} />;
});

DropdownMenuContent.displayName = "DropdownMenu.Content";
