import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Separator, Text } from "@/components";

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2", "3", "4"] as const;

const meta: Meta<typeof Separator> = {
	title: "Components/Separator",
	component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
	render: () => (
		<Flex direction="column" gap="4" maxWidth="400px">
			<Text size="2">Content above</Text>
			<Separator size="4" />
			<Text size="2">Content below</Text>
		</Flex>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="4" maxWidth="400px">
			{SIZES.map((size) => (
				<Separator key={size} size={size} />
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="4" maxWidth="400px">
			{SAMPLE_COLORS.map((color) => (
				<Separator key={color} size="4" color={color} />
			))}
		</Flex>
	),
};

export const Vertical: Story = {
	render: () => (
		<Flex align="center" gap="4" height="48px">
			<Text size="2">Home</Text>
			<Separator orientation="vertical" size="2" />
			<Text size="2">About</Text>
			<Separator orientation="vertical" size="2" />
			<Text size="2">Contact</Text>
		</Flex>
	),
};

export const Decorative: Story = {
	render: () => (
		<Flex direction="column" align="center" gap="4" maxWidth="400px">
			<Text size="4" weight="bold">
				Section Title
			</Text>
			<Separator size="4" decorative />
			<Text size="2">
				Decorative separators are hidden from screen readers.
			</Text>
		</Flex>
	),
};
