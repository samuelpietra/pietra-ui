import type { ComponentPropsWithoutRef } from "react";
import { Popover as RadixPopover } from "@radix-ui/themes";

export type PopoverRootProps = ComponentPropsWithoutRef<
	typeof RadixPopover.Root
>;

export const PopoverRoot = (props: PopoverRootProps) => {
	return <RadixPopover.Root {...props} />;
};

PopoverRoot.displayName = "Popover.Root";
