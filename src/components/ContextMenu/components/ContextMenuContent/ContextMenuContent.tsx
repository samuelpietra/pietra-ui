import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuContentProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Content
>;

export const ContextMenuContent = forwardRef<
	HTMLDivElement,
	ContextMenuContentProps
>((props, ref) => {
	return <RadixContextMenu.Content ref={ref} {...props} />;
});

ContextMenuContent.displayName = "ContextMenu.Content";
