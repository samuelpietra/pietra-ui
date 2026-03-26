import { forwardRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.SubContent
>;

export const DropdownMenuSubContent = forwardRef<
	HTMLDivElement,
	DropdownMenuSubContentProps
>((props, ref) => {
	return <RadixDropdownMenu.SubContent ref={ref} {...props} />;
});

DropdownMenuSubContent.displayName = "DropdownMenu.SubContent";
