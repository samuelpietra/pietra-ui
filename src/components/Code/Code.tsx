import { forwardRef } from "react";
import {
	Code as RadixCode,
	type CodeProps as RadixCodeProps,
} from "@radix-ui/themes";

export type CodeProps = RadixCodeProps;

export const Code = forwardRef<HTMLElement, CodeProps>((props, ref) => {
	return <RadixCode ref={ref} {...props} />;
});

Code.displayName = "Code";
