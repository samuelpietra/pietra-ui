import { type ComponentPropsWithoutRef, forwardRef } from "react";

export const CatalogToolbar = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => (
	<div
		ref={ref}
		className={
			className
				? `pietra-catalog-toolbar ${className}`
				: "pietra-catalog-toolbar"
		}
		{...props}
	>
		{children}
	</div>
));

CatalogToolbar.displayName = "CatalogToolbar";
