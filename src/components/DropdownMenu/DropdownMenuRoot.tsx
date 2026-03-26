import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuRootProps = React.ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Root
>;

export const DropdownMenuRoot = (props: DropdownMenuRootProps) => {
	return <RadixDropdownMenu.Root {...props} />;
};

DropdownMenuRoot.displayName = "DropdownMenu.Root";
