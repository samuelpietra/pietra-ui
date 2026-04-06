import { forwardRef } from "react";
import {
	Quote as RadixQuote,
	type QuoteProps as RadixQuoteProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type QuoteProps = RadixQuoteProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixQuote
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Quote.displayName = "Quote";
