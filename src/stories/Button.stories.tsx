import { BellRing, BookmarkIcon, ThumbsUp } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Spinner } from "@/components";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Button key={size} size={size} variant="soft">
					Size {size}
				</Button>
			))}
		</Flex>
	),
};

const VARIANTS = [
	"classic",
	"solid",
	"soft",
	"surface",
	"outline",
	"ghost",
] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{VARIANTS.map((variant) => (
				<Button key={variant} variant={variant}>
					{variant}
				</Button>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;

export const Color: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<Button key={color} color={color} variant="soft">
					{color}
				</Button>
			))}
		</Flex>
	),
};

const HC_VARIANTS = ["classic", "solid", "soft", "surface", "outline"] as const;

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Flex gap="3">
				{HC_VARIANTS.map((variant) => (
					<Button key={variant} color="gray" variant={variant}>
						{variant}
					</Button>
				))}
			</Flex>
			<Flex gap="3">
				{HC_VARIANTS.map((variant) => (
					<Button key={variant} color="gray" variant={variant} highContrast>
						{variant}
					</Button>
				))}
			</Flex>
		</Flex>
	),
};

const RADII = ["none", "large", "full"] as const;

export const Radius: Story = {
	render: () => (
		<Flex gap="3">
			{RADII.map((radius) => (
				<Button key={radius} radius={radius} variant="soft">
					{radius}
				</Button>
			))}
		</Flex>
	),
};

export const WithIcons: Story = {
	render: () => (
		<Flex gap="3">
			<Button>
				<ThumbsUp size={16} />
				Like
			</Button>
			<Button variant="soft">
				<BellRing size={16} />
				Subscribe
			</Button>
		</Flex>
	),
};

export const Loading: Story = {
	render: () => (
		<Flex gap="3">
			<Button loading>Regular</Button>
			<Button disabled>
				<Spinner loading>
					<BookmarkIcon />
				</Spinner>
				Custom
			</Button>
		</Flex>
	),
};

export const AsChild: Story = {
	render: () => (
		<Button asChild>
			<a href="https://example.com" target="_blank" rel="noopener">
				Link Button
			</a>
		</Button>
	),
};
