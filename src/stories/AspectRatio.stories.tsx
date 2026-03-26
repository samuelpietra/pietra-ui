import type { Meta, StoryObj } from "@storybook/react";

import { AspectRatio, Flex } from "@/components";

import frenchieGreen from "./assets/frenchie-green.png";

const meta: Meta<typeof AspectRatio> = {
	title: "Components/AspectRatio",
	component: AspectRatio,
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const imgStyle = {
	objectFit: "cover" as const,
	width: "100%",
	height: "100%",
	borderRadius: "var(--radius-2)",
};

export const Default: Story = {
	render: () => (
		<div style={{ maxWidth: 300 }}>
			<AspectRatio ratio={16 / 9}>
				<img src={frenchieGreen} alt="French bulldog" style={imgStyle} />
			</AspectRatio>
		</div>
	),
};

const RATIOS = [
	{ ratio: 1, label: "1:1" },
	{ ratio: 4 / 3, label: "4:3" },
	{ ratio: 16 / 9, label: "16:9" },
	{ ratio: 21 / 9, label: "21:9" },
] as const;

export const Ratio: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap">
			{RATIOS.map(({ ratio, label }) => (
				<div key={label} style={{ width: 200 }}>
					<AspectRatio ratio={ratio}>
						<img src={frenchieGreen} alt="French bulldog" style={imgStyle} />
					</AspectRatio>
				</div>
			))}
		</Flex>
	),
};
