import { Checkbox } from "@/components/Checkbox";

import { useCatalogSelection } from "../../hooks";

export function RowCheckbox({ item }: { item: unknown }) {
	const { isSelected, toggleItem } = useCatalogSelection();

	return (
		<Checkbox
			aria-label="Select row"
			size="2"
			checked={isSelected(item)}
			onClick={(event) => event.stopPropagation()}
			onCheckedChange={() => toggleItem(item)}
		/>
	);
}

RowCheckbox.displayName = "RowCheckbox";
