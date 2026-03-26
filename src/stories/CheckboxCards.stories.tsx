import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxCards, Flex, Text } from "@/components";

const meta: Meta<typeof CheckboxCards.Root> = {
	title: "Components/CheckboxCards",
	component: CheckboxCards.Root,
};

export default meta;
type Story = StoryObj<typeof CheckboxCards.Root>;

const ITEMS = ["React", "Vue", "Svelte", "Angular"] as const;
const SHORT_ITEMS = ["React", "Vue"] as const;

export const Default: Story = {
	render: () => (
		<CheckboxCards.Root defaultValue={["React"]} columns="2">
			{ITEMS.map((item) => (
				<CheckboxCards.Item key={item} value={item}>
					{item}
				</CheckboxCards.Item>
			))}
		</CheckboxCards.Root>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 400 }}>
			{SIZES.map((size) => (
				<Flex key={size} direction="column" gap="1">
					<Text weight="bold" size="2">
						size: {size}
					</Text>
					<CheckboxCards.Root size={size} defaultValue={["React"]} columns="2">
						{SHORT_ITEMS.map((item) => (
							<CheckboxCards.Item key={item} value={item}>
								{item}
							</CheckboxCards.Item>
						))}
					</CheckboxCards.Root>
				</Flex>
			))}
		</Flex>
	),
};

const VARIANTS = ["surface", "classic"] as const;

export const Variant: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 400 }}>
			{VARIANTS.map((variant) => (
				<Flex key={variant} direction="column" gap="1">
					<Text weight="bold" size="2">
						{variant}
					</Text>
					<CheckboxCards.Root
						variant={variant}
						defaultValue={["React"]}
						columns="2"
					>
						{SHORT_ITEMS.map((item) => (
							<CheckboxCards.Item key={item} value={item}>
								{item}
							</CheckboxCards.Item>
						))}
					</CheckboxCards.Root>
				</Flex>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson", "gray"] as const;

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 400 }}>
			{SAMPLE_COLORS.map((color) => (
				<CheckboxCards.Root
					key={color}
					color={color}
					defaultValue={["React"]}
					columns="2"
				>
					{SHORT_ITEMS.map((item) => (
						<CheckboxCards.Item key={item} value={item}>
							{item}
						</CheckboxCards.Item>
					))}
				</CheckboxCards.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 400 }}>
			<CheckboxCards.Root defaultValue={["React"]} columns="2">
				{SHORT_ITEMS.map((item) => (
					<CheckboxCards.Item key={item} value={item}>
						{item}
					</CheckboxCards.Item>
				))}
			</CheckboxCards.Root>
			<CheckboxCards.Root defaultValue={["React"]} columns="2" highContrast>
				{SHORT_ITEMS.map((item) => (
					<CheckboxCards.Item key={item} value={item}>
						{item}
					</CheckboxCards.Item>
				))}
			</CheckboxCards.Root>
		</Flex>
	),
};

export const Columns: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 600 }}>
			{(["1", "2", "4"] as const).map((columns) => (
				<Flex key={columns} direction="column" gap="1">
					<Text weight="bold" size="2">
						columns: {columns}
					</Text>
					<CheckboxCards.Root defaultValue={["React"]} columns={columns}>
						{ITEMS.map((item) => (
							<CheckboxCards.Item key={item} value={item}>
								{item}
							</CheckboxCards.Item>
						))}
					</CheckboxCards.Root>
				</Flex>
			))}
		</Flex>
	),
};
