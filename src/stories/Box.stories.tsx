import { Text } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@/components/Box";

const meta: Meta<typeof Box> = {
	title: "Layout/Box",
	component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
	render: () => (
		<Box p="4" style={{ background: "var(--gray-a3)" }}>
			<Text>Content inside a Box</Text>
		</Box>
	),
};

export const AsChild: Story = {
	render: () => (
		<Box asChild p="4" style={{ background: "var(--gray-a3)" }}>
			<section>
				<Text>{`Rendered as <section>`}</Text>
			</section>
		</Box>
	),
};
