import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Text } from "@/components";

import { Cell, makeCells } from "./helpers";

const meta: Meta<typeof Flex> = {
	title: "Layout/Flex",
	component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
	render: () => (
		<Flex gap="3">
			<Cell>One</Cell>
			<Cell>Two</Cell>
			<Cell>Three</Cell>
		</Flex>
	),
};

const DIRECTIONS = ["column", "row"] as const;

export const Direction: Story = {
	render: () => (
		<Flex gap="3">
			{DIRECTIONS.map((direction) => (
				<Flex key={direction} gap="3" direction="column" width="25%">
					<Text weight="bold">{direction}</Text>
					<Flex gap="3" direction={direction}>
						<Cell>One</Cell>
						<Cell>Two</Cell>
						<Cell>Three</Cell>
					</Flex>
				</Flex>
			))}
		</Flex>
	),
};

const ALIGNS = ["start", "center", "end"] as const;

export const Align: Story = {
	render: () => (
		<Flex gap="3">
			{ALIGNS.map((align) => (
				<Flex key={align} gap="3" direction="column" width="33%">
					<Text weight="bold">{align}</Text>
					<Flex
						gap="3"
						align={align}
						style={{ height: 100, background: "var(--gray-a2)" }}
					>
						<Cell p="2">Small</Cell>
						<Cell>Medium</Cell>
						<Cell p="6">Large</Cell>
					</Flex>
				</Flex>
			))}
		</Flex>
	),
};

const JUSTIFIES = ["start", "center", "between", "end"] as const;

export const Justify: Story = {
	render: () => (
		<Flex gap="3">
			{JUSTIFIES.map((justify) => (
				<Flex key={justify} gap="3" direction="column" width="25%">
					<Text weight="bold">{justify}</Text>
					<Flex
						gap="3"
						justify={justify}
						style={{ background: "var(--gray-a2)" }}
					>
						<Cell>One</Cell>
						<Cell>Two</Cell>
					</Flex>
				</Flex>
			))}
		</Flex>
	),
};

export const Wrap: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap" style={{ width: 300 }}>
			{makeCells(6)}
		</Flex>
	),
};
