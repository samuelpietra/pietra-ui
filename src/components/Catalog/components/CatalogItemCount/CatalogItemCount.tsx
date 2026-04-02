import { Text } from "@/components/Text";

import { useCatalogContext } from "../../hooks";

export function CatalogItemCount() {
	const { collection } = useCatalogContext();

	return (
		<Text size="1" color="gray">
			{collection.length} {collection.length === 1 ? "item" : "items"}
		</Text>
	);
}

CatalogItemCount.displayName = "CatalogItemCount";
