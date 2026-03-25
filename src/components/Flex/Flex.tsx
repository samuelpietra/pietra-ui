import { forwardRef } from "react";
import {
	Flex as RadixFlex,
	type FlexProps as RadixFlexProps,
} from "@radix-ui/themes";

export type FlexProps = RadixFlexProps;

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
	return <RadixFlex ref={ref} {...props} />;
});

Flex.displayName = "Flex";
