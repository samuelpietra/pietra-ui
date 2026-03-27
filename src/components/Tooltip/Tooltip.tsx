import { forwardRef } from "react";
import {
	Tooltip as RadixTooltip,
	type TooltipProps as RadixTooltipProps,
} from "@radix-ui/themes";

export type TooltipProps = RadixTooltipProps;

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(props, ref) => {
		return <RadixTooltip ref={ref} {...props} />;
	},
);

Tooltip.displayName = "Tooltip";
