import type { Meta, StoryObj } from "@storybook/react";

import { Blockquote, Box, Em } from "@/components";

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
			<Em>— Uncle Ben</Em>
		</Box>
	),
};
