import type { Meta, StoryObj } from "@storybook/react";

import { Blockquote, Box, Quote } from "@/components";

const meta: Meta<typeof Blockquote> = {
	title: "Typography/Blockquote",
	component: Blockquote,
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
	render: () => (
		<Box>
			<Blockquote>With great power comes great responsibility.</Blockquote>
			<Quote>— Uncle Ben</Quote>
		</Box>
	),
};
