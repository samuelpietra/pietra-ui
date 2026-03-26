import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxGroup, Flex, Text } from "@/components";

const meta: Meta<typeof CheckboxGroup.Root> = {
	title: "Components/CheckboxGroup",
	component: CheckboxGroup.Root,
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup.Root>;

export const Default: Story = {
	render: () => (
		<CheckboxGroup.Root defaultValue={["react"]}>
			<CheckboxGroup.Item value="react">React</CheckboxGroup.Item>
			<CheckboxGroup.Item value="vue">Vue</CheckboxGroup.Item>
			<CheckboxGroup.Item value="svelte">Svelte</CheckboxGroup.Item>
		</CheckboxGroup.Root>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="5">
			{SIZES.map((size) => (
				<Flex key={size} direction="column" gap="1">
					<Text weight="bold" size="2">
						size: {size}
					</Text>
					<CheckboxGroup.Root size={size} defaultValue={["1"]}>
						<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
						<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
					</CheckboxGroup.Root>
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
					<CheckboxGroup.Root variant={variant} defaultValue={["1"]}>
						<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
						<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
					</CheckboxGroup.Root>
				</Flex>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson", "gray"] as const;

export const Color: Story = {
	render: () => (
		<Flex gap="5">
			{SAMPLE_COLORS.map((color) => (
				<CheckboxGroup.Root key={color} color={color} defaultValue={["1"]}>
					<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
					<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
				</CheckboxGroup.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="5">
			<Flex gap="5">
				{SAMPLE_COLORS.map((color) => (
					<CheckboxGroup.Root key={color} color={color} defaultValue={["1"]}>
						<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
						<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
					</CheckboxGroup.Root>
				))}
			</Flex>
			<Flex gap="5">
				{SAMPLE_COLORS.map((color) => (
					<CheckboxGroup.Root
						key={color}
						color={color}
						highContrast
						defaultValue={["1"]}
					>
						<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
						<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
					</CheckboxGroup.Root>
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
				<CheckboxGroup.Root disabled defaultValue={["1"]}>
					<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
					<CheckboxGroup.Item value="2">Option 2</CheckboxGroup.Item>
				</CheckboxGroup.Root>
			</Flex>
			<Flex direction="column" gap="1">
				<Text weight="bold" size="2">
					Item disabled
				</Text>
				<CheckboxGroup.Root defaultValue={["1"]}>
					<CheckboxGroup.Item value="1">Option 1</CheckboxGroup.Item>
					<CheckboxGroup.Item value="2" disabled>
						Option 2
					</CheckboxGroup.Item>
				</CheckboxGroup.Root>
			</Flex>
		</Flex>
	),
};
