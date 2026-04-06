import { forwardRef } from "react";
import {
	Blockquote as RadixBlockquote,
	type BlockquoteProps as RadixBlockquoteProps,
} from "@radix-ui/themes";

export type BlockquoteProps = RadixBlockquoteProps;

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
	(props, ref) => {
		return <RadixBlockquote ref={ref} {...props} />;
	},
);

Blockquote.displayName = "Blockquote";
