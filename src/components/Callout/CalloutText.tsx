import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";

export type CalloutTextProps = ComponentPropsWithoutRef<
	typeof RadixCallout.Text
>;

export const CalloutText = forwardRef<HTMLParagraphElement, CalloutTextProps>(
	(props, ref) => {
		return <RadixCallout.Text ref={ref} {...props} />;
	},
);

CalloutText.displayName = "Callout.Text";
