import { useState } from "react";
import {
	Laptop,
	Monitor,
	Moon,
	Smartphone,
	Sun,
	SunMoon,
	Tablet,
} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Select } from "@/components";

type IconSelectItem = { label: string; icon: React.ReactNode };

const CONTENT_POSITIONS = ["item-aligned", "popper"] as const;
const DEVICES: Record<string, IconSelectItem> = {
	desktop: { label: "Desktop", icon: <Monitor size={16} /> },
	laptop: { label: "Laptop", icon: <Laptop size={16} /> },
	tablet: { label: "Tablet", icon: <Tablet size={16} /> },
	mobile: { label: "Mobile", icon: <Smartphone size={16} /> },
};
const FRUITS = ["Apple", "Banana", "Orange", "Grape", "Mango"] as const;
const RADII = ["none", "small", "medium", "large", "full"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2", "3"] as const;
const THEMES: Record<string, IconSelectItem> = {
	light: { label: "Light", icon: <Sun size={16} /> },
	dark: { label: "Dark", icon: <Moon size={16} /> },
	system: { label: "System", icon: <SunMoon size={16} /> },
};
const TRIGGER_VARIANTS = ["classic", "surface", "soft", "ghost"] as const;

const meta: Meta<typeof Select.Root> = {
	title: "Components/Select",
	component: Select.Root,
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

function FruitItems() {
	return (
		<>
			{FRUITS.map((fruit) => (
				<Select.Item key={fruit} value={fruit.toLowerCase()}>
					{fruit}
				</Select.Item>
			))}
		</>
	);
}

export const Default: Story = {
	render: () => (
		<Select.Root>
			<Select.Trigger placeholder="Pick a fruit…" />
			<Select.Content>
				<FruitItems />
			</Select.Content>
		</Select.Root>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Select.Root key={size} size={size}>
					<Select.Trigger placeholder={`Size ${size}`} />
					<Select.Content>
						<FruitItems />
					</Select.Content>
				</Select.Root>
			))}
		</Flex>
	),
};

export const TriggerVariant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{TRIGGER_VARIANTS.map((variant) => (
				<Select.Root key={variant}>
					<Select.Trigger placeholder={variant} variant={variant} />
					<Select.Content>
						<FruitItems />
					</Select.Content>
				</Select.Root>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SAMPLE_COLORS.map((color) => (
				<Select.Root key={color}>
					<Select.Trigger placeholder={color} color={color} variant="soft" />
					<Select.Content color={color}>
						<FruitItems />
					</Select.Content>
				</Select.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Flex gap="3">
				{SAMPLE_COLORS.map((color) => (
					<Select.Root key={color}>
						<Select.Trigger placeholder={color} color={color} variant="soft" />
						<Select.Content color={color}>
							<FruitItems />
						</Select.Content>
					</Select.Root>
				))}
			</Flex>
			<Flex gap="3">
				{SAMPLE_COLORS.map((color) => (
					<Select.Root key={color}>
						<Select.Trigger placeholder={color} color={color} variant="soft" />
						<Select.Content color={color} highContrast>
							<FruitItems />
						</Select.Content>
					</Select.Root>
				))}
			</Flex>
		</Flex>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Select.Root>
			<Select.Trigger placeholder="Pick a food…" />
			<Select.Content>
				<Select.Group>
					<Select.Label>Fruits</Select.Label>
					<Select.Item value="apple">Apple</Select.Item>
					<Select.Item value="banana">Banana</Select.Item>
					<Select.Item value="orange">Orange</Select.Item>
				</Select.Group>
				<Select.Separator />
				<Select.Group>
					<Select.Label>Vegetables</Select.Label>
					<Select.Item value="carrot">Carrot</Select.Item>
					<Select.Item value="broccoli">Broccoli</Select.Item>
					<Select.Item value="spinach">Spinach</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{RADII.map((radius) => (
				<Select.Root key={radius}>
					<Select.Trigger placeholder={radius} radius={radius} />
					<Select.Content>
						<FruitItems />
					</Select.Content>
				</Select.Root>
			))}
		</Flex>
	),
};

export const Position: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{CONTENT_POSITIONS.map((position) => (
				<Select.Root key={position}>
					<Select.Trigger placeholder={position} />
					<Select.Content position={position}>
						<FruitItems />
					</Select.Content>
				</Select.Root>
			))}
		</Flex>
	),
};

function IconSelect({
	items,
	defaultValue,
	width = "140px",
}: {
	items: Record<string, IconSelectItem>;
	defaultValue: string;
	width?: string;
}) {
	const [value, setValue] = useState(defaultValue);
	const selected = items[value];

	return (
		<Flex direction="column" width={width}>
			<Select.Root value={value} onValueChange={setValue}>
				<Select.Trigger>
					<Flex as="span" align="center" gap="2">
						{selected.icon}
						{selected.label}
					</Flex>
				</Select.Trigger>
				<Select.Content position="popper">
					{Object.entries(items).map(([key, { label }]) => (
						<Select.Item key={key} value={key}>
							{label}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		</Flex>
	);
}

export const WithIcon: Story = {
	render: () => (
		<Flex gap="3" align="center">
			<IconSelect items={THEMES} defaultValue="light" />
			<IconSelect items={DEVICES} defaultValue="desktop" />
		</Flex>
	),
};

export const Disabled: Story = {
	render: () => (
		<Select.Root disabled>
			<Select.Trigger placeholder="Disabled" />
			<Select.Content>
				<FruitItems />
			</Select.Content>
		</Select.Root>
	),
};
