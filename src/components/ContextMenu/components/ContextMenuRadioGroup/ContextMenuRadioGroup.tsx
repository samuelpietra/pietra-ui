import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.RadioGroup
>;

export const ContextMenuRadioGroup = forwardRef<
	HTMLDivElement,
	ContextMenuRadioGroupProps
>((props, ref) => {
	return <RadixContextMenu.RadioGroup ref={ref} {...props} />;
});

ContextMenuRadioGroup.displayName = "ContextMenu.RadioGroup";
