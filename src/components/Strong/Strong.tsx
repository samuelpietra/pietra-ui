import { forwardRef } from "react";
import {
	Strong as RadixStrong,
	type StrongProps as RadixStrongProps,
} from "@radix-ui/themes";

export type StrongProps = RadixStrongProps;

export const Strong = forwardRef<HTMLElement, StrongProps>((props, ref) => {
	return <RadixStrong ref={ref} {...props} />;
});

Strong.displayName = "Strong";
