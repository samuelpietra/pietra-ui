import type { ReactNode } from "react";

export type CatalogGridToolbarProps = {
	children: ReactNode;
	ariaLabel?: string;
};

CatalogGridToolbar.displayName = "CatalogGridToolbar";

export function CatalogGridToolbar({
	children,
	ariaLabel = "Card actions",
}: CatalogGridToolbarProps) {
	return (
		<div
			role="toolbar"
			aria-label={ariaLabel}
			className="pietra-catalog-grid-card-toolbar"
			onClick={(event) => event.stopPropagation()}
			onKeyDown={(event) => event.stopPropagation()}
		>
			{children}
		</div>
	);
}
