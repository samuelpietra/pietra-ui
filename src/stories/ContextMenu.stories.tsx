import type { Meta, StoryObj } from "@storybook/react";

import { ContextMenu, Flex } from "@/components";

const SIZES = ["1", "2"] as const;
const VARIANTS = ["solid", "soft"] as const;
const SAMPLE_COLORS = ["indigo", "cyan", "orange"] as const;

const meta: Meta<typeof ContextMenu.Root> = {
	title: "Components/ContextMenu",
	component: ContextMenu.Root,
};

export default meta;
type Story = StoryObj<typeof ContextMenu.Root>;

const TriggerArea = ({
	label = "Right-click here",
	...props
}: { label?: string } & React.ComponentPropsWithoutRef<"div">) => (
	<div
		{...props}
		style={{
			width: 300,
			height: 150,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			border: "2px dashed var(--gray-6)",
			borderRadius: "var(--radius-2)",
			color: "var(--gray-9)",
			...props.style,
		}}
	>
		{label}
	</div>
);

export const Default: Story = {
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<TriggerArea />
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
				<ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="⌘ ⌫" color="red">
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
};

export const Size: Story = {
	render: () => (
		<Flex gap="3">
			{SIZES.map((size) => (
				<ContextMenu.Root key={size}>
					<ContextMenu.Trigger>
						<TriggerArea label={`Size ${size}`} />
					</ContextMenu.Trigger>
					<ContextMenu.Content size={size}>
						<ContextMenu.Item>Edit</ContextMenu.Item>
						<ContextMenu.Item>Duplicate</ContextMenu.Item>
						<ContextMenu.Item>Delete</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			))}
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex gap="3">
			{VARIANTS.map((variant) => (
				<ContextMenu.Root key={variant}>
					<ContextMenu.Trigger>
						<TriggerArea label={variant} />
					</ContextMenu.Trigger>
					<ContextMenu.Content variant={variant}>
						<ContextMenu.Item>Edit</ContextMenu.Item>
						<ContextMenu.Item>Duplicate</ContextMenu.Item>
						<ContextMenu.Item>Delete</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			))}
		</Flex>
	),
};

export const WithLabelsAndGroups: Story = {
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<TriggerArea />
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Group>
					<ContextMenu.Label>File</ContextMenu.Label>
					<ContextMenu.Item>New</ContextMenu.Item>
					<ContextMenu.Item>Open</ContextMenu.Item>
					<ContextMenu.Item>Save</ContextMenu.Item>
				</ContextMenu.Group>
				<ContextMenu.Separator />
				<ContextMenu.Group>
					<ContextMenu.Label>Edit</ContextMenu.Label>
					<ContextMenu.Item>Undo</ContextMenu.Item>
					<ContextMenu.Item>Redo</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
};

export const WithCheckboxItems: Story = {
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<TriggerArea />
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.CheckboxItem checked>
					Show toolbar
				</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem>Show sidebar</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem checked>
					Show statusbar
				</ContextMenu.CheckboxItem>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
};

export const WithRadioItems: Story = {
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<TriggerArea />
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.RadioGroup value="date">
					<ContextMenu.RadioItem value="date">Date</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="name">Name</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="size">Size</ContextMenu.RadioItem>
				</ContextMenu.RadioGroup>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
};

export const WithSubmenu: Story = {
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<TriggerArea />
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item>New file</ContextMenu.Item>
				<ContextMenu.Item>Open file</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
					<ContextMenu.SubContent>
						<ContextMenu.Item>Email</ContextMenu.Item>
						<ContextMenu.Item>Slack</ContextMenu.Item>
						<ContextMenu.Item>Copy link</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
				<ContextMenu.Separator />
				<ContextMenu.Item color="red">Delete</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<ContextMenu.Root key={color}>
					<ContextMenu.Trigger>
						<TriggerArea label={color} />
					</ContextMenu.Trigger>
					<ContextMenu.Content color={color}>
						<ContextMenu.Item>Edit</ContextMenu.Item>
						<ContextMenu.Item>Duplicate</ContextMenu.Item>
						<ContextMenu.Item>Delete</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3">
			{SAMPLE_COLORS.map((color) => (
				<ContextMenu.Root key={color}>
					<ContextMenu.Trigger>
						<TriggerArea label={color} />
					</ContextMenu.Trigger>
					<ContextMenu.Content color={color} highContrast>
						<ContextMenu.Item>Edit</ContextMenu.Item>
						<ContextMenu.Item>Duplicate</ContextMenu.Item>
						<ContextMenu.Item>Delete</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			))}
		</Flex>
	),
};
