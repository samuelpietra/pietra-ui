import { forwardRef } from "react";
import {
	Code as RadixCode,
	type CodeProps as RadixCodeProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type CodeProps = RadixCodeProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Code = forwardRef<HTMLElement, CodeProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixCode
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Code.displayName = "Code";
