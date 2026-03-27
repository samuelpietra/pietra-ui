import { forwardRef } from "react";
import {
	Progress as RadixProgress,
	type ProgressProps as RadixProgressProps,
} from "@radix-ui/themes";

export type ProgressProps = RadixProgressProps & {
	"aria-label": string;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	(props, ref) => {
		return <RadixProgress ref={ref} {...props} />;
	},
);

Progress.displayName = "Progress";
