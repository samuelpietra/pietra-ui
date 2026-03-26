import { forwardRef } from "react";
import {
	Radio as RadixRadio,
	type RadioProps as RadixRadioProps,
} from "@radix-ui/themes";

export type RadioProps = RadixRadioProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	return <RadixRadio ref={ref} {...props} />;
});

Radio.displayName = "Radio";
