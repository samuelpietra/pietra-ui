import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuGroupProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Group
>;

export const ContextMenuGroup = forwardRef<
	HTMLDivElement,
	ContextMenuGroupProps
>((props, ref) => {
	return <RadixContextMenu.Group ref={ref} {...props} />;
});

ContextMenuGroup.displayName = "ContextMenu.Group";
