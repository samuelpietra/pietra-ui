import type { ComponentPropsWithoutRef } from "react";
import { HoverCard as RadixHoverCard } from "@radix-ui/themes";

export type HoverCardRootProps = ComponentPropsWithoutRef<
	typeof RadixHoverCard.Root
>;

export const HoverCardRoot = (props: HoverCardRootProps) => {
	return <RadixHoverCard.Root {...props} />;
};

HoverCardRoot.displayName = "HoverCard.Root";
