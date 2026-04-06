import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { HoverCard as RadixHoverCard } from "@radix-ui/themes";

export type HoverCardContentProps = ComponentPropsWithoutRef<
	typeof RadixHoverCard.Content
>;

export const HoverCardContent = forwardRef<
	HTMLDivElement,
	HoverCardContentProps
>((props, ref) => {
	return <RadixHoverCard.Content ref={ref} {...props} />;
});

HoverCardContent.displayName = "HoverCard.Content";
