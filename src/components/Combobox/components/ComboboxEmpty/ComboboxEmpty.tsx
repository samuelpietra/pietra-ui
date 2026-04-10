import { forwardRef, type ReactNode } from "react";

import { Box } from "@/components/Box";

import { useComboboxContext } from "../../context";

import "./ComboboxEmpty.css";

export interface ComboboxEmptyProps {
	/** Custom empty state content. Defaults to "No results found". */
	children?: ReactNode;
}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
	({ children }, ref) => {
		const { filteredOptions, hasCreateOption } = useComboboxContext();

		if (filteredOptions.length > 0 || hasCreateOption) return null;

		return (
			<Box ref={ref} className="pietra-combobox-empty">
				{children ?? "No results found"}
			</Box>
		);
	},
);

ComboboxEmpty.displayName = "Combobox.Empty";
