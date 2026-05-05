import { forwardRef } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import {
	Badge as RadixBadge,
	type BadgeProps as RadixBadgeProps,
} from "@radix-ui/themes";

import { IconButton } from "@/components/IconButton";

import "./Badge.css";

export type BadgeProps = RadixBadgeProps & {
	/** Shows a dismiss button. Called when the user clicks it. */
	onClose?: () => void;
	/** When true, disables the close button. */
	disabled?: boolean;
	/** Accessible label for the close button. */
	closeLabel?: string;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			onClose,
			disabled = false,
			closeLabel = "Remove",
			children,
			className,
			...props
		},
		ref,
	) => {
		return (
			<RadixBadge
				ref={ref}
				className={clsx(onClose && "pietra-badge-closable", className)}
				{...props}
			>
				{children}
				{onClose && (
					<IconButton
						variant="ghost"
						size="1"
						color="gray"
						className="pietra-badge-close"
						onClick={(event) => {
							event.stopPropagation();
							onClose();
						}}
						aria-label={closeLabel}
						disabled={disabled}
						tabIndex={-1}
					>
						<X size={12} />
					</IconButton>
				)}
			</RadixBadge>
		);
	},
);

Badge.displayName = "Badge";
