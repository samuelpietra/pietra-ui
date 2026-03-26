import { Fragment } from "react";
import { PawPrint } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Grid, Text } from "@/components";

import frenchieYellow from "./assets/frenchie-yellow.png";
import { RADII, SAMPLE_COLORS } from "./fixtures";

const meta: Meta<typeof Avatar> = {
	title: "Components/Avatar",
	component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	render: () => (
		<Flex gap="3" align="center">
			<Avatar src={frenchieYellow} fallback="SP" />
			<Avatar fallback="SP" />
		</Flex>
	),
};

const SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Flex key={size} direction="column" gap="1" align="center">
					<Avatar src={frenchieYellow} size={size} fallback={size} />
					<Text size="2">{size}</Text>
				</Flex>
			))}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex gap="3">
			<Avatar variant="solid" fallback="SP" />
			<Avatar variant="soft" fallback="SP" />
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<Avatar key={color} variant="solid" color={color} fallback="SP" />
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Grid rows="2" gap="3" display="inline-grid" flow="column">
			{SAMPLE_COLORS.map((color) => (
				<Fragment key={color}>
					<Avatar variant="solid" color={color} fallback="SP" />
					<Avatar variant="solid" color={color} fallback="SP" highContrast />
				</Fragment>
			))}
		</Grid>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex gap="3">
			{RADII.map((radius) => (
				<Avatar key={radius} radius={radius} fallback="SP" />
			))}
		</Flex>
	),
};

export const Fallback: Story = {
	render: () => (
		<Flex gap="3">
			<Avatar fallback="SP" />
			<Avatar fallback="SP" />
			<Avatar fallback={<PawPrint size={16} />} />
		</Flex>
	),
};
