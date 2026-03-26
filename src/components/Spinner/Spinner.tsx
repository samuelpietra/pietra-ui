import { forwardRef } from "react";
import {
	Spinner as RadixSpinner,
	type SpinnerProps as RadixSpinnerProps,
} from "@radix-ui/themes";

export type SpinnerProps = RadixSpinnerProps;

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
	(props, ref) => {
		return <RadixSpinner ref={ref} {...props} />;
	},
);

Spinner.displayName = "Spinner";
