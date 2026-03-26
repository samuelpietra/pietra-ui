import { Code, Em, Kbd, Link } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Text } from "@/components";

const meta: Meta<typeof Text> = {
	title: "Typography/Text",
	component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
	},
};

export const Size: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Text size="1">The quick brown fox jumps over the size 1.</Text>
			<Text size="2">The quick brown fox jumps over the size 2.</Text>
			<Text size="3">The quick brown fox jumps over the size 3.</Text>
			<Text size="4">The quick brown fox jumps over the size 4.</Text>
			<Text size="5">The quick brown fox jumps over the size 5.</Text>
			<Text size="6">The quick brown fox jumps over the size 6.</Text>
			<Text size="7">The quick brown fox jumps over the size 7.</Text>
			<Text size="8">The quick brown fox jumps over the size 8.</Text>
			<Text size="9">The quick brown fox jumps over the size 9.</Text>
		</Flex>
	),
};

export const Weight: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Text weight="regular" as="div">
				The quick brown fox jumps over the regular weight.
			</Text>
			<Text weight="medium" as="div">
				The quick brown fox jumps over the medium weight.
			</Text>
			<Text weight="bold" as="div">
				The quick brown fox jumps over the bold weight.
			</Text>
		</Flex>
	),
};

export const Align: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Text align="left" as="div">
				Left-aligned
			</Text>
			<Text align="center" as="div">
				Center-aligned
			</Text>
			<Text align="right" as="div">
				Right-aligned
			</Text>
		</Flex>
	),
};

export const Trim: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			<Text
				trim="normal"
				style={{
					background: "var(--gray-a2)",
					borderTop: "1px dashed var(--gray-a7)",
					borderBottom: "1px dashed var(--gray-a7)",
				}}
			>
				Without trim
			</Text>
			<Text
				trim="both"
				style={{
					background: "var(--gray-a2)",
					borderTop: "1px dashed var(--gray-a7)",
					borderBottom: "1px dashed var(--gray-a7)",
				}}
			>
				With trim
			</Text>
		</Flex>
	),
};

export const Truncate: Story = {
	render: () => (
		<Flex
			p="3"
			overflow="auto"
			width="300px"
			style={{
				border: "1px dotted var(--gray-a7)",
				resize: "horizontal",
			}}
		>
			<Text truncate>
				The goal of typography is to relate font size, line height, and line
				width in a proportional way that maximizes beauty and makes reading
				easier and more pleasant.
			</Text>
		</Flex>
	),
};

export const Wrap: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Flex gap="3" direction="column">
				<Text weight="bold">nowrap</Text>
				<Flex
					p="3"
					overflow="auto"
					width="300px"
					style={{
						border: "1px dotted var(--gray-a7)",
						resize: "horizontal",
					}}
				>
					<Text wrap="nowrap">
						The goal of typography is to relate font size, line height, and line
						width in a proportional way that maximizes beauty and makes reading
						easier and more pleasant.
					</Text>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">balance</Text>
				<Flex
					p="3"
					overflow="auto"
					width="300px"
					style={{
						border: "1px dotted var(--gray-a7)",
						resize: "horizontal",
					}}
				>
					<Text wrap="balance">
						The goal of typography is to relate font size, line height, and line
						width in a proportional way that maximizes beauty and makes reading
						easier and more pleasant.
					</Text>
				</Flex>
			</Flex>
			<Flex gap="3" direction="column">
				<Text weight="bold">pretty</Text>
				<Flex
					p="3"
					overflow="auto"
					width="300px"
					style={{
						border: "1px dotted var(--gray-a7)",
						resize: "horizontal",
					}}
				>
					<Text wrap="pretty">
						The goal of typography is to relate font size, line height, and line
						width in a proportional way that maximizes beauty and makes reading
						easier and more pleasant.
					</Text>
				</Flex>
			</Flex>
		</Flex>
	),
};

export const Color: Story = {
	render: () => (
		<Flex direction="column">
			<Text color="indigo">
				The quick brown fox jumps over the indigo color.
			</Text>
			<Text color="cyan">The quick brown fox jumps over the cyan color.</Text>
			<Text color="orange">
				The quick brown fox jumps over the orange color.
			</Text>
			<Text color="crimson">
				The quick brown fox jumps over the crimson color.
			</Text>
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column">
			<Text color="gray">The quick brown fox jumps over the regular text.</Text>
			<Text color="gray" highContrast>
				The quick brown fox jumps over the high-contrast text.
			</Text>
		</Flex>
	),
};

export const AsElement: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Text weight="bold">{`As <p>`}</Text>
			<Flex
				p="3"
				overflow="auto"
				width="500px"
				style={{
					border: "1px dotted var(--gray-a7)",
				}}
			>
				<Text as="p">
					Look, such a helpful <Link href="#">link</Link>, an{" "}
					<Em>italic emphasis</Em>, a piece of computer <Code>code</Code>, and
					even a hotkey combination <Kbd>⇧⌘A</Kbd> within the text.
				</Text>
			</Flex>
			<Text weight="bold">{`As <label>`}</Text>
			<Flex
				p="3"
				overflow="auto"
				width="500px"
				style={{
					border: "1px dotted var(--gray-a7)",
				}}
			>
				<Text as="label" size="3">
					<Flex gap="2">
						<Checkbox defaultChecked />I understand that these documents are
						confidential and cannot be shared with a third party.
					</Flex>
				</Text>
			</Flex>
		</Flex>
	),
};
