import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Link, Text } from "@/components";

import { SAMPLE_COLORS, SIZES } from "./fixtures";

const meta: Meta<typeof Link> = {
	title: "Typography/Link",
	component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	render: () => (
		<Text>
			Follow the <Link href="#">quick brown fox</Link> over the lazy dog.
		</Text>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			{SIZES.map((size) => (
				<Link key={size} href="#" size={size}>
					Size {size}
				</Link>
			))}
		</Flex>
	),
};

const WEIGHTS = ["regular", "medium", "bold"] as const;

export const Weight: Story = {
	render: () => (
		<Flex gap="4">
			{WEIGHTS.map((weight) => (
				<Link key={weight} href="#" weight={weight}>
					{weight}
				</Link>
			))}
		</Flex>
	),
};

export const Truncate: Story = {
	render: () => (
		<Flex maxWidth="150px">
			<Link href="#" truncate>
				Follow the quick brown fox over the lazy dog.
			</Link>
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="4">
			{SAMPLE_COLORS.map((color) => (
				<Link key={color} href="#" color={color}>
					{color}
				</Link>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="4">
			{SAMPLE_COLORS.map((color) => (
				<Link key={color} href="#" color={color} highContrast>
					{color}
				</Link>
			))}
		</Flex>
	),
};

const UNDERLINES = ["auto", "always", "hover", "none"] as const;

export const Underline: Story = {
	render: () => (
		<Flex gap="4">
			{UNDERLINES.map((underline) => (
				<Link key={underline} href="#" underline={underline}>
					{underline}
				</Link>
			))}
		</Flex>
	),
};
