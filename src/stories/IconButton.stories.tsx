import { Heart, Pencil, Search, Share2, Trash2 } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, IconButton } from "@/components";

const RADII = ["none", "large", "full"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2", "3", "4"] as const;
const VARIANTS = [
	"classic",
	"solid",
	"soft",
	"surface",
	"outline",
	"ghost",
] as const;

const meta: Meta<typeof IconButton> = {
	title: "Components/IconButton",
	component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	render: () => (
		<IconButton aria-label="Search button">
			<Search size={16} />
		</IconButton>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<IconButton
					key={size}
					aria-label={`Search button size ${size}`}
					size={size}
				>
					<Search size={Number(size) * 4 + 8} />
				</IconButton>
			))}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{VARIANTS.map((variant) => (
				<IconButton
					key={variant}
					aria-label={`Heart button ${variant}`}
					variant={variant}
				>
					<Heart size={16} />
				</IconButton>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<IconButton
					key={color}
					aria-label={`Heart button ${color}`}
					color={color}
					variant="soft"
				>
					<Heart size={16} />
				</IconButton>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Flex gap="3">
				{SAMPLE_COLORS.map((color) => (
					<IconButton
						key={color}
						aria-label={`Heart button ${color}`}
						color={color}
						variant="soft"
					>
						<Heart size={16} />
					</IconButton>
				))}
			</Flex>
			<Flex gap="3">
				{SAMPLE_COLORS.map((color) => (
					<IconButton
						key={color}
						aria-label={`Heart button ${color} high contrast`}
						color={color}
						variant="soft"
						highContrast
					>
						<Heart size={16} />
					</IconButton>
				))}
			</Flex>
		</Flex>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{RADII.map((radius) => (
				<IconButton
					key={radius}
					aria-label={`Heart button ${radius}`}
					radius={radius}
					variant="soft"
				>
					<Heart size={16} />
				</IconButton>
			))}
		</Flex>
	),
};

export const WithDifferentIcons: Story = {
	render: () => (
		<Flex gap="3" align="center">
			<IconButton aria-label="Edit button" variant="soft">
				<Pencil size={16} />
			</IconButton>
			<IconButton aria-label="Share button" variant="soft">
				<Share2 size={16} />
			</IconButton>
			<IconButton aria-label="Delete button" variant="soft" color="red">
				<Trash2 size={16} />
			</IconButton>
		</Flex>
	),
};

export const Loading: Story = {
	render: () => (
		<IconButton aria-label="Search button loading" loading>
			<Search size={16} />
		</IconButton>
	),
};
