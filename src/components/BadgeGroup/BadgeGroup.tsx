import {
	forwardRef,
	type ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { composeRefs } from "@radix-ui/react-compose-refs";

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
		const widthCache = useRef(new Map<string, number>());
		const indicatorWidthRef = useRef(0);
		const prevBadgesRef = useRef(badges);
		const [visibleCount, setVisibleCount] = useState(badges.length);

		const gapPx = gap * 4;

		// Track badge identity changes via ref instead of O(n) scan every render
		let needsMeasure = widthCache.current.size === 0;
		if (prevBadgesRef.current !== badges) {
			prevBadgesRef.current = badges;
			needsMeasure = true;
		}

		// During measurement, show all items so they can be measured
		const effectiveVisible = needsMeasure ? badges.length : visibleCount;

		const calculate = useCallback(
			(measure: boolean) => {
				const container = containerRef.current;
				if (!container) return;

				const availableWidth = container.clientWidth;
				if (availableWidth === 0) return;

				if (measure) {
					widthCache.current.clear();
					const items = container.querySelectorAll<HTMLElement>(
						"[data-badge-group-item]",
					);
					items.forEach((el, i) => {
						if (i < badges.length) {
							widthCache.current.set(badges[i].id, el.offsetWidth);
						}
					});
					const indEl = container.querySelector<HTMLElement>(
						"[data-badge-group-indicator]",
					);
					if (indEl) {
						indicatorWidthRef.current = indEl.offsetWidth;
					}
				}

				let usedWidth = 0;
				let count = 0;

				for (const badge of badges) {
					const itemWidth = widthCache.current.get(badge.id) ?? 0;
					const nextUsed = usedWidth + (count > 0 ? gapPx : 0) + itemWidth;

					const isLast = count === badges.length - 1;
					const spaceNeeded = isLast
						? nextUsed
						: nextUsed + gapPx + indicatorWidthRef.current;

					if (spaceNeeded > availableWidth && count > 0) break;

					usedWidth = nextUsed;
					count++;
				}

				setVisibleCount((prev) => (prev === count ? prev : count));
			},
			[badges, gapPx],
		);

		// Measure + calculate before paint (blocks until done, no flash)
		useLayoutEffect(() => {
			calculate(needsMeasure);
		}, [needsMeasure, calculate]);

		// Recalculate from cache on container resize
		useEffect(() => {
			const container = containerRef.current;
			if (!container) return;

			const observer = new ResizeObserver(() => calculate(false));
			observer.observe(container);

			return () => observer.disconnect();
		}, [calculate]);

		const isOverflowing = effectiveVisible < badges.length;
		const overflowCount = badges.length - effectiveVisible;
		const overflowBadges = badges.slice(effectiveVisible);

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
							i < effectiveVisible
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
						needsMeasure
							? "pietra-badge-group-indicator pietra-badge-group-indicator-measuring"
							: "pietra-badge-group-indicator"
					}
				>
					{isOverflowing || needsMeasure
						? indicator(
								overflowCount || badges.length,
								overflowBadges.length > 0 ? overflowBadges : badges,
							)
						: null}
				</div>
			</div>
		);
	},
);

BadgeGroup.displayName = "BadgeGroup";
