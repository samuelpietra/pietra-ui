import { forwardRef } from "react";
import {
	Strong as RadixStrong,
	type StrongProps as RadixStrongProps,
} from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type StrongProps = RadixStrongProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Strong = forwardRef<HTMLElement, StrongProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixStrong
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Strong.displayName = "Strong";
