import { forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.RadioItem
>;

export const DropdownMenuRadioItem = forwardRef<
	HTMLDivElement,
	DropdownMenuRadioItemProps
>((props, ref) => {
	return <RadixDropdownMenu.RadioItem ref={ref} {...props} />;
});

DropdownMenuRadioItem.displayName = "DropdownMenu.RadioItem";
