import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { HoverCard as RadixHoverCard } from "@radix-ui/themes";

export type HoverCardTriggerProps = ComponentPropsWithoutRef<
	typeof RadixHoverCard.Trigger
>;

export const HoverCardTrigger = forwardRef<
	HTMLAnchorElement,
	HoverCardTriggerProps
>((props, ref) => {
	return <RadixHoverCard.Trigger ref={ref} {...props} />;
});

HoverCardTrigger.displayName = "HoverCard.Trigger";
