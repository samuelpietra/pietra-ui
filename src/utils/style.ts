import type { CSSProperties } from "react";

export function clampLines(
	numberOfLines: number | undefined,
	className: string | undefined,
	style: CSSProperties | undefined,
) {
	if (!numberOfLines) return { className, style };

	return {
		className: className
			? `pietra-line-clamp ${className}`
			: "pietra-line-clamp",
		style: { ...style, WebkitLineClamp: numberOfLines },
	};
}
