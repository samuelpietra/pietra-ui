import { forwardRef } from "react";
import {
	Skeleton as RadixSkeleton,
	type SkeletonProps as RadixSkeletonProps,
} from "@radix-ui/themes";

export type SkeletonProps = RadixSkeletonProps;

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
	(props, ref) => {
		return <RadixSkeleton ref={ref} {...props} />;
	},
);

Skeleton.displayName = "Skeleton";
