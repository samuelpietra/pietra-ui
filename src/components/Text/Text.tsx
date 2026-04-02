import { forwardRef } from "react";
import {
	Text as RadixText,
	type TextProps as RadixTextProps,
} from "@radix-ui/themes";

import "./Text.css";

export type TextProps = RadixTextProps & {
	numberOfLines?: number;
	truncate?: never; // enforces numberOfLines usage
};

export const Text = forwardRef<HTMLSpanElement, TextProps>(
	({ numberOfLines, truncate: _, className, style, ...props }, ref) => (
		<RadixText
			ref={ref}
			className={
				numberOfLines
					? className
						? `pietra-text-clamp ${className}`
						: "pietra-text-clamp"
					: className
			}
			style={
				numberOfLines ? { ...style, WebkitLineClamp: numberOfLines } : style
			}
			{...props}
		/>
	),
);

Text.displayName = "Text";
