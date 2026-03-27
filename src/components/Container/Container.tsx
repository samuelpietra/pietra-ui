import { forwardRef } from "react";
import {
	Container as RadixContainer,
	type ContainerProps as RadixContainerProps,
} from "@radix-ui/themes";

export type ContainerProps = RadixContainerProps;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	(props, ref) => {
		return <RadixContainer ref={ref} {...props} />;
	},
);

Container.displayName = "Container";
