import type { Meta, StoryObj } from "@storybook/react";

import { Box, Flex, Heading } from "@/components";

const meta: Meta<typeof Heading> = {
	title: "Typography/Heading",
	component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

const SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const WEIGHTS = ["light", "regular", "medium", "bold"] as const;
const ALIGNS = ["left", "center", "right"] as const;
const TRIMS = ["normal", "start", "end", "both"] as const;
const COLORS = [
	"gray",
	"blue",
	"cyan",
	"teal",
	"green",
	"orange",
	"red",
	"violet",
	"indigo",
] as const;

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{SIZES.map((size) => (
				<Heading key={size} size={size}>
					Heading size {size}
				</Heading>
			))}
		</Flex>
	),
};

export const Weight: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{WEIGHTS.map((weight) => (
				<Heading key={weight} size="5" weight={weight}>
					{weight} weight
				</Heading>
			))}
		</Flex>
	),
};

export const Align: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{ALIGNS.map((align) => (
				<Heading key={align} size="5" align={align}>
					{align} aligned
				</Heading>
			))}
		</Flex>
	),
};

export const Trim: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{TRIMS.map((trim) => (
				<Box
					key={trim}
					style={{ backgroundColor: "var(--gray-a3)", padding: "0 8px" }}
				>
					<Heading size="5" trim={trim}>
						trim: {trim}
					</Heading>
				</Box>
			))}
		</Flex>
	),
};

export const Truncate: Story = {
	render: () => (
		<Box style={{ maxWidth: 300 }}>
			<Heading size="5" numberOfLines={1}>
				This heading is truncated because it is too long to fit in the container
			</Heading>
		</Box>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{COLORS.map((color) => (
				<Heading key={color} size="5" color={color}>
					{color}
				</Heading>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{COLORS.map((color) => (
				<Heading key={color} size="5" color={color} highContrast>
					{color} (high contrast)
				</Heading>
			))}
		</Flex>
	),
};
