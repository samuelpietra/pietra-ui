import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";

export type CalloutRootProps = ComponentPropsWithoutRef<
	typeof RadixCallout.Root
>;

export const CalloutRoot = forwardRef<HTMLDivElement, CalloutRootProps>(
	(props, ref) => {
		return <RadixCallout.Root ref={ref} {...props} />;
	},
);

CalloutRoot.displayName = "Callout.Root";
