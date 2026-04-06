import { forwardRef } from "react";
import {
	Kbd as RadixKbd,
	type KbdProps as RadixKbdProps,
} from "@radix-ui/themes";

export type KbdProps = RadixKbdProps;

export const Kbd = forwardRef<HTMLElement, KbdProps>((props, ref) => {
	return <RadixKbd ref={ref} {...props} />;
});

Kbd.displayName = "Kbd";
