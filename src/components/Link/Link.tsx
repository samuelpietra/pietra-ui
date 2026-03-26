import { forwardRef } from "react";
import {
	Link as RadixLink,
	type LinkProps as RadixLinkProps,
} from "@radix-ui/themes";

export type LinkProps = RadixLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	return <RadixLink ref={ref} underline="always" {...props} />;
});

Link.displayName = "Link";
