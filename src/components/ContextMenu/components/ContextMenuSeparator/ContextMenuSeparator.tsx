import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Separator
>;

export const ContextMenuSeparator = forwardRef<
	HTMLDivElement,
	ContextMenuSeparatorProps
>((props, ref) => {
	return <RadixContextMenu.Separator ref={ref} {...props} />;
});

ContextMenuSeparator.displayName = "ContextMenu.Separator";
