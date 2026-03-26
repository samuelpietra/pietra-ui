import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Grid, Radio, Text } from "@/components";

import { SAMPLE_COLORS, SIZES } from "./fixtures";

const meta: Meta<typeof Radio> = {
	title: "Components/Radio",
	component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

const DENSITY_OPTIONS = [
	{ value: "default", label: "Default" },
	{ value: "comfortable", label: "Comfortable" },
	{ value: "compact", label: "Compact", defaultChecked: true },
] as const;

export const Default: Story = {
	render: () => (
		<Flex direction="column" gap="2">
			{DENSITY_OPTIONS.map(({ value, label, ...rest }) => (
				<Text key={value} as="label" size="2">
					<Flex as="span" gap="2">
						<Radio name="density" value={value} {...rest} />
						{label}
					</Flex>
				</Text>
			))}
		</Flex>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Radio key={size} size={size} value={size} defaultChecked />
			))}
		</Flex>
	),
};

const VARIANTS = ["classic", "surface", "soft"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{VARIANTS.map((variant) => (
				<Radio key={variant} variant={variant} value={variant} defaultChecked />
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<Radio key={color} color={color} value={color} defaultChecked />
			))}
		</Flex>
	),
};

const DISABLED_STATES = [
	{ disabled: false, defaultChecked: false, label: "Not checked" },
	{ disabled: false, defaultChecked: true, label: "Checked" },
	{ disabled: true, defaultChecked: false, label: "Not checked" },
	{ disabled: true, defaultChecked: true, label: "Checked" },
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
					<Flex as="span" gap="2">
						<Radio
							value={`${disabled}-${defaultChecked}`}
							disabled={disabled}
							defaultChecked={defaultChecked}
						/>
						{label}
					</Flex>
				</Text>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Grid columns="5" display="inline-grid" gap="3">
			{SAMPLE_COLORS.map((color) => (
				<Fragment key={color}>
					<Radio color={color} value={color} defaultChecked />
					<Radio
						color={color}
						value={`${color}-hc`}
						defaultChecked
						highContrast
					/>
				</Fragment>
			))}
		</Grid>
	),
};
