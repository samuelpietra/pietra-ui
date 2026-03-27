import {
	type ComponentPropsWithoutRef,
	type CSSProperties,
	forwardRef,
	type SyntheticEvent,
	useCallback,
	useState,
} from "react";

import { useLatest } from "@/hooks/useLatest";

import { AspectRatio } from "../AspectRatio";
import { Skeleton } from "../Skeleton";

export type ImageShape = "square" | "rounded" | "circular";

const shapeMap: Record<Exclude<ImageShape, "square">, string> = {
	rounded: "8px",
	circular: "50%",
};

const skeletonOverlayStyle = {
	position: "absolute" as const,
	inset: 0,
	width: "100%",
	height: "100%",
};

/**
 * When only `width` or `height` is provided, the loading skeleton assumes a square.
 * The border from `bordered` is only visible after the image loads.
 */
export type ImageProps = Omit<ComponentPropsWithoutRef<"img">, "alt"> & {
	/** Required text alternative for accessibility. */
	alt: string;
	/** Aspect ratio — when set, `width` drives the size and `height` is ignored. Defaults `fit` to `"cover"`. */
	ratio?: number;
	/** Controls the border-radius shape of the image. @default "square" */
	shape?: ImageShape;
	/** Maps to CSS `object-fit`. Automatically set to `"cover"` when `ratio` or both `width` and `height` are provided. */
	fit?: CSSProperties["objectFit"];
	/** Adds a `1px solid` border using the theme's --gray-6 color. */
	bordered?: boolean;
	/** Image URL to display when the primary `src` fails to load. */
	fallbackSrc?: string;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
	(
		{
			ratio,
			shape = "square",
			fit,
			style,
			onLoad,
			onError,
			alt,
			bordered,
			fallbackSrc,
			src,
			width,
			height,
			...props
		},
		ref,
	) => {
		const [isLoading, setIsLoading] = useState(true);
		const [isErrored, setIsErrored] = useState(false);
		const [prevSrc, setPrevSrc] = useState(src);

		if (prevSrc !== src) {
			setPrevSrc(src);
			setIsLoading(true);
			setIsErrored(false);
		}

		const borderRadius = shape !== "square" ? shapeMap[shape] : undefined;
		const showSkeleton = !src || isLoading;

		const hasDimensions = width !== undefined && height !== undefined;

		const imgStyle = {
			objectFit: fit ?? (ratio || hasDimensions ? "cover" : undefined),
			width: ratio || hasDimensions ? "100%" : undefined,
			height: ratio || hasDimensions ? "100%" : undefined,
			borderRadius,
			display: "block" as const,
			visibility: showSkeleton ? ("hidden" as const) : undefined,
			...style,
		};

		const onLoadRef = useLatest(onLoad);
		const onErrorRef = useLatest(onError);

		// biome-ignore lint/correctness/useExhaustiveDependencies: stable ref via useLatest — .current is read at call time, not render time
		const handleLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
			setIsLoading(false);
			onLoadRef.current?.(e);
		}, []);

		// biome-ignore lint/correctness/useExhaustiveDependencies: stable ref via useLatest — .current is read at call time, not render time
		const handleError = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
			setIsLoading(false);
			setIsErrored(true);
			onErrorRef.current?.(e);
		}, []);

		const clipStyle = {
			borderRadius,
			overflow: borderRadius || bordered ? ("hidden" as const) : undefined,
			display: "inline-block" as const,
			border: bordered && !showSkeleton ? "1px solid var(--gray-6)" : undefined,
			width: ratio ? undefined : (width ?? height),
			height: ratio ? undefined : (height ?? width),
			position: "relative" as const,
		};

		const imgSrc = !src
			? undefined
			: isErrored && fallbackSrc
				? fallbackSrc
				: src;

		const img = (
			<img
				ref={ref}
				alt={alt}
				src={imgSrc}
				style={imgStyle}
				onLoad={src ? handleLoad : undefined}
				onError={src && !isErrored ? handleError : undefined}
				width={ratio || hasDimensions ? undefined : width}
				height={ratio || hasDimensions ? undefined : height}
				{...props}
			/>
		);

		const content = ratio ? (
			<div style={{ width }}>
				<AspectRatio ratio={ratio}>{img}</AspectRatio>
			</div>
		) : (
			img
		);

		return (
			<div data-testid="image-wrapper" style={clipStyle}>
				{content}
				{showSkeleton && (
					<Skeleton
						data-testid="image-skeleton"
						loading
						style={skeletonOverlayStyle}
					/>
				)}
			</div>
		);
	},
);

Image.displayName = "Image";
