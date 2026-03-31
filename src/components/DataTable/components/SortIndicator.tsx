import type { SortState } from "../DataTable.types";

interface SortIndicatorProps {
	direction: SortState["direction"];
}

export function SortIndicator({ direction }: SortIndicatorProps) {
	return (
		<span className="pietra-data-table-sort-indicator" aria-hidden="true">
			{direction === "asc" ? "↑" : "↓"}
		</span>
	);
}
