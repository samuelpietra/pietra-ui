import type { Meta, StoryObj } from "@storybook/react";

import { Flex, RadioCards, Text } from "@/components";

const meta: Meta<typeof RadioCards.Root> = {
	title: "Components/RadioCards",
	component: RadioCards.Root,
};

export default meta;
type Story = StoryObj<typeof RadioCards.Root>;

const PLANS = [
	{ value: "8-core", cpu: "8-core CPU", ram: "32 GB RAM" },
	{ value: "6-core", cpu: "6-core CPU", ram: "24 GB RAM" },
	{ value: "4-core", cpu: "4-core CPU", ram: "16 GB RAM" },
] as const;

const SHORT_PLANS = PLANS.slice(0, 2);

function PlanItem({ cpu, ram }: { cpu: string; ram: string }) {
	return (
		<Flex direction="column" width="100%">
			<Text weight="bold">{cpu}</Text>
			<Text size="2" color="gray">
				{ram}
			</Text>
		</Flex>
	);
}

export const Default: Story = {
	render: () => (
		<RadioCards.Root defaultValue="8-core" columns="3">
			{PLANS.map(({ value, cpu, ram }) => (
				<RadioCards.Item key={value} value={value}>
					<PlanItem cpu={cpu} ram={ram} />
				</RadioCards.Item>
			))}
		</RadioCards.Root>
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
					<RadioCards.Root size={size} defaultValue="8-core" columns="2">
						{SHORT_PLANS.map(({ value, cpu, ram }) => (
							<RadioCards.Item key={value} value={value}>
								<PlanItem cpu={cpu} ram={ram} />
							</RadioCards.Item>
						))}
					</RadioCards.Root>
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
					<RadioCards.Root variant={variant} defaultValue="8-core" columns="2">
						{SHORT_PLANS.map(({ value, cpu, ram }) => (
							<RadioCards.Item key={value} value={value}>
								<PlanItem cpu={cpu} ram={ram} />
							</RadioCards.Item>
						))}
					</RadioCards.Root>
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
				<RadioCards.Root
					key={color}
					color={color}
					defaultValue="8-core"
					columns="2"
				>
					{SHORT_PLANS.map(({ value, cpu, ram }) => (
						<RadioCards.Item key={value} value={value}>
							<PlanItem cpu={cpu} ram={ram} />
						</RadioCards.Item>
					))}
				</RadioCards.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 400 }}>
			<RadioCards.Root defaultValue="8-core" columns="2">
				{SHORT_PLANS.map(({ value, cpu, ram }) => (
					<RadioCards.Item key={value} value={value}>
						<PlanItem cpu={cpu} ram={ram} />
					</RadioCards.Item>
				))}
			</RadioCards.Root>
			<RadioCards.Root defaultValue="8-core" columns="2" highContrast>
				{SHORT_PLANS.map(({ value, cpu, ram }) => (
					<RadioCards.Item key={value} value={value}>
						<PlanItem cpu={cpu} ram={ram} />
					</RadioCards.Item>
				))}
			</RadioCards.Root>
		</Flex>
	),
};

export const Columns: Story = {
	render: () => (
		<Flex direction="column" gap="5" style={{ maxWidth: 600 }}>
			{(["1", "2", "3"] as const).map((columns) => (
				<Flex key={columns} direction="column" gap="1">
					<Text weight="bold" size="2">
						columns: {columns}
					</Text>
					<RadioCards.Root defaultValue="8-core" columns={columns}>
						{PLANS.map(({ value, cpu, ram }) => (
							<RadioCards.Item key={value} value={value}>
								<PlanItem cpu={cpu} ram={ram} />
							</RadioCards.Item>
						))}
					</RadioCards.Root>
				</Flex>
			))}
		</Flex>
	),
};
