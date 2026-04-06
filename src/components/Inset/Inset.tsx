import { forwardRef } from "react";
import {
	Inset as RadixInset,
	type InsetProps as RadixInsetProps,
} from "@radix-ui/themes";

export type InsetProps = RadixInsetProps;

export const Inset = forwardRef<HTMLDivElement, InsetProps>((props, ref) => {
	return <RadixInset ref={ref} {...props} />;
});

Inset.displayName = "Inset";
