import { forwardRef } from "react";
import {
	Text as RadixText,
	type TextProps as RadixTextProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type TextProps = RadixTextProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Text = forwardRef<HTMLSpanElement, TextProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixText
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Text.displayName = "Text";
