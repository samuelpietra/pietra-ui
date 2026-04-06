import { forwardRef } from "react";
import { Em as RadixEm, type EmProps as RadixEmProps } from "@radix-ui/themes";

import { clampLines } from "@/utils/style";

export type EmProps = RadixEmProps & {
	numberOfLines?: number;
	truncate?: never;
};

export const Em = forwardRef<HTMLElement, EmProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixEm
			ref={ref}
			{...clampLines(numberOfLines, className, style)}
			{...props}
		/>
	),
);

Em.displayName = "Em";
