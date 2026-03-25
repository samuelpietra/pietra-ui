import { forwardRef } from "react";
import {
  Text as RadixText,
  type TextProps as RadixTextProps,
} from "@radix-ui/themes";

export type TextProps = RadixTextProps;

export const Text = forwardRef<HTMLSpanElement, TextProps>((
  props,
  ref) => {
    return <RadixText ref={ref} {...props} />;
  }
);

Text.displayName = "Text";
