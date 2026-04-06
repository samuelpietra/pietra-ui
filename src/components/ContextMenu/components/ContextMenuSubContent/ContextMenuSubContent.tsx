import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuSubContentProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.SubContent
>;

export const ContextMenuSubContent = forwardRef<
	HTMLDivElement,
	ContextMenuSubContentProps
>((props, ref) => {
	return <RadixContextMenu.SubContent ref={ref} {...props} />;
});

ContextMenuSubContent.displayName = "ContextMenu.SubContent";
