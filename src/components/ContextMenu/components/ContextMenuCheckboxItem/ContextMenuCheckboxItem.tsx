import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.CheckboxItem
>;

export const ContextMenuCheckboxItem = forwardRef<
	HTMLDivElement,
	ContextMenuCheckboxItemProps
>((props, ref) => {
	return <RadixContextMenu.CheckboxItem ref={ref} {...props} />;
});

ContextMenuCheckboxItem.displayName = "ContextMenu.CheckboxItem";
