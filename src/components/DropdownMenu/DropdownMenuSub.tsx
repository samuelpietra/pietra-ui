import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";

export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<
	typeof RadixDropdownMenu.Sub
>;

export const DropdownMenuSub = (props: DropdownMenuSubProps) => {
	return <RadixDropdownMenu.Sub {...props} />;
};

DropdownMenuSub.displayName = "DropdownMenu.Sub";
