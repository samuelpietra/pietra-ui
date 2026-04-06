import type { ComponentPropsWithoutRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuRootProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Root
>;

export const ContextMenuRoot = (props: ContextMenuRootProps) => {
	return <RadixContextMenu.Root {...props} />;
};

ContextMenuRoot.displayName = "ContextMenu.Root";
