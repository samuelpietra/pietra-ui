import { Flex, IconButton } from "@/components";

import { useCatalogContext } from "../../hooks";

import "./CatalogViewSwitcher.css";

export function CatalogViewSwitcher() {
	const { view, setView, views } = useCatalogContext();

	if (views.length <= 1) return null;

	return (
		<Flex align="center" gap="1" className="pietra-catalog-view-switcher">
			{views.map(({ id, label, icon: Icon }) => (
				<IconButton
					key={id}
					size="1"
					variant={view === id ? "solid" : "soft"}
					color="gray"
					aria-label={label}
					aria-pressed={view === id}
					onClick={() => setView(id)}
				>
					<Icon size={16} />
				</IconButton>
			))}
		</Flex>
	);
}

CatalogViewSwitcher.displayName = "CatalogViewSwitcher";
