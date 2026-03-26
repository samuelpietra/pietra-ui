import { forwardRef } from "react";
import {
	AspectRatio as RadixAspectRatio,
	type AspectRatioProps as RadixAspectRatioProps,
} from "@radix-ui/themes";

export type AspectRatioProps = RadixAspectRatioProps;

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
	(props, ref) => {
		return <RadixAspectRatio ref={ref} {...props} />;
	},
);

AspectRatio.displayName = "AspectRatio";
