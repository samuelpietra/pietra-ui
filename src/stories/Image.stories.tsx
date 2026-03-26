import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Image } from "@/components";

import frenchieBlack from "./assets/frenchie-black.png";
import frenchieBlue from "./assets/frenchie-blue.png";
import frenchieGreen from "./assets/frenchie-green.png";
import frenchieRed from "./assets/frenchie-red.png";
import frenchieYellow from "./assets/frenchie-yellow.png";

const meta: Meta<typeof Image> = {
	title: "Components/Image",
	component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
	render: () => <Image src={frenchieBlue} alt="French bulldog" width={300} />,
};

const RATIOS = [
	{ ratio: 1, label: "1:1" },
	{ ratio: 4 / 3, label: "4:3" },
	{ ratio: 16 / 9, label: "16:9" },
] as const;

export const Ratio: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap">
			{RATIOS.map(({ ratio, label }) => (
				<Image
					key={label}
					src={frenchieRed}
					alt="French bulldog"
					ratio={ratio}
					width={200}
				/>
			))}
		</Flex>
	),
};

const SHAPES = ["square", "rounded", "circular"] as const;

export const Shape: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap">
			{SHAPES.map((shape) => (
				<Image
					key={shape}
					src={frenchieBlack}
					alt="French bulldog"
					shape={shape}
					width={200}
					height={200}
				/>
			))}
		</Flex>
	),
};

export const Bordered: Story = {
	render: () => (
		<Flex gap="3" wrap="wrap">
			{SHAPES.map((shape) => (
				<Image
					key={shape}
					src={frenchieYellow}
					alt="French bulldog"
					shape={shape}
					bordered
					width={200}
					height={200}
				/>
			))}
		</Flex>
	),
};

const DelayedImage = () => {
	const [src, setSrc] = useState<string>();

	useEffect(() => {
		const timer = setTimeout(() => setSrc(frenchieGreen), 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Image
			src={src}
			alt="French bulldog"
			width={300}
			height={300}
			shape="circular"
		/>
	);
};

export const Loading: Story = {
	render: () => <DelayedImage />,
};

export const Fallback: Story = {
	render: () => (
		<Image
			src="/broken-url.png"
			alt="French bulldog"
			fallbackSrc={frenchieRed}
			width={200}
			height={200}
		/>
	),
};
