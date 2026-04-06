import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.RadioItem
>;

export const ContextMenuRadioItem = forwardRef<
	HTMLDivElement,
	ContextMenuRadioItemProps
>((props, ref) => {
	return <RadixContextMenu.RadioItem ref={ref} {...props} />;
});

ContextMenuRadioItem.displayName = "ContextMenu.RadioItem";
