import { type ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

import "./CatalogToolbar.css";

export const CatalogToolbar = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => (
	<div
		ref={ref}
		className={clsx("pietra-catalog-toolbar", className)}
		{...props}
	>
		{children}
	</div>
));

CatalogToolbar.displayName = "CatalogToolbar";
