import { forwardRef } from "react";
import {
	Box as RadixBox,
	type BoxProps as RadixBoxProps,
} from "@radix-ui/themes";

export type BoxProps = RadixBoxProps;

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
	return <RadixBox ref={ref} {...props} />;
});

Box.displayName = "Box";
