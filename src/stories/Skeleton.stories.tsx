import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Button, Flex, Skeleton, Switch, Text } from "@/components";

const meta: Meta<typeof Skeleton> = {
	title: "Components/Skeleton",
	component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	render: () => (
		<Flex direction="column" gap="3" maxWidth="300px">
			<Text>
				<Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
			</Text>
		</Flex>
	),
};

export const Size: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			<Skeleton width="100%" height="20px" />
			<Skeleton width="75%" height="20px" />
			<Skeleton width="50%" height="20px" />
		</Flex>
	),
};

export const WithChildren: Story = {
	render: () => (
		<Flex gap="4" align="center">
			<Skeleton>
				<Avatar fallback="SP" />
			</Skeleton>
			<Skeleton>
				<Button>Submit</Button>
			</Skeleton>
			<Skeleton>
				<Switch />
			</Skeleton>
		</Flex>
	),
};

export const Loading: Story = {
	render: () => (
		<Flex gap="4" align="center">
			<Skeleton loading>
				<Button>Loading</Button>
			</Skeleton>
			<Skeleton loading={false}>
				<Button>Loaded</Button>
			</Skeleton>
		</Flex>
	),
};
