import { forwardRef } from "react";
import { CheckboxGroup as RadixCheckboxGroup } from "@radix-ui/themes";

export type CheckboxGroupRootProps = React.ComponentPropsWithoutRef<
	typeof RadixCheckboxGroup.Root
>;

export const CheckboxGroupRoot = forwardRef<
	HTMLDivElement,
	CheckboxGroupRootProps
>((props, ref) => {
	return <RadixCheckboxGroup.Root ref={ref} {...props} />;
});

CheckboxGroupRoot.displayName = "CheckboxGroup.Root";
