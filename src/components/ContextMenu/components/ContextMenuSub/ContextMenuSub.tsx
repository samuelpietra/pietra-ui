import type { ComponentPropsWithoutRef } from "react";
import { ContextMenu as RadixContextMenu } from "@radix-ui/themes";

export type ContextMenuSubProps = ComponentPropsWithoutRef<
	typeof RadixContextMenu.Sub
>;

export const ContextMenuSub = (props: ContextMenuSubProps) => {
	return <RadixContextMenu.Sub {...props} />;
};

ContextMenuSub.displayName = "ContextMenu.Sub";
