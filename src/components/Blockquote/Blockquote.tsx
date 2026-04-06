import { forwardRef } from "react";
import {
	Blockquote as RadixBlockquote,
	type BlockquoteProps as RadixBlockquoteProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type BlockquoteProps = RadixBlockquoteProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixBlockquote
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Blockquote.displayName = "Blockquote";
