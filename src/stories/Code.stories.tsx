import type { Meta, StoryObj } from "@storybook/react";

import { Code, Text } from "@/components";

const meta: Meta<typeof Code> = {
	title: "Typography/Code",
	component: Code,
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
	render: () => (
		<Text>
			Install the package with <Code>npm install pietra-ui</Code> to get
			started.
		</Text>
	),
};
