import type { Meta, StoryObj } from "@storybook/react";

import { Quote, Text } from "@/components";

const meta: Meta<typeof Quote> = {
	title: "Typography/Quote",
	component: Quote,
};

export default meta;
type Story = StoryObj<typeof Quote>;

export const Default: Story = {
	render: () => (
		<Text>
			His famous words, <Quote>I think, therefore I am</Quote>, changed
			philosophy forever.
		</Text>
	),
};
