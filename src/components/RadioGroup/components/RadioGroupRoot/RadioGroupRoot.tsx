import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { RadioGroup as RadixRadioGroup } from "@radix-ui/themes";

export type RadioGroupRootProps = ComponentPropsWithoutRef<
	typeof RadixRadioGroup.Root
>;

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
	(props, ref) => {
		return <RadixRadioGroup.Root ref={ref} {...props} />;
	},
);

RadioGroupRoot.displayName = "RadioGroup.Root";
