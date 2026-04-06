import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { RadioCards as RadixRadioCards } from "@radix-ui/themes";

export type RadioCardsItemProps = ComponentPropsWithoutRef<
	typeof RadixRadioCards.Item
>;

export const RadioCardsItem = forwardRef<
	HTMLButtonElement,
	RadioCardsItemProps
>((props, ref) => {
	return <RadixRadioCards.Item ref={ref} {...props} />;
});

RadioCardsItem.displayName = "RadioCards.Item";
