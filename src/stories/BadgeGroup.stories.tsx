import type { Meta, StoryObj } from "@storybook/react";

import {
	Badge,
	BadgeGroup,
	type BadgeGroupItem,
	Flex,
	Popover,
	Text,
} from "@/components";

const meta: Meta<typeof BadgeGroup> = {
	title: "Components/BadgeGroup",
	component: BadgeGroup,
};

export default meta;
type Story = StoryObj<typeof BadgeGroup>;

const BADGES: BadgeGroupItem[] = [
	{ id: "react", children: "React", variant: "soft" },
	{ id: "typescript", children: "TypeScript", variant: "soft" },
	{ id: "radix", children: "Radix UI", variant: "soft" },
	{ id: "storybook", children: "Storybook", variant: "soft" },
	{ id: "vitest", children: "Vitest", variant: "soft" },
	{ id: "biome", children: "Biome", variant: "soft" },
	{ id: "css", children: "CSS", variant: "soft" },
	{ id: "node", children: "Node.js", variant: "soft" },
	{ id: "graphql", children: "GraphQL", variant: "soft" },
	{ id: "rest", children: "REST", variant: "soft" },
];

export const Default: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			<Text size="2" color="gray">
				Resize the container to see the overflow indicator.
			</Text>
			<Flex
				p="3"
				style={{
					border: "1px dotted var(--gray-a7)",
					resize: "horizontal",
					overflow: "auto",
					width: 400,
				}}
			>
				<BadgeGroup badges={BADGES} />
			</Flex>
		</Flex>
	),
};

export const WithPopover: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			<Text size="2" color="gray">
				Click the +N indicator to see hidden badges in a popover.
			</Text>
			<Flex
				p="3"
				style={{
					border: "1px dotted var(--gray-a7)",
					resize: "horizontal",
					overflow: "auto",
					width: 400,
				}}
			>
				<BadgeGroup
					badges={BADGES}
					indicator={(count, overflowBadges) => (
						<Popover.Root>
							<Popover.Trigger>
								<Badge
									variant="soft"
									color="gray"
									style={{ cursor: "pointer" }}
								>
									+{count}
								</Badge>
							</Popover.Trigger>
							<Popover.Content>
								<Flex direction="column" align="start" gap="2">
									{overflowBadges.map(({ id, ...props }) => (
										<Badge key={id} {...props} />
									))}
								</Flex>
							</Popover.Content>
						</Popover.Root>
					)}
				/>
			</Flex>
		</Flex>
	),
};

export const FewItems: Story = {
	render: () => (
		<Flex direction="column" gap="4">
			<Text size="2" color="gray">
				All badges are visible, so no overflow indicator is shown.
			</Text>
			<Flex
				p="3"
				style={{
					border: "1px dotted var(--gray-a7)",
					width: 400,
				}}
			>
				<BadgeGroup
					badges={[
						{ id: "react", children: "React", variant: "soft" },
						{ id: "ts", children: "TypeScript", variant: "soft" },
					]}
				/>
			</Flex>
		</Flex>
	),
};
