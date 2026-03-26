import type { Meta, StoryObj } from "@storybook/react";

import { Button, DropdownMenu, Flex } from "@/components";

const meta: Meta<typeof DropdownMenu.Root> = {
	title: "Components/DropdownMenu",
	component: DropdownMenu.Root,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu.Root>;

export const Default: Story = {
	render: () => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Options
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
				<DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item shortcut="⌘ ⌫" color="red">
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

const SIZES = ["1", "2"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3">
			{SIZES.map((size) => (
				<DropdownMenu.Root key={size}>
					<DropdownMenu.Trigger>
						<Button variant="soft" size={size}>
							Size {size}
							<DropdownMenu.TriggerIcon />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content size={size}>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			))}
		</Flex>
	),
};

const VARIANTS = ["solid", "soft"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3">
			{VARIANTS.map((variant) => (
				<DropdownMenu.Root key={variant}>
					<DropdownMenu.Trigger>
						<Button variant="soft">
							{variant}
							<DropdownMenu.TriggerIcon />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content variant={variant}>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			))}
		</Flex>
	),
};

export const WithLabelsAndGroups: Story = {
	render: () => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Actions
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>File</DropdownMenu.Label>
					<DropdownMenu.Item>New</DropdownMenu.Item>
					<DropdownMenu.Item>Open</DropdownMenu.Item>
					<DropdownMenu.Item>Save</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Label>Edit</DropdownMenu.Label>
					<DropdownMenu.Item>Undo</DropdownMenu.Item>
					<DropdownMenu.Item>Redo</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

export const WithCheckboxItems: Story = {
	render: () => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					View
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.CheckboxItem checked>
					Show toolbar
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem>Show sidebar</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem checked>
					Show statusbar
				</DropdownMenu.CheckboxItem>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

export const WithRadioItems: Story = {
	render: () => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Sort by
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.RadioGroup value="date">
					<DropdownMenu.RadioItem value="date">Date</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="size">Size</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

export const WithSubmenu: Story = {
	render: () => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft">
					Options
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>New file</DropdownMenu.Item>
				<DropdownMenu.Item>Open file</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>Share</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>Email</DropdownMenu.Item>
						<DropdownMenu.Item>Slack</DropdownMenu.Item>
						<DropdownMenu.Item>Copy link</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
				<DropdownMenu.Separator />
				<DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange"] as const;

export const Color: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<DropdownMenu.Root key={color}>
					<DropdownMenu.Trigger>
						<Button variant="soft" color={color}>
							{color}
							<DropdownMenu.TriggerIcon />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content color={color}>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<DropdownMenu.Root key={color}>
					<DropdownMenu.Trigger>
						<Button variant="soft" color={color} highContrast>
							{color}
							<DropdownMenu.TriggerIcon />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content color={color} highContrast>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			))}
		</Flex>
	),
};
