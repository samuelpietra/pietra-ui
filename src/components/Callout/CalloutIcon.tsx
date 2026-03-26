import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";

export type CalloutIconProps = ComponentPropsWithoutRef<
	typeof RadixCallout.Icon
>;

export const CalloutIcon = forwardRef<HTMLDivElement, CalloutIconProps>(
	(props, ref) => {
		return <RadixCallout.Icon ref={ref} {...props} />;
	},
);

CalloutIcon.displayName = "Callout.Icon";
