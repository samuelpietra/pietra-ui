import { Pencil, Share2, Trash2 } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Text, Tooltip } from "@/components";

const meta: Meta<typeof Tooltip> = {
	title: "Components/Tooltip",
	component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: () => (
		<Tooltip content="This is a tooltip">
			<Button variant="soft">Hover me</Button>
		</Tooltip>
	),
};

export const Multiline: Story = {
	render: () => (
		<Tooltip
			content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus."
			maxWidth="250px"
		>
			<Button variant="soft">Hover for details</Button>
		</Tooltip>
	),
};

export const OnText: Story = {
	render: () => (
		<Text>
			Hover over the{" "}
			<Tooltip content="Yes, this word!">
				<Text weight="bold" style={{ cursor: "default" }}>
					bold word
				</Text>
			</Tooltip>{" "}
			to see a tooltip.
		</Text>
	),
};

export const WithIcons: Story = {
	render: () => (
		<Flex gap="3">
			<Tooltip content="Edit">
				<Button variant="soft" size="2">
					<Pencil size={14} />
				</Button>
			</Tooltip>
			<Tooltip content="Delete">
				<Button variant="soft" size="2" color="red">
					<Trash2 size={14} />
				</Button>
			</Tooltip>
			<Tooltip content="Share">
				<Button variant="soft" size="2">
					<Share2 size={14} />
				</Button>
			</Tooltip>
		</Flex>
	),
};
