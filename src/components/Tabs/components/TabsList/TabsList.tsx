import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Tabs as RadixTabs } from "@radix-ui/themes";

export type TabsListProps = ComponentPropsWithoutRef<typeof RadixTabs.List>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
	(props, ref) => {
		return <RadixTabs.List ref={ref} {...props} />;
	},
);

TabsList.displayName = "Tabs.List";
