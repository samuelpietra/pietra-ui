import { forwardRef } from "react";
import {
	Switch as RadixSwitch,
	type SwitchProps as RadixSwitchProps,
} from "@radix-ui/themes";

export type SwitchProps = RadixSwitchProps;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
	(props, ref) => {
		return <RadixSwitch ref={ref} {...props} />;
	},
);

Switch.displayName = "Switch";
