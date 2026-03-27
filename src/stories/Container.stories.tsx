import type { Meta, StoryObj } from "@storybook/react";

import { Container, Flex, Text } from "@/components";

const ALIGNMENTS = ["left", "center", "right"] as const;
const SIZES = ["1", "2", "3", "4"] as const;

const meta: Meta<typeof Container> = {
	title: "Layout/Container",
	component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

const Placeholder = ({ label }: { label: string }) => (
	<div
		style={{
			padding: 16,
			background: "var(--accent-3)",
			border: "1px dashed var(--accent-7)",
			borderRadius: 4,
			textAlign: "center",
		}}
	>
		<Text size="2" weight="bold">
			{label}
		</Text>
	</div>
);

export const Default: Story = {
	render: () => (
		<Container>
			<Placeholder label="Default container" />
		</Container>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			{SIZES.map((size) => (
				<Container key={size} size={size}>
					<Placeholder label={`size: ${size}`} />
				</Container>
			))}
		</Flex>
	),
};

export const Align: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			{ALIGNMENTS.map((align) => (
				<Container key={align} size="2" align={align}>
					<Placeholder label={`align: ${align}`} />
				</Container>
			))}
		</Flex>
	),
};
