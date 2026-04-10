import { forwardRef } from "react";
import clsx from "clsx";

import { Separator } from "@/components/Separator";

import "./ComboboxSeparator.css";

export interface ComboboxSeparatorProps {
	className?: string;
}

export const ComboboxSeparator = forwardRef<
	HTMLSpanElement,
	ComboboxSeparatorProps
>(({ className }, ref) => {
	return (
		<Separator
			ref={ref}
			size="4"
			className={clsx("pietra-combobox-separator", className)}
		/>
	);
});

ComboboxSeparator.displayName = "Combobox.Separator";
