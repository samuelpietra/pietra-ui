import type { Meta, StoryObj } from "@storybook/react";

import { Box, Flex, Tabs, Text } from "@/components";

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;
const SIZES = ["1", "2"] as const;

const meta: Meta<typeof Tabs.Root> = {
	title: "Components/Tabs",
	component: Tabs.Root,
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
	render: () => (
		<Tabs.Root defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="documents">Documents</Tabs.Trigger>
				<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			</Tabs.List>
			<Box pt="3">
				<Tabs.Content value="account">
					<Text size="2">Manage your account settings and preferences.</Text>
				</Tabs.Content>
				<Tabs.Content value="documents">
					<Text size="2">Access and manage your documents.</Text>
				</Tabs.Content>
				<Tabs.Content value="settings">
					<Text size="2">Configure your application settings.</Text>
				</Tabs.Content>
			</Box>
		</Tabs.Root>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			{SIZES.map((size) => (
				<Tabs.Root key={size} defaultValue="tab1">
					<Tabs.List size={size}>
						<Tabs.Trigger value="tab1">Size {size}</Tabs.Trigger>
						<Tabs.Trigger value="tab2">Second</Tabs.Trigger>
						<Tabs.Trigger value="tab3">Third</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="tab1" />
					<Tabs.Content value="tab2" />
					<Tabs.Content value="tab3" />
				</Tabs.Root>
			))}
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			{SAMPLE_COLORS.map((color) => (
				<Tabs.Root key={color} defaultValue="tab1">
					<Tabs.List color={color}>
						<Tabs.Trigger value="tab1">{color}</Tabs.Trigger>
						<Tabs.Trigger value="tab2">Second</Tabs.Trigger>
						<Tabs.Trigger value="tab3">Third</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="tab1" />
					<Tabs.Content value="tab2" />
					<Tabs.Content value="tab3" />
				</Tabs.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			{SAMPLE_COLORS.map((color) => (
				<Flex key={color} gap="4">
					<Tabs.Root defaultValue="tab1">
						<Tabs.List color={color}>
							<Tabs.Trigger value="tab1">{color}</Tabs.Trigger>
							<Tabs.Trigger value="tab2">Second</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab1" />
						<Tabs.Content value="tab2" />
					</Tabs.Root>
					<Tabs.Root defaultValue="tab1">
						<Tabs.List color={color} highContrast>
							<Tabs.Trigger value="tab1">{color}</Tabs.Trigger>
							<Tabs.Trigger value="tab2">Second</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab1" />
						<Tabs.Content value="tab2" />
					</Tabs.Root>
				</Flex>
			))}
		</Flex>
	),
};

export const Wrap: Story = {
	render: () => (
		<Box maxWidth="300px">
			<Tabs.Root defaultValue="tab1">
				<Tabs.List wrap="wrap">
					<Tabs.Trigger value="tab1">Account</Tabs.Trigger>
					<Tabs.Trigger value="tab2">Documents</Tabs.Trigger>
					<Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
					<Tabs.Trigger value="tab4">Notifications</Tabs.Trigger>
					<Tabs.Trigger value="tab5">Billing</Tabs.Trigger>
					<Tabs.Trigger value="tab6">Security</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab1" />
				<Tabs.Content value="tab2" />
				<Tabs.Content value="tab3" />
				<Tabs.Content value="tab4" />
				<Tabs.Content value="tab5" />
				<Tabs.Content value="tab6" />
			</Tabs.Root>
		</Box>
	),
};

export const Justified: Story = {
	render: () => (
		<Tabs.Root defaultValue="tab1">
			<Tabs.List justify="center">
				<Tabs.Trigger value="tab1">Account</Tabs.Trigger>
				<Tabs.Trigger value="tab2">Documents</Tabs.Trigger>
				<Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="tab1" />
			<Tabs.Content value="tab2" />
			<Tabs.Content value="tab3" />
		</Tabs.Root>
	),
};

export const Disabled: Story = {
	render: () => (
		<Tabs.Root defaultValue="account">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="documents" disabled>
					Documents
				</Tabs.Trigger>
				<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account" />
			<Tabs.Content value="documents" />
			<Tabs.Content value="settings" />
		</Tabs.Root>
	),
};
