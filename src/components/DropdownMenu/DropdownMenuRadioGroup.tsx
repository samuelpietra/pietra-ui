import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.RadioGroup
>;

export const DropdownMenuRadioGroup = forwardRef<
	HTMLDivElement,
	DropdownMenuRadioGroupProps
>((props, ref) => {
	return <RadixDropdownMenu.RadioGroup ref={ref} {...props} />;
});

DropdownMenuRadioGroup.displayName = "DropdownMenu.RadioGroup";
