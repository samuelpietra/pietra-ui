import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Progress, Text } from "@/components";

const RADII = ["none", "small", "medium", "large", "full"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["classic", "surface", "soft"] as const;

const meta: Meta<typeof Progress> = {
	title: "Components/Progress",
	component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
	render: () => <Progress aria-label="Default progress" value={65} />,
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="4" style={{ maxWidth: 300 }}>
			{SIZES.map((size, index) => {
				const value = (index + 1) * 25;
				return (
					<Flex key={size} direction="column" gap="1">
						<Text size="2" weight="bold">
							size: {size} — {value}%
						</Text>
						<Progress
							aria-label={`Progress size ${size}`}
							size={size}
							value={value}
						/>
					</Flex>
				);
			})}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex direction="column" gap="4" style={{ maxWidth: 300 }}>
			{VARIANTS.map((variant, index) => {
				const value = (index + 1) * 25;
				return (
					<Flex key={variant} direction="column" gap="1">
						<Text size="2" weight="bold">
							{variant} — {value}%
						</Text>
						<Progress
							aria-label={`Progress variant ${variant}`}
							variant={variant}
							value={value}
						/>
					</Flex>
				);
			})}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{SAMPLE_COLORS.map((color, index) => (
				<Progress
					aria-label={`Progress color ${color}`}
					key={color}
					color={color}
					value={(index + 1) * 20}
				/>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{SAMPLE_COLORS.map((color, index) => {
				const value = (index + 1) * 20;
				return (
					<Flex key={color} direction="column" gap="1">
						<Progress
							aria-label={`Progress color ${color}`}
							color={color}
							value={value}
						/>
						<Progress
							aria-label={`Progress color ${color} high contrast`}
							color={color}
							value={value}
							highContrast
						/>
					</Flex>
				);
			})}
		</Flex>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{RADII.map((radius, index) => {
				const value = (index + 1) * 15;
				return (
					<Flex key={radius} direction="column" gap="1">
						<Text size="2" weight="bold">
							{radius} — {value}%
						</Text>
						<Progress
							aria-label={`Progress radius ${radius}`}
							radius={radius}
							value={value}
						/>
					</Flex>
				);
			})}
		</Flex>
	),
};

export const Duration: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			<Text size="2" weight="bold">
				Indeterminate (no value)
			</Text>
			<Progress aria-label="Progress indeterminate" />
			<Text size="2" weight="bold">
				Custom duration: 5s
			</Text>
			<Progress aria-label="Progress custom duration" duration="5s" />
		</Flex>
	),
};
