import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { CheckboxCards as RadixCheckboxCards } from "@radix-ui/themes";

export type CheckboxCardsItemProps = ComponentPropsWithoutRef<
	typeof RadixCheckboxCards.Item
>;

export const CheckboxCardsItem = forwardRef<
	HTMLButtonElement,
	CheckboxCardsItemProps
>((props, ref) => {
	return <RadixCheckboxCards.Item ref={ref} {...props} />;
});

CheckboxCardsItem.displayName = "CheckboxCards.Item";
