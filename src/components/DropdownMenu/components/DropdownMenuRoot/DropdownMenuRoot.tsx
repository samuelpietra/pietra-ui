import type { ComponentPropsWithoutRef } from "react";
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuRootProps = ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Root
>;

export const DropdownMenuRoot = (props: DropdownMenuRootProps) => {
	return <RadixDropdownMenu.Root {...props} />;
};

DropdownMenuRoot.displayName = "DropdownMenu.Root";
