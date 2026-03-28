import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Separator as RadixSeparator } from "@radix-ui/themes";

export type SeparatorProps = ComponentPropsWithoutRef<typeof RadixSeparator>;

export const Separator = forwardRef<HTMLSpanElement, SeparatorProps>(
	(props, ref) => {
		return <RadixSeparator ref={ref} {...props} />;
	},
);

Separator.displayName = "Separator";
