import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Popover as RadixPopover } from "@radix-ui/themes";

export type PopoverCloseProps = ComponentPropsWithoutRef<
	typeof RadixPopover.Close
>;

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
	(props, ref) => {
		return <RadixPopover.Close ref={ref} {...props} />;
	},
);

PopoverClose.displayName = "Popover.Close";
