import type { Meta, StoryObj } from "@storybook/react";

import { Flex, RadioGroup, Text } from "@/components";

import { SAMPLE_COLORS, SIZES } from "./fixtures";

const meta: Meta<typeof RadioGroup.Root> = {
	title: "Components/RadioGroup",
	component: RadioGroup.Root,
};

export default meta;
type Story = StoryObj<typeof RadioGroup.Root>;

export const Default: Story = {
	render: () => (
		<RadioGroup.Root defaultValue="react">
			<RadioGroup.Item value="react">React</RadioGroup.Item>
			<RadioGroup.Item value="vue">Vue</RadioGroup.Item>
			<RadioGroup.Item value="svelte">Svelte</RadioGroup.Item>
		</RadioGroup.Root>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="5">
			{SIZES.map((size) => (
				<Flex key={size} direction="column" gap="1">
					<Text weight="bold" size="2">
						size: {size}
					</Text>
					<RadioGroup.Root size={size} defaultValue="1">
						<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
						<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
					</RadioGroup.Root>
				</Flex>
			))}
		</Flex>
	),
};

const VARIANTS = ["classic", "surface", "soft"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="5">
			{VARIANTS.map((variant) => (
				<Flex key={variant} direction="column" gap="1">
					<Text weight="bold" size="2">
						{variant}
					</Text>
					<RadioGroup.Root variant={variant} defaultValue="1">
						<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
						<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
					</RadioGroup.Root>
				</Flex>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="5">
			{SAMPLE_COLORS.map((color) => (
				<RadioGroup.Root key={color} color={color} defaultValue="1">
					<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
					<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
				</RadioGroup.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="5">
			<Flex gap="5">
				{SAMPLE_COLORS.map((color) => (
					<RadioGroup.Root key={color} color={color} defaultValue="1">
						<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
						<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
					</RadioGroup.Root>
				))}
			</Flex>
			<Flex gap="5">
				{SAMPLE_COLORS.map((color) => (
					<RadioGroup.Root
						key={color}
						color={color}
						highContrast
						defaultValue="1"
					>
						<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
						<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
					</RadioGroup.Root>
				))}
			</Flex>
		</Flex>
	),
};

export const Disabled: Story = {
	render: () => (
		<Flex gap="5">
			<Flex direction="column" gap="1">
				<Text weight="bold" size="2">
					Group disabled
				</Text>
				<RadioGroup.Root disabled defaultValue="1">
					<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
					<RadioGroup.Item value="2">Option 2</RadioGroup.Item>
				</RadioGroup.Root>
			</Flex>
			<Flex direction="column" gap="1">
				<Text weight="bold" size="2">
					Item disabled
				</Text>
				<RadioGroup.Root defaultValue="1">
					<RadioGroup.Item value="1">Option 1</RadioGroup.Item>
					<RadioGroup.Item value="2" disabled>
						Option 2
					</RadioGroup.Item>
				</RadioGroup.Root>
			</Flex>
		</Flex>
	),
};
