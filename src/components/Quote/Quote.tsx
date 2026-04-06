import { forwardRef } from "react";
import {
	Quote as RadixQuote,
	type QuoteProps as RadixQuoteProps,
} from "@radix-ui/themes";

export type QuoteProps = RadixQuoteProps;

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>((props, ref) => {
	return <RadixQuote ref={ref} {...props} />;
});

Quote.displayName = "Quote";
