import type { Meta, StoryObj } from "@storybook/react";

import { Card, Inset, Text } from "@/components";

import frenchieBlue from "./assets/frenchie-blue.png";

const meta: Meta<typeof Inset> = {
	title: "Components/Inset",
	component: Inset,
};

export default meta;
type Story = StoryObj<typeof Inset>;

export const Default: Story = {
	render: () => (
		<Card style={{ maxWidth: 300 }}>
			<Inset clip="padding-box" side="top" pb="current">
				<img
					src={frenchieBlue}
					alt=""
					style={{
						display: "block",
						width: "100%",
						height: 120,
						objectFit: "cover",
						backgroundColor: "var(--gray-a2)",
					}}
				/>
			</Inset>
			<Text size="2">
				Inset negates the padding of its parent container, allowing content to
				span edge-to-edge.
			</Text>
		</Card>
	),
};
