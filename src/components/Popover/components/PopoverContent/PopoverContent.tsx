import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Popover as RadixPopover } from "@radix-ui/themes";

export type PopoverContentProps = ComponentPropsWithoutRef<
	typeof RadixPopover.Content
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
	(props, ref) => {
		return <RadixPopover.Content ref={ref} {...props} />;
	},
);

PopoverContent.displayName = "Popover.Content";
