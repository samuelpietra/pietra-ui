import type { ComponentPropsWithoutRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";

export type SelectRootProps = ComponentPropsWithoutRef<typeof RadixSelect.Root>;

export const SelectRoot = (props: SelectRootProps) => {
	return <RadixSelect.Root {...props} />;
};

SelectRoot.displayName = "Select.Root";
