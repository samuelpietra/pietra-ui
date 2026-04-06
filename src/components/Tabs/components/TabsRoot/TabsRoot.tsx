import type { ComponentPropsWithoutRef } from "react";
import { Tabs as RadixTabs } from "@radix-ui/themes";

export type TabsRootProps = ComponentPropsWithoutRef<typeof RadixTabs.Root>;

export const TabsRoot = (props: TabsRootProps) => {
	return <RadixTabs.Root {...props} />;
};

TabsRoot.displayName = "Tabs.Root";
