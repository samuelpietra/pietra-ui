import { forwardRef } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

import { IconButton } from "@/components/IconButton";

import { useComboboxContext } from "../../context";

import "./ComboboxTrigger.css";

export interface ComboboxTriggerProps {
	className?: string;
	tabIndex?: number;
	"aria-label"?: string;
}

export const ComboboxTrigger = forwardRef<
	HTMLButtonElement,
	ComboboxTriggerProps
>(({ className, tabIndex = -1, "aria-label": ariaLabel }, ref) => {
	const { isOpen, setOpen, disabled } = useComboboxContext();

	const defaultLabel = isOpen ? "Close dropdown" : "Open dropdown";

	return (
		<IconButton
			ref={ref}
			variant="ghost"
			size="1"
			color="gray"
			className={clsx("pietra-combobox-trigger", className)}
			onClick={() => setOpen(!isOpen)}
			aria-label={ariaLabel ?? defaultLabel}
			disabled={disabled}
			tabIndex={tabIndex}
		>
			{isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
		</IconButton>
	);
});

ComboboxTrigger.displayName = "Combobox.Trigger";
