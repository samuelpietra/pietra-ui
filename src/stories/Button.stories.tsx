import { BellRing, BookmarkIcon, ThumbsUp } from "lucide-react";
import { Spinner } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			<Button size="1" variant="soft">
				Size 1
			</Button>
			<Button size="2" variant="soft">
				Size 2
			</Button>
			<Button size="3" variant="soft">
				Size 3
			</Button>
		</Flex>
	),
};

export const Variant: Story = {
	render: () => (
		<Flex gap="3" align="center">
			<Button variant="classic">Classic</Button>
			<Button variant="solid">Solid</Button>
			<Button variant="soft">Soft</Button>
			<Button variant="surface">Surface</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex gap="3">
			<Button color="indigo" variant="soft">
				Indigo
			</Button>
			<Button color="cyan" variant="soft">
				Cyan
			</Button>
			<Button color="orange" variant="soft">
				Orange
			</Button>
			<Button color="crimson" variant="soft">
				Crimson
			</Button>
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Flex gap="3">
				<Button color="gray" variant="classic">
					Classic
				</Button>
				<Button color="gray" variant="solid">
					Solid
				</Button>
				<Button color="gray" variant="soft">
					Soft
				</Button>
				<Button color="gray" variant="surface">
					Surface
				</Button>
				<Button color="gray" variant="outline">
					Outline
				</Button>
			</Flex>
			<Flex gap="3">
				<Button color="gray" variant="classic" highContrast>
					Classic
				</Button>
				<Button color="gray" variant="solid" highContrast>
					Solid
				</Button>
				<Button color="gray" variant="soft" highContrast>
					Soft
				</Button>
				<Button color="gray" variant="surface" highContrast>
					Surface
				</Button>
				<Button color="gray" variant="outline" highContrast>
					Outline
				</Button>
			</Flex>
		</Flex>
	),
};

export const Radius: Story = {
	render: () => (
		<Flex gap="3">
			<Button radius="none" variant="soft">
				None
			</Button>
			<Button radius="large" variant="soft">
				Large
			</Button>
			<Button radius="full" variant="soft">
				Full
			</Button>
		</Flex>
	),
};

export const WithIcons: Story = {
	render: () => (
		<Flex gap="3">
			<Button>
				<ThumbsUp size={16} />
				Like
			</Button>
			<Button variant="soft">
				<BellRing size={16} />
				Subscribe
			</Button>
		</Flex>
	),
};

export const Loading: Story = {
	render: () => (
		<Flex gap="3">
			<Button loading>Regular</Button>
			<Button disabled>
				<Spinner loading>
					<BookmarkIcon />
				</Spinner>
				Custom
			</Button>
		</Flex>
	),
};

export const AsChild: Story = {
	render: () => (
		<Button asChild>
			<a href="https://example.com" target="_blank" rel="noopener">
				Link Button
			</a>
		</Button>
	),
};
