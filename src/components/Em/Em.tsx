import { forwardRef } from "react";
import { Em as RadixEm, type EmProps as RadixEmProps } from "@radix-ui/themes";

export type EmProps = RadixEmProps;

export const Em = forwardRef<HTMLElement, EmProps>((props, ref) => {
	return <RadixEm ref={ref} {...props} />;
});

Em.displayName = "Em";
