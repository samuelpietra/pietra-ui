import { type ComponentType, type ReactNode, useEffect } from "react";

import { useCatalogContext } from "../../hooks";

export type CatalogViewProps = {
	children: ReactNode;
	defaultView?: boolean;
	icon: ComponentType<{ size?: number | string }>;
	id: string;
	label: string;
};
export function CatalogView({
	children,
	defaultView,
	icon,
	id,
	label,
}: CatalogViewProps) {
	const { view, registerView } = useCatalogContext();

	useEffect(() => {
		registerView({ id, label, icon }, !!defaultView);
	}, [registerView, id, label, icon, defaultView]);

	if (view !== id) return null;

	return children;
}

CatalogView.displayName = "CatalogView";
