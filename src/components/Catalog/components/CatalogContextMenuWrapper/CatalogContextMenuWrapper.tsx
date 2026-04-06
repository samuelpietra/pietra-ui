import type { ReactNode } from "react";

import { ContextMenu } from "@/components/ContextMenu";

import { useCatalogContextMenu } from "../../hooks";
import { CatalogContextMenuContent } from "../CatalogContextMenuContent";

type CatalogContextMenuWrapperProps = {
	children: ReactNode;
};

export function CatalogContextMenuWrapper({
	children,
}: CatalogContextMenuWrapperProps): ReactNode {
	const { hasContextMenu, onOpenChange } = useCatalogContextMenu();

	if (!hasContextMenu) return children;

	// Each view sets contextItem via onContextMenu on individual rows/cards.
	// That state update and Radix's internal open state are batched by React 18
	// (same browser event), so CatalogContextMenuContent always sees the correct item.
	// The wrapper <div> is required because Radix ContextMenu.Trigger uses asChild
	// by default, and react-window / DataTable do not forward Radix's merged props.
	return (
		<ContextMenu.Root onOpenChange={onOpenChange}>
			<ContextMenu.Trigger>
				<div>{children}</div>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<CatalogContextMenuContent />
			</ContextMenu.Content>
		</ContextMenu.Root>
	);
}

CatalogContextMenuWrapper.displayName = "CatalogContextMenuWrapper";
