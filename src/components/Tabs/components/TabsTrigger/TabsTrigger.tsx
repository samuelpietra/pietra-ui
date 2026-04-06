import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Tabs as RadixTabs } from "@radix-ui/themes";

export type TabsTriggerProps = ComponentPropsWithoutRef<
	typeof RadixTabs.Trigger
>;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
	(props, ref) => {
		return <RadixTabs.Trigger ref={ref} {...props} />;
	},
);

TabsTrigger.displayName = "Tabs.Trigger";
