import type { ReactNode } from "react";

export type CatalogGridToolbarProps = {
	children: ReactNode;
};

CatalogGridToolbar.displayName = "CatalogGridToolbar";

export function CatalogGridToolbar({ children }: CatalogGridToolbarProps) {
	return (
		<div
			role="toolbar"
			aria-label="Card actions"
			className="pietra-catalog-grid-card-toolbar"
			onClick={(event) => event.stopPropagation()}
			onKeyDown={(event) => event.stopPropagation()}
		>
			{children}
		</div>
	);
}
