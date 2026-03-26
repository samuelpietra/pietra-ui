import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";

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

export const Direction: Story = {
	render: () => (
		<Flex gap="3">
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">Column</Text>
				<Flex gap="3" direction="column">
					<Cell>One</Cell>
					<Cell>Two</Cell>
					<Cell>Three</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">Row</Text>
				<Flex gap="3" direction="row">
					<Cell>One</Cell>
					<Cell>Two</Cell>
					<Cell>Three</Cell>
				</Flex>
			</Flex>
		</Flex>
	),
};

export const Align: Story = {
	render: () => (
		<Flex gap="3">
			<Flex gap="3" direction="column" width="33%">
				<Text weight="bold">Start</Text>
				<Flex
					gap="3"
					align="start"
					style={{ height: 100, background: "var(--gray-a2)" }}
				>
					<Cell p="2">Small</Cell>
					<Cell>Medium</Cell>
					<Cell p="6">Large</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="33%">
				<Text weight="bold">Center</Text>
				<Flex
					gap="3"
					align="center"
					style={{ height: 100, background: "var(--gray-a2)" }}
				>
					<Cell p="2">Small</Cell>
					<Cell>Medium</Cell>
					<Cell p="6">Large</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="33%">
				<Text weight="bold">End</Text>
				<Flex
					gap="3"
					align="end"
					style={{ height: 100, background: "var(--gray-a2)" }}
				>
					<Cell p="2">Small</Cell>
					<Cell>Medium</Cell>
					<Cell p="6">Large</Cell>
				</Flex>
			</Flex>
		</Flex>
	),
};

export const Justify: Story = {
	render: () => (
		<Flex gap="3">
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">Start</Text>
				<Flex gap="3" justify="start" style={{ background: "var(--gray-a2)" }}>
					<Cell>One</Cell>
					<Cell>Two</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">Center</Text>
				<Flex gap="3" justify="center" style={{ background: "var(--gray-a2)" }}>
					<Cell>One</Cell>
					<Cell>Two</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">Between</Text>
				<Flex
					gap="3"
					justify="between"
					style={{ background: "var(--gray-a2)" }}
				>
					<Cell>One</Cell>
					<Cell>Two</Cell>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column" width="25%">
				<Text weight="bold">End</Text>
				<Flex gap="3" justify="end" style={{ background: "var(--gray-a2)" }}>
					<Cell>One</Cell>
					<Cell>Two</Cell>
				</Flex>
			</Flex>
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
