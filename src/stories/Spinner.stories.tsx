import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Spinner, Switch } from "@/components";

const meta: Meta<typeof Spinner> = {
	title: "Components/Spinner",
	component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	render: () => <Spinner />,
};

const SIZES = ["1", "2", "3"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" align="center">
			{SIZES.map((size) => (
				<Spinner key={size} size={size} />
			))}
		</Flex>
	),
};

export const WithChildren: Story = {
	render: () => (
		<Flex gap="4">
			<Spinner loading={true}>
				<Switch defaultChecked />
			</Spinner>

			<Spinner loading={false}>
				<Switch defaultChecked />
			</Spinner>
		</Flex>
	),
};

export const WithButton: Story = {
	render: () => (
		<Button disabled>
			<Spinner />
			Loading…
		</Button>
	),
};
