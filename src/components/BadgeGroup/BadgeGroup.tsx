import {
	forwardRef,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { composeRefs } from "@radix-ui/react-compose-refs";

import { useLatest } from "@/hooks/useLatest";

import { Badge, type BadgeProps } from "../Badge";

import "./BadgeGroup.css";

export type BadgeGroupItem = { id: string } & BadgeProps;

export type BadgeGroupProps = {
	badges: BadgeGroupItem[];
	gap?: number;
	indicator?: (
		overflowCount: number,
		overflowBadges: BadgeGroupItem[],
	) => ReactNode;
};

const defaultIndicator = (count: number) => (
	<Badge variant="soft" color="gray" aria-label={`${count} more badges`}>
		+{count}
	</Badge>
);

export const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
	({ badges, gap = 2, indicator = defaultIndicator }, ref) => {
		const containerRef = useRef<HTMLDivElement | null>(null);
		const badgesRef = useLatest(badges);
		const [visibleCount, setVisibleCount] = useState(badges.length);

		const gapPx = gap * 4;

		// biome-ignore lint/correctness/useExhaustiveDependencies: reads badges from ref to keep calculate stable across renders
		const calculate = useCallback(() => {
			const container = containerRef.current;
			if (!container) return;

			const currentBadges = badgesRef.current;
			const availableWidth = container.clientWidth;

			if (availableWidth === 0) return;

			const items = container.querySelectorAll<HTMLElement>(
				"[data-badge-group-item]",
			);
			const indEl = container.querySelector<HTMLElement>(
				"[data-badge-group-indicator]",
			);
			const indicatorWidth = indEl ? indEl.offsetWidth : 0;

			let usedWidth = 0;
			let count = 0;

			for (let i = 0; i < currentBadges.length; i++) {
				const itemWidth = items[i]?.offsetWidth ?? 0;
				const nextUsed = usedWidth + (count > 0 ? gapPx : 0) + itemWidth;

				const isLast = i === currentBadges.length - 1;
				const spaceNeeded = isLast
					? nextUsed
					: nextUsed + gapPx + indicatorWidth;

				if (spaceNeeded > availableWidth && count > 0) break;

				usedWidth = nextUsed;
				count++;
			}

			setVisibleCount((prev) => (prev === count ? prev : count));
		}, [gapPx]);

		// Recalculate after every render — badges may change without a resize
		useEffect(() => {
			calculate();
		});

		// Recalculate on container resize
		useEffect(() => {
			const container = containerRef.current;
			if (!container) return;

			const observer = new ResizeObserver(() => calculate());
			observer.observe(container);

			return () => observer.disconnect();
		}, [calculate]);

		const isOverflowing = visibleCount < badges.length;
		const overflowCount = badges.length - visibleCount;
		const overflowBadges = badges.slice(visibleCount);

		return (
			<div
				ref={composeRefs(containerRef, ref)}
				className="pietra-badge-group"
				style={{ gap: `var(--space-${gap})` }}
			>
				{badges.map(({ id, ...badgeProps }, i) => (
					<div
						key={id}
						data-badge-group-item=""
						className={
							i < visibleCount
								? "pietra-badge-group-item"
								: "pietra-badge-group-item pietra-badge-group-item-hidden"
						}
					>
						<Badge {...badgeProps} />
					</div>
				))}
				<div
					data-badge-group-indicator=""
					className={
						isOverflowing
							? "pietra-badge-group-indicator"
							: "pietra-badge-group-indicator pietra-badge-group-indicator-hidden"
					}
				>
					{isOverflowing ? indicator(overflowCount, overflowBadges) : null}
				</div>
			</div>
		);
	},
);

BadgeGroup.displayName = "BadgeGroup";
