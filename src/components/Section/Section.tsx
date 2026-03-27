import { forwardRef } from "react";
import {
	Section as RadixSection,
	type SectionProps as RadixSectionProps,
} from "@radix-ui/themes";

export type SectionProps = RadixSectionProps;

export const Section = forwardRef<HTMLDivElement, SectionProps>(
	(props, ref) => {
		return <RadixSection ref={ref} {...props} />;
	},
);

Section.displayName = "Section";
