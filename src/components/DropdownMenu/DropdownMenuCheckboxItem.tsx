import { forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
	HTMLDivElement,
	DropdownMenuCheckboxItemProps
>((props, ref) => {
	return <RadixDropdownMenu.CheckboxItem ref={ref} {...props} />;
});

DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";
