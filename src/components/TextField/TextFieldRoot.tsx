import {
	Children,
	type ComponentPropsWithoutRef,
	forwardRef,
	isValidElement,
} from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";

import { Spinner } from "../Spinner";
import { TextFieldSlot } from "./TextFieldSlot";

type RadixTextFieldRootProps = ComponentPropsWithoutRef<
	typeof RadixTextField.Root
>;

export type TextFieldRootProps = RadixTextFieldRootProps & {
	/** Disables the input and replaces the right slot with a spinner. */
	loading?: boolean;
};

export const TextFieldRoot = forwardRef<HTMLInputElement, TextFieldRootProps>(
	({ loading, disabled, children, ...props }, ref) => {
		const resolvedChildren = loading
			? Children.map(children, (child) => {
					if (
						isValidElement<{ side?: string }>(child) &&
						child.type === TextFieldSlot &&
						child.props.side === "right"
					) {
						return null;
					}
					return child;
				})
			: children;

		return (
			<RadixTextField.Root ref={ref} disabled={loading || disabled} {...props}>
				{resolvedChildren}
				{loading && (
					<TextFieldSlot side="right">
						<Spinner size="1" />
					</TextFieldSlot>
				)}
			</RadixTextField.Root>
		);
	},
);

TextFieldRoot.displayName = "TextField.Root";
