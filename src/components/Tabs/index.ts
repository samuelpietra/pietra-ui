import { TabsContent } from "./TabsContent";
import { TabsList } from "./TabsList";
import { TabsRoot } from "./TabsRoot";
import { TabsTrigger } from "./TabsTrigger";

export type { TabsContentProps } from "./TabsContent";
export type { TabsListProps } from "./TabsList";
export type { TabsRootProps } from "./TabsRoot";
export type { TabsTriggerProps } from "./TabsTrigger";

export const Tabs = {
	Root: TabsRoot,
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
};
