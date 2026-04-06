import { forwardRef } from "react";
import {
	Kbd as RadixKbd,
	type KbdProps as RadixKbdProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type KbdProps = RadixKbdProps & {
	numberOfLines?: number;
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
	({ numberOfLines, className, style, ...props }, ref) => (
		<RadixKbd
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Kbd.displayName = "Kbd";
