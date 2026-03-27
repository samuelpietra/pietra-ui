import { forwardRef } from "react";
import {
	IconButton as RadixIconButton,
	type IconButtonProps as RadixIconButtonProps,
} from "@radix-ui/themes";

export type IconButtonProps = RadixIconButtonProps & {
	"aria-label": string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(props, ref) => {
		return <RadixIconButton ref={ref} {...props} />;
	},
);

IconButton.displayName = "IconButton";
