import type { ComponentPropsWithoutRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuSubProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Sub
>;

export const DropdownMenuSub = (props: DropdownMenuSubProps) => {
	return <RadixDropdownMenu.Sub {...props} />;
};

DropdownMenuSub.displayName = "DropdownMenu.Sub";
