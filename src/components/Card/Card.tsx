import { forwardRef } from "react";
import {
	Card as RadixCard,
	type CardProps as RadixCardProps,
} from "@radix-ui/themes";

export type CardProps = RadixCardProps;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
	return <RadixCard ref={ref} {...props} />;
});

Card.displayName = "Card";
