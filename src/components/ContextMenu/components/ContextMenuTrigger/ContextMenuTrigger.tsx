import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Trigger
>;

export const ContextMenuTrigger = forwardRef<
	HTMLSpanElement,
	ContextMenuTriggerProps
>((props, ref) => {
	return <RadixContextMenu.Trigger ref={ref} {...props} />;
});

ContextMenuTrigger.displayName = "ContextMenu.Trigger";
