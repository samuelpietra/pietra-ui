import type { Meta, StoryObj } from "@storybook/react";

import { Container, Flex, Section, Text } from "@/components";

const SIZES = ["1", "2", "3", "4"] as const;

const meta: Meta<typeof Section> = {
	title: "Layout/Section",
	component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

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
		<Section>
			<Placeholder label="Default section" />
		</Section>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column">
			{SIZES.map((size) => (
				<Section key={size} size={size} style={{ background: "var(--gray-2)" }}>
					<Placeholder label={`size: ${size}`} />
				</Section>
			))}
		</Flex>
	),
};

export const WithContainer: Story = {
	render: () => (
		<Section size="2" style={{ background: "var(--gray-2)" }}>
			<Container size="2">
				<Placeholder label="Section + Container" />
			</Container>
		</Section>
	),
};
