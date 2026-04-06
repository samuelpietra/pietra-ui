import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.SubTrigger
>;

export const ContextMenuSubTrigger = forwardRef<
	HTMLDivElement,
	ContextMenuSubTriggerProps
>((props, ref) => {
	return <RadixContextMenu.SubTrigger ref={ref} {...props} />;
});

ContextMenuSubTrigger.displayName = "ContextMenu.SubTrigger";
