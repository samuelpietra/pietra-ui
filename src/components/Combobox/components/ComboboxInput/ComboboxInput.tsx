import { forwardRef, type ReactNode, useRef } from "react";
import { composeRefs } from "@radix-ui/react-compose-refs";

import { Badge, BadgeGroup, Box, Flex, Popover } from "@/components";

import { useComboboxInput } from "./hooks";

import "./ComboboxInput.css";

export interface ComboboxInputProps {
	/** Placeholder text shown when the input is empty. */
	placeholder?: string;
	/** Accessible label for the combobox input. Use when no visible label is associated via aria-labelledby. */
	"aria-label"?: string;
	/** ID of the element that labels the combobox input. */
	"aria-labelledby"?: string;
	/** Maximum height for the tag area in pixels. Defaults to 120. Has no effect when collapseTags is true. */
	maxHeight?: number;
	/** When true, tags collapse into a single row with a "+N more" overflow badge (maxHeight is ignored). When false, tags wrap freely. */
	collapseTags?: boolean;
	children?: ReactNode;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
	(
		{
			placeholder,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			maxHeight = 120,
			collapseTags,
			children,
		},
		ref,
	) => {
		const {
			isOpen,
			multiple,
			selectedArray,
			badgeItems,
			inputProps,
			statusMessage,
		} = useComboboxInput();

		const inputRef = useRef<HTMLInputElement | null>(null);
		const composedRef = composeRefs(inputRef, ref);

		return (
			<Box className="pietra-combobox-input-wrapper">
				{multiple && selectedArray.length > 0 && (
					<Box
						className="pietra-combobox-tag-area"
						style={{
							maxHeight: collapseTags ? undefined : maxHeight,
						}}
					>
						{collapseTags ? (
							<BadgeGroup
								badges={badgeItems}
								gap={1}
								indicator={(overflowCount, overflowBadges) => (
									<Popover.Root>
										<Popover.Trigger>
											<Badge
												size="1"
												variant="soft"
												color="gray"
												className="pietra-combobox-tag-badge"
											>
												+{overflowCount} more
											</Badge>
										</Popover.Trigger>
										<Popover.Content size="1" side="bottom" align="start">
											<Flex direction="column" align="start" gap="1">
												{overflowBadges.map(({ id, ...badgeProps }) => (
													<Badge key={id} {...badgeProps} />
												))}
											</Flex>
										</Popover.Content>
									</Popover.Root>
								)}
							/>
						) : (
							<Flex wrap="wrap" gap="1">
								{badgeItems.map(({ id, ...badgeProps }) => (
									<Badge key={id} {...badgeProps} />
								))}
							</Flex>
						)}
					</Box>
				)}
				<Flex align="center">
					<input
						ref={composedRef}
						type="text"
						role="combobox"
						className="pietra-combobox-input"
						placeholder={placeholder}
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledBy}
						aria-expanded={isOpen}
						aria-autocomplete="list"
						aria-haspopup="listbox"
						{...inputProps}
					/>
					{children && (
						<Flex className="pietra-combobox-input-actions" gap="1">
							{children}
						</Flex>
					)}
				</Flex>
				<Box
					aria-live="polite"
					aria-atomic="true"
					className="pietra-combobox-sr-only"
				>
					{statusMessage}
				</Box>
			</Box>
		);
	},
);

ComboboxInput.displayName = "Combobox.Input";
