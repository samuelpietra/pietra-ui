import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Search } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, IconButton, Text, TextField } from "@/components";

const RADII = ["none", "small", "medium", "large", "full"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["classic", "surface", "soft"] as const;

const meta: Meta<typeof TextField.Root> = {
	title: "Components/TextField",
	component: TextField.Root,
};

export default meta;
type Story = StoryObj<typeof TextField.Root>;

export const Default: Story = {
	render: () => <TextField.Root placeholder="Search…" />,
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{SIZES.map((size) => (
				<Flex key={size} direction="column" gap="1">
					<Text size="2" weight="bold">
						size: {size}
					</Text>
					<TextField.Root
						size={size}
						placeholder={`How it looks with size ${size}?`}
					/>
				</Flex>
			))}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{VARIANTS.map((variant) => (
				<Flex key={variant} direction="column" gap="1">
					<Text size="2" weight="bold">
						{variant}
					</Text>
					<TextField.Root
						variant={variant}
						placeholder={`How it looks with ${variant} variant?`}
					/>
				</Flex>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{SAMPLE_COLORS.map((color) => (
				<TextField.Root
					key={color}
					color={color}
					placeholder={`How it looks with ${color}?`}
					variant="soft"
				/>
			))}
		</Flex>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			{RADII.map((radius) => (
				<TextField.Root
					key={radius}
					radius={radius}
					placeholder={`How it looks with ${radius} radius?`}
				/>
			))}
		</Flex>
	),
};

export const WithLeftIcon: Story = {
	render: () => (
		<TextField.Root placeholder="Search…" style={{ maxWidth: 300 }}>
			<TextField.Slot>
				<Search size={16} />
			</TextField.Slot>
		</TextField.Root>
	),
};

export const WithRightIcon: Story = {
	render: () => (
		<TextField.Root placeholder="Email" style={{ maxWidth: 300 }}>
			<TextField.Slot side="right">
				<Mail size={16} />
			</TextField.Slot>
		</TextField.Root>
	),
};

function PasswordField() {
	const [visible, setVisible] = useState(false);

	return (
		<TextField.Root
			type={visible ? "text" : "password"}
			placeholder="Password"
			style={{ maxWidth: 300 }}
		>
			<TextField.Slot>
				<Lock size={16} />
			</TextField.Slot>
			<TextField.Slot side="right">
				<IconButton
					aria-label={visible ? "Hide password" : "Show password"}
					size="1"
					variant="ghost"
					onClick={() => setVisible((v) => !v)}
				>
					{visible ? <EyeOff size={16} /> : <Eye size={16} />}
				</IconButton>
			</TextField.Slot>
		</TextField.Root>
	);
}

export const Password: Story = {
	render: () => <PasswordField />,
};

export const Loading: Story = {
	render: () => (
		<Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
			<TextField.Root placeholder="Loading…" loading />
			<TextField.Root placeholder="Loading replaces right icon" loading>
				<TextField.Slot>
					<Search size={16} />
				</TextField.Slot>
				<TextField.Slot side="right">
					<Mail size={16} />
				</TextField.Slot>
			</TextField.Root>
		</Flex>
	),
};

export const Disabled: Story = {
	render: () => (
		<TextField.Root placeholder="Disabled" disabled style={{ maxWidth: 300 }} />
	),
};
