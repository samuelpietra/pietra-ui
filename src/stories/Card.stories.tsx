import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Card, Flex, Text } from "@/components";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	render: () => (
		<Card style={{ maxWidth: 350 }}>
			<Text>
				A card is a container that groups related content and actions.
			</Text>
		</Card>
	),
};

const CARD_SIZES = [
	{ size: "1", width: "350px", avatar: "3", gap: "3", text: "2" },
	{ size: "2", width: "400px", avatar: "4", gap: "4", text: undefined },
	{ size: "3", width: "500px", avatar: "5", gap: "4", text: "4" },
] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			{CARD_SIZES.map(({ size, width, avatar, gap, text }) => (
				<Box key={size} width={width}>
					<Card size={size}>
						<Flex gap={gap} align="center">
							<Avatar
								size={avatar}
								radius="full"
								fallback="SP"
								color="indigo"
							/>
							<Box>
								<Text as="div" size={text} weight="bold">
									Samuel Pietra
								</Text>
								<Text as="div" size={text} color="gray">
									Engineering {size}
								</Text>
							</Box>
						</Flex>
					</Card>
				</Box>
			))}
		</Flex>
	),
};

const VARIANTS = ["classic", "surface", "ghost"] as const;

export const Variant: Story = {
	render: () => (
		<Flex gap="3" direction="column" style={{ maxWidth: 400 }}>
			{VARIANTS.map((variant) => (
				<Card key={variant} variant={variant}>
					<Text>
						<Text weight="bold">{variant}</Text> — A card with the {variant}{" "}
						variant.
					</Text>
				</Card>
			))}
		</Flex>
	),
};

export const AsChild: Story = {
	render: () => (
		<Card asChild style={{ maxWidth: 350 }}>
			<a href="https://example.com" target="_blank" rel="noopener">
				<Text>This entire card is a link.</Text>
			</a>
		</Card>
	),
};
