import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Callout, Flex } from "@/components";

const meta: Meta<typeof Callout.Root> = {
	title: "Components/Callout",
	component: Callout.Root,
};

export default meta;
type Story = StoryObj<typeof Callout.Root>;

export const Default: Story = {
	render: () => (
		<Callout.Root>
			<Callout.Icon>
				<Info size={16} />
			</Callout.Icon>
			<Callout.Text>
				You will need admin privileges to install and access this application.
			</Callout.Text>
		</Callout.Root>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
			{SIZES.map((size) => (
				<Callout.Root key={size} size={size}>
					<Callout.Icon>
						<Info size={16} />
					</Callout.Icon>
					<Callout.Text>This is a size {size} callout.</Callout.Text>
				</Callout.Root>
			))}
		</Flex>
	),
};

const VARIANTS = ["soft", "surface", "outline"] as const;

export const Variant: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
			{VARIANTS.map((variant) => (
				<Callout.Root key={variant} variant={variant}>
					<Callout.Icon>
						<Info size={16} />
					</Callout.Icon>
					<Callout.Text>This is a {variant} variant callout.</Callout.Text>
				</Callout.Root>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["blue", "green", "yellow", "red"] as const;

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
			{SAMPLE_COLORS.map((color) => (
				<Callout.Root key={color} color={color}>
					<Callout.Icon>
						<Info size={16} />
					</Callout.Icon>
					<Callout.Text>This is a {color} callout message.</Callout.Text>
				</Callout.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
			{SAMPLE_COLORS.map((color) => (
				<Callout.Root key={color} color={color} highContrast>
					<Callout.Icon>
						<Info size={16} />
					</Callout.Icon>
					<Callout.Text>This is a {color} high contrast callout.</Callout.Text>
				</Callout.Root>
			))}
		</Flex>
	),
};

export const WithDifferentIcons: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
			<Callout.Root color="blue">
				<Callout.Icon>
					<Info size={16} />
				</Callout.Icon>
				<Callout.Text>This is an informational message.</Callout.Text>
			</Callout.Root>
			<Callout.Root color="green">
				<Callout.Icon>
					<CircleCheck size={16} />
				</Callout.Icon>
				<Callout.Text>This is a success message.</Callout.Text>
			</Callout.Root>
			<Callout.Root color="yellow">
				<Callout.Icon>
					<TriangleAlert size={16} />
				</Callout.Icon>
				<Callout.Text>This is a warning message.</Callout.Text>
			</Callout.Root>
			<Callout.Root color="red">
				<Callout.Icon>
					<CircleX size={16} />
				</Callout.Icon>
				<Callout.Text>This is an error message.</Callout.Text>
			</Callout.Root>
		</Flex>
	),
};
