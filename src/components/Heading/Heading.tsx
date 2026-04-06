import { forwardRef } from "react";
import {
	Heading as RadixHeading,
	type HeadingProps as RadixHeadingProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type HeadingProps = RadixHeadingProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixHeading
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Heading.displayName = "Heading";
