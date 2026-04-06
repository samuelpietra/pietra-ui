import { forwardRef } from "react";
import {
	Heading as RadixHeading,
	type HeadingProps as RadixHeadingProps,
} from "@radix-ui/themes";

export type HeadingProps = RadixHeadingProps;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	(props, ref) => {
		return <RadixHeading ref={ref} {...props} />;
	},
);

Heading.displayName = "Heading";
