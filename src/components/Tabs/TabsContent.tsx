import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Tabs as RadixTabs } from "@radix-ui/themes";

export type TabsContentProps = ComponentPropsWithoutRef<
	typeof RadixTabs.Content
>;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
	(props, ref) => {
		return <RadixTabs.Content ref={ref} {...props} />;
	},
);

TabsContent.displayName = "Tabs.Content";
