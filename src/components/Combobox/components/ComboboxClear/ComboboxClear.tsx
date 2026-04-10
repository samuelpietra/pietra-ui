import { forwardRef, type ReactNode } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

import { IconButton } from "@/components/IconButton";

import { useComboboxContext } from "../../context";

import "./ComboboxClear.css";

export interface ComboboxClearProps {
	className?: string;
	children?: ReactNode;
}

export const ComboboxClear = forwardRef<HTMLButtonElement, ComboboxClearProps>(
	({ className, children }, ref) => {
		const { clearAll, disabled, hasValue } = useComboboxContext();

		if (!hasValue) return null;

		return (
			<IconButton
				ref={ref}
				variant="ghost"
				size="1"
				color="gray"
				className={clsx("pietra-combobox-clear", className)}
				onClick={clearAll}
				aria-label="Clear all selections"
				disabled={disabled}
				tabIndex={-1}
			>
				{children ?? <X size={15} />}
			</IconButton>
		);
	},
);

ComboboxClear.displayName = "Combobox.Clear";
