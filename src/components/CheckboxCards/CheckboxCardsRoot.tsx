import { forwardRef } from "react";
import { CheckboxCards as RadixCheckboxCards } from "@radix-ui/themes";

export type CheckboxCardsRootProps = React.ComponentPropsWithoutRef<
	typeof RadixCheckboxCards.Root
>;

export const CheckboxCardsRoot = forwardRef<
	HTMLDivElement,
	CheckboxCardsRootProps
>((props, ref) => {
	return <RadixCheckboxCards.Root ref={ref} {...props} />;
});

CheckboxCardsRoot.displayName = "CheckboxCards.Root";
