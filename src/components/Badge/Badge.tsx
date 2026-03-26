import { forwardRef } from "react";
import {
	Badge as RadixBadge,
	type BadgeProps as RadixBadgeProps,
} from "@radix-ui/themes";

export type BadgeProps = RadixBadgeProps;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
	return <RadixBadge ref={ref} {...props} />;
});

Badge.displayName = "Badge";
