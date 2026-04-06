import type { Meta, StoryObj } from "@storybook/react";

import { Kbd, Text } from "@/components";

const meta: Meta<typeof Kbd> = {
	title: "Typography/Kbd",
	component: Kbd,
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
	render: () => (
		<Text>
			Press <Kbd>⇧⌘A</Kbd> to select all items.
		</Text>
	),
};
