import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Flex } from "@/components";

import { RADII, SIZES } from "./fixtures";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	render: () => (
		<Flex gap="2">
			<Badge color="orange">In progress</Badge>
			<Badge color="blue">In review</Badge>
			<Badge color="green">Complete</Badge>
		</Flex>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Badge key={size} size={size}>
					New
				</Badge>
			))}
		</Flex>
	),
};

const VARIANTS = ["solid", "soft", "surface", "outline"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{VARIANTS.map((variant) => (
				<Badge key={variant} variant={variant}>
					{variant}
				</Badge>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<Badge key={color} color={color}>
					{color}
				</Badge>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap" style={{ maxWidth: 350 }}>
			{SAMPLE_COLORS.map((color) => (
				<Flex key={color} direction="column" gap="1">
					<Badge color={color}>{color}</Badge>
					<Badge color={color} highContrast>
						{color}
					</Badge>
				</Flex>
			))}
		</Flex>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{RADII.map((radius) => (
				<Badge key={radius} radius={radius}>
					{radius}
				</Badge>
			))}
		</Flex>
	),
};
