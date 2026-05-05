import { Checkbox } from "@/components/Checkbox";

import { useCatalogSelection } from "../../hooks";

export type RowCheckboxProps = {
	item: unknown;
	ariaLabel?: string;
};

export function RowCheckbox({
	item,
	ariaLabel = "Select row",
}: RowCheckboxProps) {
	const { isSelected, toggleItem } = useCatalogSelection();

	return (
		<Checkbox
			aria-label={ariaLabel}
			size="2"
			checked={isSelected(item)}
			onClick={(event) => event.stopPropagation()}
			onCheckedChange={() => toggleItem(item)}
		/>
	);
}

RowCheckbox.displayName = "RowCheckbox";
