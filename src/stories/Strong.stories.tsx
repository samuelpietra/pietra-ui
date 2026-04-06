import type { Meta, StoryObj } from "@storybook/react";

import { Strong, Text } from "@/components";

const meta: Meta<typeof Strong> = {
	title: "Typography/Strong",
	component: Strong,
};

export default meta;
type Story = StoryObj<typeof Strong>;

export const Default: Story = {
	render: () => (
		<Text>
			This is <Strong>important</Strong> information you should not miss.
		</Text>
	),
};
