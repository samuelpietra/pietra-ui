import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuLabelProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Label
>;

export const ContextMenuLabel = forwardRef<
	HTMLDivElement,
	ContextMenuLabelProps
>((props, ref) => {
	return <RadixContextMenu.Label ref={ref} {...props} />;
});

ContextMenuLabel.displayName = "ContextMenu.Label";
