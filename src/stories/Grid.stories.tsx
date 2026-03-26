import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Grid, Text } from "@/components";

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

const COLUMN_COUNTS = ["2", "3", "4"] as const;

export const Columns: Story = {
	render: () => (
		<Grid columns="3" gap="3">
			{COLUMN_COUNTS.map((cols) => (
				<Flex key={cols} gap="3" direction="column">
					<Text weight="bold">{cols} columns</Text>
					<Grid columns={cols} gap="3">
						{makeCells(Number(cols) * 2)}
					</Grid>
				</Flex>
			))}
		</Grid>
	),
};

const GAPS = ["1", "3", "6"] as const;

export const Gap: Story = {
	render: () => (
		<Grid columns="3" gap="3">
			{GAPS.map((gap) => (
				<Flex key={gap} gap="3" direction="column">
					<Text weight="bold">gap: {gap}</Text>
					<Grid columns="3" gap={gap}>
						{makeCells(3)}
					</Grid>
				</Flex>
			))}
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
