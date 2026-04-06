import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuItemProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Item
>;

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
	(props, ref) => {
		return <RadixContextMenu.Item ref={ref} {...props} />;
	},
);

ContextMenuItem.displayName = "ContextMenu.Item";
