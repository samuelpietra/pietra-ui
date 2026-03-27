import { forwardRef } from "react";
import {
	Link as RadixLink,
	type LinkProps as RadixLinkProps,
} from "@radix-ui/themes";

export type LinkProps = RadixLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	({ underline = "always", ...props }, ref) => {
		return <RadixLink ref={ref} underline={underline} {...props} />;
	},
);

Link.displayName = "Link";
