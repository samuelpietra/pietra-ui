import { forwardRef } from "react";
import {
	Avatar as RadixAvatar,
	type AvatarProps as RadixAvatarProps,
} from "@radix-ui/themes";

export type AvatarProps = RadixAvatarProps;

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
	(props, ref) => {
		return <RadixAvatar ref={ref} {...props} />;
	},
);

Avatar.displayName = "Avatar";
