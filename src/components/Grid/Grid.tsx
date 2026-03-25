import { forwardRef } from "react";
import {
	Grid as RadixGrid,
	type GridProps as RadixGridProps,
} from "@radix-ui/themes";

export type GridProps = RadixGridProps;

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
	return <RadixGrid ref={ref} {...props} />;
});

Grid.displayName = "Grid";
