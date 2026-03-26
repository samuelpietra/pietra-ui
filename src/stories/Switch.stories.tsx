import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Grid, Switch, Text } from "@/components";

const meta: Meta<typeof Switch> = {
	title: "Components/Switch",
	component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	render: () => (
		<Text as="label" size="2">
			<Flex as="span" gap="2" align="center">
				<Switch defaultChecked />
				Enable notifications
			</Flex>
		</Text>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Switch key={size} size={size} defaultChecked />
			))}
		</Flex>
	),
};

const VARIANTS = ["classic", "surface", "soft"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{VARIANTS.map((variant) => (
				<Flex key={variant} gap="2">
					<Switch variant={variant} defaultChecked />
					<Switch variant={variant} />
				</Flex>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson", "gray"] as const;

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<Switch key={color} color={color} defaultChecked />
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Grid columns="5" display="inline-grid" gap="3">
			{SAMPLE_COLORS.map((color) => (
				<Fragment key={color}>
					<Switch color={color} defaultChecked />
					<Switch color={color} defaultChecked highContrast />
				</Fragment>
			))}
		</Grid>
	),
};

const RADII = ["none", "small", "medium", "large", "full"] as const;

export const Radius: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{RADII.map((radius) => (
				<Switch key={radius} radius={radius} defaultChecked />
			))}
		</Flex>
	),
};

const DISABLED_STATES = [
	{ disabled: false, defaultChecked: false, label: "Off" },
	{ disabled: false, defaultChecked: true, label: "On" },
	{ disabled: true, defaultChecked: false, label: "Off" },
	{ disabled: true, defaultChecked: true, label: "On" },
] as const;

export const Disabled: Story = {
	render: () => (
		<Flex direction="column" gap="2">
			{DISABLED_STATES.map(({ disabled, defaultChecked, label }) => (
				<Text
					key={`${disabled}-${defaultChecked}`}
					as="label"
					size="2"
					color={disabled ? "gray" : undefined}
				>
					<Flex as="span" gap="2" align="center">
						<Switch disabled={disabled} defaultChecked={defaultChecked} />
						{label}
					</Flex>
				</Text>
			))}
		</Flex>
	),
};
