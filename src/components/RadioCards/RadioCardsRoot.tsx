import { forwardRef } from "react";
import { RadioCards as RadixRadioCards } from "@radix-ui/themes";

export type RadioCardsRootProps = React.ComponentPropsWithoutRef<
	typeof RadixRadioCards.Root
>;

export const RadioCardsRoot = forwardRef<HTMLDivElement, RadioCardsRootProps>(
	(props, ref) => {
		return <RadixRadioCards.Root ref={ref} {...props} />;
	},
);

RadioCardsRoot.displayName = "RadioCards.Root";
