import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Popover, Text, TextField } from "@/components";

const meta: Meta<typeof Popover.Root> = {
	title: "Components/Popover",
	component: Popover.Root,
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Default: Story = {
	render: () => (
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="soft">Edit profile</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Flex direction="column" gap="3">
					<Text size="2" weight="bold">
						Edit profile
					</Text>
					<Flex direction="column" gap="2">
						<TextField.Root size="2" placeholder="Display name" />
						<TextField.Root size="2" placeholder="Email" />
					</Flex>
					<Flex justify="end" gap="2">
						<Popover.Close>
							<Button variant="soft" color="gray" size="1">
								Cancel
							</Button>
						</Popover.Close>
						<Popover.Close>
							<Button size="1">Save</Button>
						</Popover.Close>
					</Flex>
				</Flex>
			</Popover.Content>
		</Popover.Root>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3">
			{SIZES.map((size) => (
				<Popover.Root key={size}>
					<Popover.Trigger>
						<Button variant="soft" size={size}>
							Size {size}
						</Button>
					</Popover.Trigger>
					<Popover.Content size={size}>
						<Text size={size}>
							Popover content at size {size}. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit.
						</Text>
					</Popover.Content>
				</Popover.Root>
			))}
		</Flex>
	),
};

const SIDES = ["top", "right", "bottom", "left"] as const;

export const Placement: Story = {
	render: () => (
		<Flex gap="3" align="center" justify="center" py="9">
			{SIDES.map((side) => (
				<Popover.Root key={side}>
					<Popover.Trigger>
						<Button variant="soft">{side}</Button>
					</Popover.Trigger>
					<Popover.Content side={side}>
						<Text size="2">Popover on the {side} side.</Text>
					</Popover.Content>
				</Popover.Root>
			))}
		</Flex>
	),
};
