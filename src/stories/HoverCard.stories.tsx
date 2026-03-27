import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, HoverCard, Link, Text } from "@/components";

import frenchieBlack from "./assets/frenchie-black.png";

const meta: Meta<typeof HoverCard.Root> = {
	title: "Components/HoverCard",
	component: HoverCard.Root,
};

export default meta;
type Story = StoryObj<typeof HoverCard.Root>;

export const Default: Story = {
	render: () => (
		<Text>
			Follow{" "}
			<HoverCard.Root>
				<HoverCard.Trigger>
					<Link href="#">@samuelpietra</Link>
				</HoverCard.Trigger>
				<HoverCard.Content>
					<Flex gap="4">
						<Avatar
							src={frenchieBlack}
							alt="Samuel Pietra"
							size="5"
							fallback="SP"
						/>
						<Flex direction="column" gap="1">
							<Text as="div" size="2" weight="bold">
								Samuel Pietra
							</Text>
							<Text as="div" size="2" color="gray">
								Senior Frontend Engineer
								<br />
								Lorem Ipsum Inc.
							</Text>
						</Flex>
					</Flex>
				</HoverCard.Content>
			</HoverCard.Root>{" "}
			for updates.
		</Text>
	),
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3">
			{SIZES.map((size) => (
				<HoverCard.Root key={size}>
					<HoverCard.Trigger>
						<Link href="#">Size {size}</Link>
					</HoverCard.Trigger>
					<HoverCard.Content size={size}>
						<Flex direction="column" gap="2">
							<Text as="div" size={size} weight="bold">
								Lorem Ipsum
							</Text>
							<Text as="div" size={size}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
								posuere cubilia curae.
							</Text>
						</Flex>
					</HoverCard.Content>
				</HoverCard.Root>
			))}
		</Flex>
	),
};
