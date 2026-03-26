import { forwardRef } from "react";
import { CheckboxGroup as RadixCheckboxGroup } from "@radix-ui/themes";

export type CheckboxGroupItemProps = React.ComponentPropsWithoutRef<
	typeof RadixCheckboxGroup.Item
>;

export const CheckboxGroupItem = forwardRef<
	HTMLButtonElement,
	CheckboxGroupItemProps
>((props, ref) => {
	return <RadixCheckboxGroup.Item ref={ref} {...props} />;
});

CheckboxGroupItem.displayName = "CheckboxGroup.Item";
