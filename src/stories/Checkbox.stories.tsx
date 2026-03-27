import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Grid, Text } from "@/components";

const DISABLED_STATES = [
	{ disabled: false, defaultChecked: false, label: "Not checked" },
	{ disabled: false, defaultChecked: true, label: "Checked" },
	{ disabled: true, defaultChecked: false, label: "Not checked" },
	{ disabled: true, defaultChecked: true, label: "Checked" },
] as const;
const SIZES = ["1", "2", "3"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson", "gray"] as const;
const VARIANTS = ["classic", "surface", "soft"] as const;

const meta: Meta<typeof Checkbox> = {
	title: "Components/Checkbox",
	component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	render: () => <Checkbox defaultChecked />,
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Checkbox key={size} size={size} defaultChecked />
			))}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex gap="4" align="center">
			{VARIANTS.map((variant) => (
				<Flex key={variant} gap="2">
					<Checkbox variant={variant} defaultChecked />
					<Checkbox variant={variant} />
				</Flex>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<Checkbox key={color} color={color} defaultChecked />
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Grid columns="5" display="inline-grid" gap="3">
			{SAMPLE_COLORS.map((color) => (
				<Fragment key={color}>
					<Checkbox color={color} defaultChecked />
					<Checkbox color={color} defaultChecked highContrast />
				</Fragment>
			))}
		</Grid>
	),
};

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
					<Flex as="span" gap="2">
						<Checkbox disabled={disabled} defaultChecked={defaultChecked} />
						{label}
					</Flex>
				</Text>
			))}
		</Flex>
	),
};

export const Indeterminate: Story = {
	render: () => (
		<Flex gap="2">
			<Checkbox defaultChecked="indeterminate" />
			<Checkbox checked="indeterminate" />
		</Flex>
	),
};
