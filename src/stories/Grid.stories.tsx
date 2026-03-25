import { Text } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@/components/Flex";
import { Grid } from "@/components/Grid";

import { Cell, makeCells } from "./helpers";

const meta: Meta<typeof Grid> = {
	title: "Layout/Grid",
	component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	render: () => (
		<Grid columns="3" gap="3">
			{makeCells(6)}
		</Grid>
	),
};

export const Columns: Story = {
	render: () => (
		<Grid columns="3" gap="3">
			<Flex gap="3" direction="column">
				<Text weight="bold">2 columns</Text>
				<Grid columns="2" gap="3">
					{makeCells(4)}
				</Grid>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">3 columns</Text>
				<Grid columns="3" gap="3">
					{makeCells(6)}
				</Grid>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">4 columns</Text>
				<Grid columns="4" gap="3">
					{makeCells(4)}
				</Grid>
			</Flex>
		</Grid>
	),
};

export const Gap: Story = {
	render: () => (
		<Grid columns="3" gap="3">
			<Flex gap="3" direction="column">
				<Text weight="bold">gap: 1</Text>
				<Grid columns="3" gap="1">
					{makeCells(3)}
				</Grid>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">gap: 3</Text>
				<Grid columns="3" gap="3">
					{makeCells(3)}
				</Grid>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">gap: 6</Text>
				<Grid columns="3" gap="6">
					{makeCells(3)}
				</Grid>
			</Flex>
		</Grid>
	),
};

export const Span: Story = {
	render: () => (
		<Grid columns="4" gap="3">
			<Cell
				style={{
					border: "1px dotted var(--gray-a7)",
					gridColumn: "span 2",
				}}
			>
				span: 2
			</Cell>
			{makeCells(3)}
			<Cell
				style={{
					border: "1px dotted var(--gray-a7)",
					gridColumn: "span 3",
				}}
			>
				span: 3
			</Cell>
		</Grid>
	),
};
