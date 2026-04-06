import type { Meta, StoryObj } from "@storybook/react";

import { Em, Text } from "@/components";

const meta: Meta<typeof Em> = {
	title: "Typography/Em",
	component: Em,
};

export default meta;
type Story = StoryObj<typeof Em>;

export const Default: Story = {
	render: () => (
		<Text>
			The quick brown fox <Em>jumps over</Em> the lazy dog.
		</Text>
	),
};
