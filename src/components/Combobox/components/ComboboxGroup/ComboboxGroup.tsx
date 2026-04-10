import { forwardRef, type ReactNode, useId } from "react";
import clsx from "clsx";

import { Box } from "@/components/Box";

import "./ComboboxGroup.css";

export interface ComboboxGroupProps {
	/** Group heading displayed above the options. */
	label: ReactNode;
	children: ReactNode;
	className?: string;
}

export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
	({ label, children, className }, ref) => {
		const labelId = useId();

		return (
			<Box
				ref={ref}
				role="group"
				aria-labelledby={labelId}
				className={clsx("pietra-combobox-group", className)}
			>
				<Box id={labelId} className="pietra-combobox-label">
					{label}
				</Box>
				{children}
			</Box>
		);
	},
);

ComboboxGroup.displayName = "Combobox.Group";
